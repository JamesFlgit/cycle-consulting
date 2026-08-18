import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import CasClientCard from "@/components/ui/CasClientCard";
import { casClients } from "@/data/cas-clients";

export const metadata: Metadata = {
  title: "Cas clients — Cycle Consulting",
  description: "Découvrez comment Cycle Consulting accompagne ses clients, tous secteurs confondus.",
};

export default function CasClientsPage() {
  const visibles = casClients.filter((c) => c.visible);

  return (
    <>
      <PageHero
        eyebrow="Cas clients"
        title="Ils nous font confiance sur des enjeux similaires aux vôtres"
        description="Pour des raisons de confidentialité contractuelle, nos références sont présentées de façon anonymisée : les enjeux, l'intervention et les résultats décrits sont réels, seul le nom du client n'est pas communiqué."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibles.map((casClient) => (
            <CasClientCard key={casClient.slug} casClient={casClient} imageHeader />
          ))}
        </div>
      </section>
    </>
  );
}
