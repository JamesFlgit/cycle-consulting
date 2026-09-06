"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const fieldClass =
  "mt-1.5 block w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] disabled:opacity-60";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [locked, setLocked] = useState(false);
  const [retrySeconds, setRetrySeconds] = useState(0);

  // Re-active le formulaire une fois la fenetre de blocage ecoulee.
  useEffect(() => {
    if (!locked) return;
    const timer = setTimeout(() => {
      setLocked(false);
      setMessage("");
    }, retrySeconds * 1000);
    return () => clearTimeout(timer);
  }, [locked, retrySeconds]);

  const canSubmit =
    !locked && !submitting && EMAIL_REGEX.test(email.trim()) && password.length > 0;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    setMessage("");

    try {
      const res = await fetch("/api/cycle-club/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      if (res.status === 429) {
        const data = (await res.json().catch(() => ({}))) as { retryAfter?: number };
        const seconds = Math.max(60, Math.round(data.retryAfter ?? 900));
        const minutes = Math.max(1, Math.round(seconds / 60));
        setRetrySeconds(seconds);
        setLocked(true);
        setMessage(
          `Trop de tentatives de connexion. Nouvel essai possible dans ${minutes} minute${minutes > 1 ? "s" : ""}.`,
        );
        setPassword("");
        return;
      }

      // Aucun backend d'authentification : toutes les tentatives echouent.
      setMessage("E-mail ou mot de passe incorrect.");
      setPassword("");
    } catch {
      setMessage("La connexion a echoue. Verifiez votre connexion et reessayez.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl border border-white/10 bg-white/5 p-6 sm:p-8"
    >
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white">
          E-mail <span className="text-[#f0a6a6]">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          disabled={locked}
          onChange={(e) => {
            setEmail(e.target.value);
            if (message && !locked) setMessage("");
          }}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-white">
          Mot de passe <span className="text-[#f0a6a6]">*</span>
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          disabled={locked}
          onChange={(e) => {
            setPassword(e.target.value);
            if (message && !locked) setMessage("");
          }}
          className={fieldClass}
        />
        <p className="mt-1.5 text-xs text-white/50">
          Mot de passe oublié ? Contactez l&apos;équipe du club.
        </p>
      </div>

      {message && (
        <p role="alert" className={`text-sm ${locked ? "text-[#f0c674]" : "text-[#f0a6a6]"}`}>
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={!canSubmit}
        className="w-full rounded-md bg-gradient-to-r from-[#a855f7] via-[#8b3bd8] to-[#6d28d9] px-4 py-2.5 text-sm font-bold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:brightness-100"
      >
        {submitting ? "Connexion…" : "Se connecter"}
      </button>

      <p className="text-xs leading-relaxed text-white/50">
        Pas encore membre ?{" "}
        <Link
          href="/cycle-club/parrainage"
          className="font-semibold text-white/80 underline underline-offset-2 hover:text-white"
        >
          Demander un parrainage
        </Link>
      </p>
    </form>
  );
}
