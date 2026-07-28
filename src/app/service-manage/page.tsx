import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ServiceColumns from "@/components/ui/ServiceColumns";
import { serviceManageColonnes } from "@/data/service-manage";

export const metadata: Metadata = {
  title: "Service Managé — Cycle Consulting",
  description:
    "Service Delivery, infogérance et veille technologique : pilotez votre entreprise avec les meilleurs outils grâce aux Consultants Cycle Consulting.",
};

export default function ServiceManagePage() {
  return (
    <>
      <PageHero
        eyebrow="Service Managé"
        title="Des livrables de qualité pour piloter votre entreprise"
        description="Du Technicien au Responsable de Production, Cycle Consulting vous accompagne quel que soit le niveau de service à intégrer et l'expertise à solliciter."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <ServiceColumns colonnes={serviceManageColonnes} />
      </section>
    </>
  );
}
