import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import PartnerLogo from "@/components/ui/PartnerLogo";
import { partenaires } from "@/data/partenaires";

export const metadata: Metadata = {
  title: "Nos partenaires — Cycle Consulting",
  description: "Découvrez les partenaires technologiques et métiers de Cycle Consulting.",
};

export default function PartenairesPage() {
  return (
    <>
      <PageHero
        eyebrow="Nos partenaires"
        title="Un écosystème de partenaires de confiance"
        description="Cycle Consulting s'appuie sur un réseau de partenaires technologiques et métiers pour garantir la qualité de ses prestations."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {partenaires.map((p) => (
            <PartnerLogo key={p.nom} nom={p.nom} />
          ))}
        </div>
        <p className="mt-8 text-sm text-anthracite-mist">
          Logos présentés à titre indicatif — visuels officiels à intégrer par le client.
        </p>
      </section>
    </>
  );
}
