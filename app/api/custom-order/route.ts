import { NextResponse } from "next/server";

import { customOrderSchema, parseFormErrors, FORM_MIN_SECONDS, CUSTOM_ORDER_MAX_IMAGE_BYTES, CUSTOM_ORDER_IMAGE_TYPES } from "@/lib/validation";
import { customOrderEmail, sendInquiry, type EmailAttachment } from "@/lib/email";
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
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request" }, { status: 400 });
  }

  const now = Date.now();

  const website = form.get("website");
  if (typeof website === "string" && website.length > 0) {
    return NextResponse.json({ ok: true, spam: true }, { status: 200 });
  }

  const submittedAtRaw = form.get("submittedAt");
  const submittedAt = typeof submittedAtRaw === "string" ? Number(submittedAtRaw) : NaN;
  if (Number.isFinite(submittedAt) && now - submittedAt < FORM_MIN_SECONDS * 1000) {
    return NextResponse.json({ ok: true, spam: true }, { status: 200 });
  }

  const raw: Record<string, unknown> = {};
  for (const key of Object.keys(customOrderSchema.shape)) {
    const value = form.get(key);
    if (typeof value === "string") raw[key] = value;
  }

  const parsed = customOrderSchema.safeParse(raw);
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

  let attachment: EmailAttachment | undefined;
  const file = form.get("referenceImage");
  if (file instanceof File && file.size > 0) {
    if (file.size > CUSTOM_ORDER_MAX_IMAGE_BYTES) {
      return NextResponse.json(
        {
          ok: false,
          fieldErrors: { referenceImage: "Image should be under 2 MB." },
          message: "Please upload a smaller image.",
        },
        { status: 400 }
      );
    }
    if (!CUSTOM_ORDER_IMAGE_TYPES.includes(file.type as (typeof CUSTOM_ORDER_IMAGE_TYPES)[number])) {
      return NextResponse.json(
        {
          ok: false,
          fieldErrors: { referenceImage: "Please upload a JPG, PNG or WEBP image." },
          message: "Unsupported image type.",
        },
        { status: 400 }
      );
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    attachment = {
      filename: file.name || "reference-design.jpg",
      content: buffer,
      contentType: file.type,
    };
  }

  const reference = makeReference("ORD");
  const email = customOrderEmail(parsed.data, attachment);
  const { delivered } = await sendInquiry(email);
  track("custom_order_submitted", { reference, delivered, design: parsed.data.designChoice });

  return NextResponse.json({ ok: true, reference, delivered });
}
