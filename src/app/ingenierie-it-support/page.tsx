import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ServiceColumns from "@/components/ui/ServiceColumns";
import { ingenierieItColonnes } from "@/data/ingenierie-it-support";

export const metadata: Metadata = {
  title: "Ingénierie & IT Support — Cycle Consulting",
  description:
    "OSS, IT Support et Ingénierie IT : des consultants qualifiés pour renforcer vos équipes techniques et vos infrastructures.",
};

export default function IngenierieItSupportPage() {
  return (
    <>
      <PageHero
        eyebrow="Ingénierie & IT Support"
        title="Des experts techniques pour renforcer vos équipes"
        description="De l'opérateur au responsable de production, Cycle Consulting met à votre disposition des profils qualifiés pour vos infrastructures et votre support IT."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <ServiceColumns colonnes={ingenierieItColonnes} />
      </section>
    </>
  );
}
