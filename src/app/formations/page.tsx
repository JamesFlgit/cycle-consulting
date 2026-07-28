import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ServiceColumns from "@/components/ui/ServiceColumns";
import { formationsColonnes } from "@/data/formations";

export const metadata: Metadata = {
  title: "Formations — Cycle Consulting",
  description:
    "Montez en compétence sur les outils Microsoft (Office, O365) et les processus Cycle Forms avec les Consultants Cycle Consulting.",
};

export default function FormationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Formations"
        title="Montez en compétence avec l'expertise des Consultants Cycle"
        description="Augmentez vos performances professionnelles et personnelles grâce à des formations ciblées sur les outils du quotidien et les processus métiers."
      >
        <div className="mt-8">
          <Breadcrumb items={["Apprendre", "Comprendre", "Entreprendre"]} />
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <ServiceColumns colonnes={formationsColonnes} withBrochure />
      </section>
    </>
  );
}
