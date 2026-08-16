import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ArticleBlocks from "@/components/ui/ArticleBlocks";
import { businessStrategieArticle } from "@/data/articles/business-strategie";

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
        title="Transformer les ambitions en résultats durables"
        description="Conseil en Business & Stratégie."
      />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <ArticleBlocks blocks={businessStrategieArticle} />
      </section>
    </>
  );
}
