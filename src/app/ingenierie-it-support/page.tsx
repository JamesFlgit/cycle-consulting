import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ArticleBlocks from "@/components/ui/ArticleBlocks";
import { ingenierieItArticle } from "@/data/articles/ingenierie-it-support";

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
        title="Piloter la performance des services numériques avec une expertise de haut niveau"
        description="Conseil en Infogérance & Gouvernance des Services IT."
      />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <ArticleBlocks blocks={ingenierieItArticle} />
      </section>
    </>
  );
}
