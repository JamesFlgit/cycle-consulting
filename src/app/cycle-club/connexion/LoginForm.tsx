"use client";

import { useState } from "react";
import Link from "next/link";

const fieldClass =
  "mt-1.5 block w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7]";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center">
        <p className="text-lg font-semibold text-white">L&apos;espace membre ouvre bientôt</p>
        <p className="mt-2 text-sm leading-relaxed text-white/70">
          Les accès personnels du Cycle Club sont en cours de déploiement : agenda des rencontres,
          annuaire des membres, invitations aux évènements. Nous avons noté votre intérêt et revenons
          vers vous dès l&apos;ouverture.
        </p>
        <Link
          href="/cycle-club"
          className="mt-6 inline-block text-sm font-semibold text-[#d0b3f7] underline-offset-4 hover:underline"
        >
          Retour au Cycle Club
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
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
          onChange={(e) => setEmail(e.target.value)}
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
          onChange={(e) => setPassword(e.target.value)}
          className={fieldClass}
        />
        <p className="mt-1.5 text-xs text-white/50">Mot de passe oublié ? Contactez l&apos;équipe du club.</p>
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-gradient-to-r from-[#a855f7] via-[#8b3bd8] to-[#6d28d9] px-4 py-2.5 text-sm font-bold text-white transition hover:brightness-110"
      >
        Se connecter
      </button>

      <p className="text-xs leading-relaxed text-white/50">
        Pas encore membre ?{" "}
        <Link href="/cycle-club/parrainage" className="font-semibold text-white/80 underline underline-offset-2 hover:text-white">
          Demander un parrainage
        </Link>
      </p>
    </form>
  );
}
