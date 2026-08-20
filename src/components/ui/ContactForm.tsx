"use client";

import { useState } from "react";

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
        <label htmlFor="prenom" className="block text-sm font-medium text-anthracite">
          Prénom <span className="text-red-600">*</span>
        </label>
        <input
          id="prenom"
          name="prenom"
          type="text"
          required
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
        <div className="mt-1.5">
          <input
            id="telephone"
            name="telephone"
            type="tel"
            placeholder="06 12 34 56 78"
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
        className="cta-primary cta-primary-on-light w-full rounded-md px-4 py-2.5 text-sm font-bold sm:w-auto"
      >
        Envoyer
      </button>
    </form>
  );
}
