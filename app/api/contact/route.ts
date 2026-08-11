import { NextResponse } from "next/server";
import { contactSchema, parseFormErrors, FORM_MIN_SECONDS } from "@/lib/validation";
import { contactEmail, sendInquiry } from "@/lib/email";
import { track } from "@/lib/analytics";

const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const attempts = new Map<string, number[]>();

function pruneAttempts(now: number): void {
  for (const [key, stamps] of attempts) {
    const fresh = stamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    if (fresh.length === 0) attempts.delete(key);
    else attempts.set(key, fresh);
  }
}

function isRateLimited(ip: string, now: number): boolean {
  pruneAttempts(now);
  const stamps = attempts.get(ip) ?? [];
  if (stamps.length >= RATE_LIMIT_MAX) return true;
  stamps.push(now);
  attempts.set(ip, stamps);
  return false;
}

function makeReference(prefix: string): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let suffix = "";
  for (let i = 0; i < 6; i += 1) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }
  return `${prefix}-${suffix}`;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request" }, { status: 400 });
  }

  const now = Date.now();

  const website = body.website;
  if (typeof website === "string" && website.length > 0) {
    return NextResponse.json({ ok: true, spam: true }, { status: 200 });
  }

  const submittedAt = typeof body.submittedAt === "number" ? body.submittedAt : NaN;
  if (Number.isFinite(submittedAt) && now - submittedAt < FORM_MIN_SECONDS * 1000) {
    return NextResponse.json({ ok: true, spam: true }, { status: 200 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const { fieldErrors, message } = parseFormErrors(parsed.error);
    return NextResponse.json({ ok: false, fieldErrors, message }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip, now)) {
    return NextResponse.json(
      { ok: false, message: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  const reference = makeReference("REQ");
  const email = contactEmail(parsed.data);
  const { delivered } = await sendInquiry(email);
  track("contact_submitted", { reference, subject: parsed.data.subject, delivered });

  return NextResponse.json({ ok: true, reference, delivered });
}
