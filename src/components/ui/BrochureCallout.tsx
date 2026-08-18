"use client";

import { useState } from "react";
import BrochureModal from "@/components/ui/BrochureModal";

export default function BrochureCallout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="bg-anthracite py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/60">Besoin d&apos;aller plus loin ?</p>
        <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
          Vous n&apos;avez pas trouvé l&apos;information recherchée ?
        </h2>
        <p className="mt-4 text-base leading-relaxed text-white/80">
          Téléchargez notre brochure pour découvrir en détail l&apos;ensemble de nos offres et notre savoir-faire.
        </p>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="cta-primary mt-8 rounded-md px-6 py-3 text-sm font-bold"
        >
          Télécharger la brochure
        </button>
      </div>

      <BrochureModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </section>
  );
}
