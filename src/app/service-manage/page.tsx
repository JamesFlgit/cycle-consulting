import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ArticleBlocks from "@/components/ui/ArticleBlocks";
import { serviceManageArticle } from "@/data/articles/service-manage";

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
        title="Des experts de proximité au service de votre performance opérationnelle"
        description="L'excellence des services managés sur site."
      />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <ArticleBlocks blocks={serviceManageArticle} />
      </section>
    </>
  );
}
