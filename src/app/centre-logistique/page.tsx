import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ArticleBlocks from "@/components/ui/ArticleBlocks";
import { centreLogistiqueArticle } from "@/data/articles/centre-logistique";

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
        title="Une chaîne logistique intégrée au service de votre performance"
        description="Centre de Services Logistiques & Industrialisation IT."
      />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <ArticleBlocks blocks={centreLogistiqueArticle} />
      </section>
    </>
  );
}
