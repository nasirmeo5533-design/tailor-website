import nodemailer from "nodemailer";
import type { BookingData, ContactData, ScheduleCallData } from "./validation";
import { business } from "./site";
import { getService } from "./services";

const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => HTML_ENTITIES[char] ?? char);
}

function buildEmailText(title: string, rows: Array<[string, string]>): string {
  const lines = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  return `${business.name}\n${title}\n\n${lines}\n`;
}

function buildEmailHtml(title: string, rows: Array<[string, string]>): string {
  const body = rows
    .map(
      ([label, value]) =>
        `<tr>
          <td style="padding:10px 20px;border-bottom:1px solid #ece4d6;font-size:14px;font-weight:600;color:#5b5343;white-space:nowrap;vertical-align:top;text-align:left">${escapeHtml(label)}</td>
          <td style="padding:10px 20px;border-bottom:1px solid #ece4d6;font-size:14px;color:#211c17;vertical-align:top;text-align:left">${escapeHtml(value)}</td>
        </tr>`
    )
    .join("\n");
  return `<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;padding:0;background:#f3ede1;font-family:Arial,Helvetica,sans-serif">
    <div style="max-width:640px;margin:32px auto;background:#ffffff;border:1px solid #eae1cf;border-radius:16px;overflow:hidden">
      <div style="background:#0e5c46;padding:28px 32px;color:#ffffff">
        <h1 style="margin:0;font-size:20px;font-weight:700">${escapeHtml(business.name)}</h1>
        <p style="margin:6px 0 0;font-size:14px;color:#d8ebe2">${escapeHtml(title)}</p>
      </div>
      <table role="presentation" style="width:100%;border-collapse:collapse;padding:0">
        ${body}
      </table>
      <p style="margin:0;padding:20px 32px;font-size:12px;color:#8d8271">Sent from the ${escapeHtml(business.name)} website.</p>
    </div>
  </body>
</html>`;
}

export type SendInquiryOptions = {
  to?: string;
  subject: string;
  text: string;
  html: string;
};

export async function sendInquiry(options: SendInquiryOptions): Promise<{ delivered: boolean }> {
  const host = process.env.SMTP_HOST;
  if (!host) {
    console.error("sendInquiry: SMTP_HOST is not configured, email not delivered.");
    return { delivered: false };
  }
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = options.to || process.env.CONTACT_TO;
  if (!to) {
    console.error("sendInquiry: no recipient (CONTACT_TO) configured, email not delivered.");
    return { delivered: false };
  }
  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: user && pass ? { user, pass } : undefined,
    });
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });
    return { delivered: true };
  } catch (error) {
    console.error("sendInquiry: failed to send email:", error);
    return { delivered: false };
  }
}

export function bookingEmail(data: BookingData): { subject: string; text: string; html: string } {
  const service = getService(data.serviceSlug);
  const rows: Array<[string, string]> = [
    ["Service", service ? `${service.name} (${data.serviceSlug})` : data.serviceSlug],
    ["Name", data.name],
    ["Phone", data.phone],
    ["Email", data.email || "—"],
    ["Preferred date", data.date],
    ["Preferred time", data.time],
    ["Area / address", data.address || "—"],
    ["Contact method", data.contactMethod],
    ["Notes", data.notes || "—"],
  ];
  const title = "New booking request";
  return {
    subject: `${title}: ${service?.name ?? data.serviceSlug} — ${data.name}`,
    text: buildEmailText(title, rows),
    html: buildEmailHtml(title, rows),
  };
}

export function contactEmail(data: ContactData): { subject: string; text: string; html: string } {
  const rows: Array<[string, string]> = [
    ["Name", data.name],
    ["Phone", data.phone],
    ["Email", data.email || "—"],
    ["Subject", data.subject],
    ["Message", data.message],
  ];
  const title = "New contact message";
  return {
    subject: `${title}: ${data.subject} — ${data.name}`,
    text: buildEmailText(title, rows),
    html: buildEmailHtml(title, rows),
  };
}

export function scheduleCallEmail(data: ScheduleCallData): { subject: string; text: string; html: string } {
  const rows: Array<[string, string]> = [
    ["Name", data.name],
    ["Phone", data.phone],
    ["Preferred date", data.date],
    ["Preferred time", data.time],
    ["Topic", data.topic || "General consultation"],
    ["Contact method", data.contactMethod === "call" ? "Phone call" : "WhatsApp call"],
  ];
  const title = "New call scheduling request";
  return {
    subject: `${title}: ${data.name}`,
    text: buildEmailText(title, rows),
    html: buildEmailHtml(title, rows),
  };
}
