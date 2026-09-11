import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const FIRM = "P. Shah Accounting and Tax Services";
const PHONE = "647-456-9444";

// Set these in the Vercel project's environment variables.
// CONTACT_FROM_EMAIL must be on a domain verified in Resend before production sending.
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "cpapriyashah@gmail.com";
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || `${FIRM} <onboarding@resend.dev>`;

const LIMITS = { name: 100, email: 254, phone: 40, message: 5000 };

function field(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function paragraphs(value: string): string {
  return escapeHtml(value).replace(/\r?\n/g, "<br />");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set.");
    return res.status(500).json({
      error: "The contact form is not configured yet. Please call or email us instead.",
    });
  }

  let body: Record<string, unknown> = {};
  try {
    body =
      typeof req.body === "string"
        ? (JSON.parse(req.body) as Record<string, unknown>)
        : ((req.body as Record<string, unknown>) ?? {});
  } catch {
    return res.status(400).json({ error: "We could not read that request." });
  }

  // Honeypot: report success so bots do not retry, but send nothing.
  if (field(body._gotcha, 200)) {
    return res.status(200).json({ ok: true });
  }

  const name = field(body.name, LIMITS.name);
  const email = field(body.email, LIMITS.email);
  const phone = field(body.phone, LIMITS.phone);
  const message = field(body.message, LIMITS.message);

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ error: "Please fill in your name, email, and message." });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  const resend = new Resend(apiKey);

  const inquiryHtml = `
    <div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;color:#111827;line-height:1.6">
      <h2 style="color:#1B2B4B;margin:0 0 16px">New website inquiry</h2>
      <table style="border-collapse:collapse;width:100%;max-width:560px">
        <tr><td style="padding:8px 12px 8px 0;color:#4A5568;vertical-align:top"><strong>Name</strong></td><td style="padding:8px 0">${escapeHtml(name)}</td></tr>
        <tr><td style="padding:8px 12px 8px 0;color:#4A5568;vertical-align:top"><strong>Email</strong></td><td style="padding:8px 0"><a href="mailto:${escapeHtml(email)}" style="color:#2A7F8E">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:8px 12px 8px 0;color:#4A5568;vertical-align:top"><strong>Phone</strong></td><td style="padding:8px 0">${phone ? escapeHtml(phone) : "Not provided"}</td></tr>
        <tr><td style="padding:8px 12px 8px 0;color:#4A5568;vertical-align:top"><strong>Message</strong></td><td style="padding:8px 0">${paragraphs(message)}</td></tr>
      </table>
      <p style="margin:24px 0 0;color:#6B7280;font-size:14px">Sent from the contact form on your website. Reply directly to this email to respond to ${escapeHtml(name)}.</p>
    </div>
  `;

  const inquiryText = [
    "New website inquiry",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    "",
    "Message:",
    message,
  ].join("\n");

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [TO_EMAIL],
    replyTo: email,
    subject: `New inquiry from ${name}`,
    html: inquiryHtml,
    text: inquiryText,
  });

  if (error) {
    console.error("Resend failed to deliver the inquiry:", error);
    return res.status(502).json({
      error: "We could not send your message just now. Please call or email us instead.",
    });
  }

  // Confirmation to the visitor. A failure here must not fail the request:
  // the inquiry already reached the practice.
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      replyTo: TO_EMAIL,
      subject: `We received your message - ${FIRM}`,
      html: `
        <div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;color:#111827;line-height:1.6">
          <p>Hi ${escapeHtml(name)},</p>
          <p>Thank you for getting in touch with ${FIRM}. We have received your message and will get back to you shortly.</p>
          <p style="margin:24px 0;padding:16px;background:#F7F8FA;border-left:4px solid #D4A853;color:#374151">${paragraphs(message)}</p>
          <p>If your question is urgent, you can reach us directly at <a href="tel:${PHONE.replace(/[^+\d]/g, "")}" style="color:#2A7F8E">${PHONE}</a>.</p>
          <p style="margin-top:24px">Kind regards,<br /><strong>${FIRM}</strong></p>
        </div>
      `,
      text: [
        `Hi ${name},`,
        "",
        `Thank you for getting in touch with ${FIRM}. We have received your message and will get back to you shortly.`,
        "",
        "Your message:",
        message,
        "",
        `If your question is urgent, you can reach us directly at ${PHONE}.`,
        "",
        "Kind regards,",
        FIRM,
      ].join("\n"),
    });
  } catch (confirmationError) {
    console.error("Confirmation email to the visitor failed:", confirmationError);
  }

  return res.status(200).json({ ok: true });
}
