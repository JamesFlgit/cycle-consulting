import { NextResponse } from "next/server";
import crypto from "crypto";
import { promises as fs } from "fs";
import path from "path";

const CAPTCHA_SECRET = process.env.CAPTCHA_SECRET || "dev-only-captcha-secret-change-me";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_ELAPSED_MS = 1500; // real users can't fill the form faster than this
const CHALLENGE_TTL_MS = 5 * 60 * 1000;

type Lead = {
  prenom: string;
  email: string;
  consent: boolean;
  capturedAt: string;
  source: string;
};

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const prenom = typeof body.prenom === "string" ? body.prenom.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const consent = body.consent === true;
  // Honeypot: a field real visitors never see or fill. Any value here means a bot.
  const honeypot = typeof body.societe === "string" ? body.societe.trim() : "";
  const a = Number(body.a);
  const b = Number(body.b);
  const issuedAt = Number(body.issuedAt);
  const token = typeof body.token === "string" ? body.token : "";
  const answer = Number(body.answer);

  if (honeypot.length > 0) {
    // Pretend success so bots don't learn which check tripped.
    return NextResponse.json({ ok: true });
  }

  if (!prenom || !EMAIL_REGEX.test(email) || !consent) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 400 });
  }

  const expectedToken = crypto.createHmac("sha256", CAPTCHA_SECRET).update(`${a}:${b}:${issuedAt}`).digest("hex");
  const tokenBuffer = Buffer.from(token);
  const expectedBuffer = Buffer.from(expectedToken);
  const tokenValid = tokenBuffer.length === expectedBuffer.length && crypto.timingSafeEqual(tokenBuffer, expectedBuffer);
  const isFresh = Number.isFinite(issuedAt) && Date.now() - issuedAt < CHALLENGE_TTL_MS;
  const isNotInstant = Number.isFinite(issuedAt) && Date.now() - issuedAt > MIN_ELAPSED_MS;
  const answerCorrect = Number.isFinite(answer) && answer === a + b;

  if (!tokenValid || !isFresh || !isNotInstant || !answerCorrect) {
    return NextResponse.json({ ok: false, error: "captcha_failed" }, { status: 400 });
  }

  const lead: Lead = {
    prenom,
    email,
    consent,
    capturedAt: new Date().toISOString(),
    source: "brochure-homepage",
  };

  await Promise.all([saveLeadLocally(lead), pushToBrevo(lead)]);

  return NextResponse.json({ ok: true });
}

/**
 * Best-effort local fallback so leads are captured even without an ESP configured.
 * Only reliable on a persistent filesystem (e.g. a VPS) — NOT on serverless hosts
 * like Vercel, where the filesystem is ephemeral. See BROCHURE-LEADS-SETUP.md.
 */
async function saveLeadLocally(lead: Lead) {
  try {
    const dir = path.join(process.cwd(), "data");
    await fs.mkdir(dir, { recursive: true });
    await fs.appendFile(path.join(dir, "brochure-leads.jsonl"), `${JSON.stringify(lead)}\n`, "utf8");
  } catch (err) {
    console.error("Failed to save brochure lead locally", err);
  }
}

/** Pushes the lead into a Brevo contact list when BREVO_API_KEY is configured. */
async function pushToBrevo(lead: Lead) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) return;

  try {
    const listId = process.env.BREVO_LIST_ID ? Number(process.env.BREVO_LIST_ID) : undefined;
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email: lead.email,
        attributes: { PRENOM: lead.prenom },
        listIds: listId ? [listId] : undefined,
        updateEnabled: true,
      }),
    });
    if (!response.ok) {
      console.error("Brevo contact push failed", response.status, await response.text());
    }
  } catch (err) {
    console.error("Failed to push brochure lead to Brevo", err);
  }
}
