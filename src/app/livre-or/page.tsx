import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import TestimonialCard from "@/components/ui/TestimonialCard";
import PartnerLogo from "@/components/ui/PartnerLogo";
import { temoignages } from "@/data/temoignages";
import { clientsLivreOr } from "@/data/partenaires";

export const metadata: Metadata = {
  title: "Livre d'or — Cycle Consulting",
  description: "Retrouvez les témoignages des clients de Cycle Consulting.",
};

export default function LivreOrPage() {
  return (
    <>
      <PageHero
        eyebrow="Livre d'or"
        title="La confiance de nos clients, notre meilleure référence"
        description="Ils nous font confiance pour accompagner la croissance et la transformation de leur entreprise."
      />

      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-anthracite-mist">
          Ils nous font confiance
        </p>
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {clientsLivreOr.map((c) => (
            <PartnerLogo key={c.nom} nom={c.nom} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {temoignages.map((t) => (
            <TestimonialCard key={t.auteur} temoignage={t} />
          ))}
        </div>
      </section>
    </>
  );
}
