"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { entreprise } from "@/data/entreprise";

type Challenge = { a: number; b: number; issuedAt: number; token: string };
type Status = "idle" | "loading" | "success" | "error";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [entrepriseNom, setEntrepriseNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot — must stay empty
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function fetchChallenge() {
    fetch("/api/captcha")
      .then((res) => res.json())
      .then(setChallenge)
      .catch(() => setChallenge(null));
  }

  useEffect(() => {
    fetchChallenge();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!challenge) return;

    if (!EMAIL_REGEX.test(email)) {
      setErrorMessage("Merci de renseigner une adresse e-mail valide.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prenom,
          nom,
          entreprise: entrepriseNom,
          email,
          telephone,
          message,
          website,
          a: challenge.a,
          b: challenge.b,
          issuedAt: challenge.issuedAt,
          token: challenge.token,
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(
          "Votre message n'a pas pu être envoyé. Merci de réessayer dans un instant, ou de nous écrire directement.",
        );
        fetchChallenge();
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage(
        "Une erreur est survenue. Merci de réessayer dans un instant, ou de nous écrire directement.",
      );
      fetchChallenge();
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-border-subtle bg-surface-alt p-8 text-center">
        <p className="text-lg font-semibold text-anthracite">Merci pour votre message !</p>
        <p className="mt-2 text-sm text-anthracite-mist">
          Un consultant Cycle Consulting reviendra vers vous dans les meilleurs délais.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border border-border-subtle bg-surface p-6 sm:p-8">
      {/* Honeypot: invisible to real visitors, off-screen and unreachable by tab — bots fill it, humans never do. */}
      <div className="absolute left-[-9999px] top-auto" aria-hidden="true">
        <label htmlFor="contact-website">Site web</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="prenom" className="block text-sm font-medium text-anthracite">
          Prénom <span className="text-red-600">*</span>
        </label>
        <input
          id="prenom"
          name="prenom"
          type="text"
          required
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          className="mt-1.5 block w-full rounded-md border border-border-subtle bg-white px-3 py-2 text-sm text-anthracite outline-none focus:border-anthracite focus:ring-1 focus:ring-anthracite"
        />
      </div>

      <div>
        <label htmlFor="nom" className="block text-sm font-medium text-anthracite">
          Nom <span className="text-red-600">*</span>
        </label>
        <input
          id="nom"
          name="nom"
          type="text"
          required
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="mt-1.5 block w-full rounded-md border border-border-subtle bg-white px-3 py-2 text-sm text-anthracite outline-none focus:border-anthracite focus:ring-1 focus:ring-anthracite"
        />
      </div>

      <div>
        <label htmlFor="entreprise" className="block text-sm font-medium text-anthracite">
          Entreprise
        </label>
        <input
          id="entreprise"
          name="entreprise"
          type="text"
          value={entrepriseNom}
          onChange={(e) => setEntrepriseNom(e.target.value)}
          className="mt-1.5 block w-full rounded-md border border-border-subtle bg-white px-3 py-2 text-sm text-anthracite outline-none focus:border-anthracite focus:ring-1 focus:ring-anthracite"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-anthracite">
          E-mail <span className="text-red-600">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1.5 block w-full rounded-md border border-border-subtle bg-white px-3 py-2 text-sm text-anthracite outline-none focus:border-anthracite focus:ring-1 focus:ring-anthracite"
        />
      </div>

      <div>
        <label htmlFor="telephone" className="block text-sm font-medium text-anthracite">
          Téléphone
        </label>
        <div className="mt-1.5">
          <input
            id="telephone"
            name="telephone"
            type="tel"
            placeholder="06 12 34 56 78"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            className="block w-full rounded-md border border-border-subtle bg-white px-3 py-2 text-sm text-anthracite outline-none focus:border-anthracite focus:ring-1 focus:ring-anthracite"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-anthracite">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1.5 block w-full rounded-md border border-border-subtle bg-white px-3 py-2 text-sm text-anthracite outline-none focus:border-anthracite focus:ring-1 focus:ring-anthracite"
        />
      </div>

      {errorMessage && (
        <p className="text-sm text-red-600">
          {errorMessage}{" "}
          <a href={`mailto:${entreprise.email}`} className="font-semibold underline">
            {entreprise.email}
          </a>
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading" || !challenge}
        className="cta-primary cta-primary-on-light w-full rounded-md px-4 py-2.5 text-sm font-bold disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? "Envoi…" : "Envoyer"}
      </button>

      <p className="text-xs leading-relaxed text-anthracite-mist">
        Les informations transmises sont utilisées uniquement pour traiter votre demande. Voir notre{" "}
        <Link href="/politique-de-confidentialite" className="underline underline-offset-2">
          politique de confidentialité
        </Link>
        .
      </p>
    </form>
  );
}
