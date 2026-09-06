import { NextResponse, type NextRequest } from "next/server";
import crypto from "crypto";

// Faux espace membre : il n'existe pas (encore) de backend d'authentification
// pour le Cycle Club. Ce handler renvoie donc TOUJOURS un echec de connexion,
// mais applique un vrai garde anti-force-brute pour que la page se comporte
// comme un formulaire fonctionnel.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RATE_SECRET =
  process.env.RATE_LIMIT_SECRET ||
  process.env.CAPTCHA_SECRET ||
  "dev-only-rate-limit-secret-change-me";

const WINDOW_MS = 15 * 60 * 1000; // fenetre glissante de comptage
const MAX_ATTEMPTS = 5; // tentatives autorisees avant blocage temporaire
const COOKIE = "cc_login_gate";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Gate = { count: number; resetAt: number };

// Compteur best-effort en memoire, par IP. Sur hebergement serverless il peut
// repartir de zero a froid : le cookie signe ci-dessous sert alors de filet.
const ipGates = new Map<string, Gate>();

function pruneExpired(now: number) {
  for (const [key, gate] of ipGates) {
    if (now >= gate.resetAt) ipGates.delete(key);
  }
}

function sign(body: string) {
  return crypto.createHmac("sha256", RATE_SECRET).update(body).digest("base64url");
}

function freshGate(now: number): Gate {
  return { count: 0, resetAt: now + WINDOW_MS };
}

function readCookieGate(value: string | undefined, now: number): Gate {
  if (!value) return freshGate(now);
  const [body, mac] = value.split(".");
  if (!body || !mac) return freshGate(now);

  const given = Buffer.from(mac);
  const want = Buffer.from(sign(body));
  if (given.length !== want.length || !crypto.timingSafeEqual(given, want)) {
    return freshGate(now);
  }

  try {
    const parsed = JSON.parse(Buffer.from(body, "base64url").toString()) as Gate;
    if (
      !Number.isFinite(parsed.count) ||
      !Number.isFinite(parsed.resetAt) ||
      now >= parsed.resetAt
    ) {
      return freshGate(now);
    }
    return parsed;
  } catch {
    return freshGate(now);
  }
}

function serializeGate(gate: Gate) {
  const body = Buffer.from(JSON.stringify(gate)).toString("base64url");
  return `${body}.${sign(body)}`;
}

function cookieOptions(now: number, resetAt: number) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: Math.max(1, Math.ceil((resetAt - now) / 1000)),
  };
}

function clientIp(request: NextRequest) {
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return "unknown";
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(request: NextRequest) {
  const now = Date.now();
  pruneExpired(now);

  const ip = clientIp(request);
  const ipGate = ipGates.get(ip);
  const ipCount = ipGate && now < ipGate.resetAt ? ipGate.count : 0;
  const cookieGate = readCookieGate(request.cookies.get(COOKIE)?.value, now);

  // On retient le compteur le plus eleve et la fin de fenetre la plus lointaine.
  const attempts = Math.max(ipCount, cookieGate.count);
  const resetAt = Math.max(
    ipGate && now < ipGate.resetAt ? ipGate.resetAt : now + WINDOW_MS,
    cookieGate.resetAt,
  );

  if (attempts >= MAX_ATTEMPTS) {
    const retryAfter = Math.max(1, Math.ceil((resetAt - now) / 1000));
    console.warn(`[cycle-club/login] tentative bloquee (rate limit) ip=${ip}`);
    const res = NextResponse.json(
      { ok: false, error: "rate_limited", retryAfter },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
    res.cookies.set(COOKIE, serializeGate({ count: attempts, resetAt }), cookieOptions(now, resetAt));
    return res;
  }

  // On lit le corps uniquement pour distinguer 400 / 401 : aucune combinaison
  // ne peut aboutir a une session.
  let email = "";
  let password = "";
  try {
    const body = (await request.json()) as Record<string, unknown>;
    if (typeof body.email === "string") email = body.email.trim().slice(0, 200);
    if (typeof body.password === "string") password = body.password.slice(0, 200);
  } catch {
    // corps illisible : traite comme une tentative invalide (et comptee)
  }

  const gate: Gate = { count: attempts + 1, resetAt };
  ipGates.set(ip, gate);

  // Leger delai (avec jitter) : ralentit le bourrinage et imite le cout d'un
  // vrai hash de mot de passe.
  await wait(450 + Math.floor(Math.random() * 250));

  const looksValid = EMAIL_REGEX.test(email) && password.length > 0;
  const res = NextResponse.json(
    { ok: false, error: looksValid ? "invalid_credentials" : "invalid_fields" },
    { status: looksValid ? 401 : 400 },
  );
  res.cookies.set(COOKIE, serializeGate(gate), cookieOptions(now, resetAt));
  return res;
}
