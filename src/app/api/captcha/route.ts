import { NextResponse } from "next/server";
import crypto from "crypto";

// Route is stateless on purpose (works across serverless invocations): the
// challenge numbers are signed with an HMAC so /api/brochure-lead can verify
// they weren't tampered with, without needing to store anything server-side.
export const dynamic = "force-dynamic";

const CAPTCHA_SECRET = process.env.CAPTCHA_SECRET || "dev-only-captcha-secret-change-me";

export async function GET() {
  const a = crypto.randomInt(1, 9);
  const b = crypto.randomInt(1, 9);
  const issuedAt = Date.now();
  const token = crypto.createHmac("sha256", CAPTCHA_SECRET).update(`${a}:${b}:${issuedAt}`).digest("hex");

  return NextResponse.json({ a, b, issuedAt, token });
}
