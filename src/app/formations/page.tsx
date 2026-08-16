import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ArticleBlocks from "@/components/ui/ArticleBlocks";
import { formationsArticle } from "@/data/articles/formations";

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
        title="Façonner les compétences qui accélèrent la transformation des entreprises"
        description="L'excellence au service du développement des talents."
      >
        <div className="mt-8">
          <Breadcrumb items={["Apprendre", "Comprendre", "Entreprendre"]} />
        </div>
      </PageHero>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <ArticleBlocks blocks={formationsArticle} />
      </section>
    </>
  );
}
