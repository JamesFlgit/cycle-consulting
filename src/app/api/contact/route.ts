import { NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { entreprise } from "@/data/entreprise";

// nodemailer needs the Node.js runtime (not edge), and the handler must always
// run on the incoming request (no caching of a POST anyway).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CAPTCHA_SECRET = process.env.CAPTCHA_SECRET || "dev-only-captcha-secret-change-me";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_ELAPSED_MS = 1500; // a real visitor can't submit faster than this
const CHALLENGE_TTL_MS = 30 * 60 * 1000; // writing a message can take a while

type ContactPayload = {
  prenom: string;
  nom: string;
  entreprise: string;
  email: string;
  telephone: string;
  message: string;
};

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const prenom = str(body.prenom);
  const nom = str(body.nom);
  const societe = str(body.entreprise); // the visible "Entreprise" field, optional
  const email = str(body.email).toLowerCase();
  const telephone = str(body.telephone);
  const message = str(body.message);
  // Honeypot: a hidden field real visitors never see or fill. Any value = bot.
  const honeypot = str(body.website);
  const a = Number(body.a);
  const b = Number(body.b);
  const issuedAt = Number(body.issuedAt);
  const token = typeof body.token === "string" ? body.token : "";

  if (honeypot.length > 0) {
    // Pretend success so bots don't learn which check tripped.
    return NextResponse.json({ ok: true });
  }

  if (!prenom || !nom || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 400 });
  }

  // Invisible anti-spam: the challenge issued by /api/captcha is signed server-side,
  // so we can trust its timestamp without storing anything. We only use the timing
  // trap here (no visible question on the contact form).
  const expectedToken = crypto.createHmac("sha256", CAPTCHA_SECRET).update(`${a}:${b}:${issuedAt}`).digest("hex");
  const tokenBuffer = Buffer.from(token);
  const expectedBuffer = Buffer.from(expectedToken);
  const tokenValid = tokenBuffer.length === expectedBuffer.length && crypto.timingSafeEqual(tokenBuffer, expectedBuffer);
  const isFresh = Number.isFinite(issuedAt) && Date.now() - issuedAt < CHALLENGE_TTL_MS;
  const isNotInstant = Number.isFinite(issuedAt) && Date.now() - issuedAt > MIN_ELAPSED_MS;

  if (!tokenValid || !isFresh || !isNotInstant) {
    return NextResponse.json({ ok: false, error: "spam_check_failed" }, { status: 400 });
  }

  try {
    await sendContactEmail({ prenom, nom, entreprise: societe, email, telephone, message });
  } catch (err) {
    console.error("Failed to send contact email", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Sends the contact request to the company inbox over SMTP.
 * Configure the transport with env vars (see CONTACT-FORM-SETUP.md):
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE (optional),
 *   CONTACT_TO (optional, defaults to entreprise.email), CONTACT_FROM (optional).
 */
async function sendContactEmail(p: ContactPayload) {
  const host = requiredEnv("SMTP_HOST");
  const port = Number(process.env.SMTP_PORT || 465);
  const user = requiredEnv("SMTP_USER");
  const pass = requiredEnv("SMTP_PASS");
  // secure=true for port 465 (implicit TLS), false for 587/25 (STARTTLS).
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465;

  const to = process.env.CONTACT_TO || entreprise.email;
  const from = process.env.CONTACT_FROM || user;

  const transporter = nodemailer.createTransport({ host, port, secure, auth: { user, pass } });

  const rows: Array<[string, string]> = [
    ["Prénom", p.prenom],
    ["Nom", p.nom],
    ["Entreprise", p.entreprise || "(non renseignée)"],
    ["E-mail", p.email],
    ["Téléphone", p.telephone || "(non renseigné)"],
  ];

  const text = [
    ...rows.map(([label, value]) => `${label} : ${value}`),
    "",
    "Message :",
    p.message || "(aucun message)",
  ].join("\n");

  const html = `
    <table style="border-collapse:collapse;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#1f2937">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="padding:4px 12px 4px 0;font-weight:bold">${escapeHtml(label)}</td><td style="padding:4px 0">${escapeHtml(value)}</td></tr>`,
        )
        .join("")}
    </table>
    <p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#1f2937;margin-top:16px"><strong>Message :</strong></p>
    <p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#1f2937;white-space:pre-wrap">${escapeHtml(p.message || "(aucun message)")}</p>
  `;

  await transporter.sendMail({
    from: `"Site Cycle Consulting" <${from}>`,
    to,
    replyTo: `"${p.prenom} ${p.nom}" <${p.email}>`,
    subject: `Nouvelle demande de contact : ${p.prenom} ${p.nom}`,
    text,
    html,
  });
}
