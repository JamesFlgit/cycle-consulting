"use client";

import { useState } from "react";
import { indicatifsPays } from "@/data/entreprise";

export default function ContactForm() {
  const [envoye, setEnvoye] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnvoye(true);
  }

  if (envoye) {
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
      <div>
        <label htmlFor="nom" className="block text-sm font-medium text-anthracite">
          Prénom &amp; Nom <span className="text-red-600">*</span>
        </label>
        <input
          id="nom"
          name="nom"
          type="text"
          required
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
          className="mt-1.5 block w-full rounded-md border border-border-subtle bg-white px-3 py-2 text-sm text-anthracite outline-none focus:border-anthracite focus:ring-1 focus:ring-anthracite"
        />
      </div>

      <div>
        <label htmlFor="telephone" className="block text-sm font-medium text-anthracite">
          Téléphone
        </label>
        <div className="mt-1.5 flex gap-2">
          <select
            id="indicatif"
            name="indicatif"
            className="w-32 shrink-0 rounded-md border border-border-subtle bg-white px-2 py-2 text-sm text-anthracite outline-none focus:border-anthracite focus:ring-1 focus:ring-anthracite"
            defaultValue="+33"
          >
            {indicatifsPays.map((i) => (
              <option key={i.code} value={i.code}>
                {i.code} {i.pays}
              </option>
            ))}
          </select>
          <input
            id="telephone"
            name="telephone"
            type="tel"
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
          className="mt-1.5 block w-full rounded-md border border-border-subtle bg-white px-3 py-2 text-sm text-anthracite outline-none focus:border-anthracite focus:ring-1 focus:ring-anthracite"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-anthracite px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-anthracite-soft sm:w-auto"
      >
        Envoyer
      </button>
    </form>
  );
}
