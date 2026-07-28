import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ServiceColumns from "@/components/ui/ServiceColumns";
import { centreLogistiqueColonnes } from "@/data/centre-logistique";

export const metadata: Metadata = {
  title: "Centre Logistique — Cycle Consulting",
  description:
    "Stockage, livraison et expertises métiers : Cycle Consulting gère votre logistique IT de bout en bout.",
};

export default function CentreLogistiquePage() {
  return (
    <>
      <PageHero
        eyebrow="Centre Logistique"
        title="Une logistique IT maîtrisée de bout en bout"
        description="Stockage, livraison nationale et internationale, expertises métiers : Cycle Consulting sécurise l'ensemble de votre chaîne logistique IT."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <ServiceColumns colonnes={centreLogistiqueColonnes} />
      </section>
    </>
  );
}
