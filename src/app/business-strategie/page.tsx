import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ServiceColumns from "@/components/ui/ServiceColumns";
import { businessStrategieColonnes } from "@/data/business-strategie";

export const metadata: Metadata = {
  title: "Business & Stratégie — Cycle Consulting",
  description:
    "Web Services et Business Services : développez votre activité avec l'accompagnement des Consultants Cycle Consulting.",
};

export default function BusinessStrategiePage() {
  return (
    <>
      <PageHero
        eyebrow="Business & Stratégie"
        title="Développez votre activité à chaque étape de votre croissance"
        description="Une meilleure connaissance de vos enjeux grâce à des Consultants expérimentés et disponibles pour vous accompagner avec Cycle Consulting."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <ServiceColumns colonnes={businessStrategieColonnes} />
      </section>
    </>
  );
}
