import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ArticleCard from "@/components/ui/ArticleCard";
import { articles } from "@/data/articles";
import { pageMetadata } from "@/lib/site";

// Brand gradient, dark variant — for accents on light sections.
const GRADIENT_DARK = "bg-gradient-to-r from-[#fa11f7] via-[#132bdd] to-[#0bceff] bg-clip-text text-transparent";
// Brand gradient, light variant — for accents on dark sections.
const GRADIENT_LIGHT = "bg-gradient-to-r from-[#f77bf0] via-[#6f8cf5] to-[#7ef0ff] bg-clip-text text-transparent";

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description:
    "Analyses, retours d'expérience et repères concrets sur les métiers de l'IT, écrits par les consultants Cycle Consulting qui les pratiquent au quotidien.",
  path: "/ressources",
});

const articlesVisibles = articles
  .filter((article) => article.visible)
  .sort((a, b) => b.dateISO.localeCompare(a.dateISO));

export default function RessourcesPage() {
  return (
    <>
      <PageHero
        eyebrow={<span className={GRADIENT_LIGHT}>Ressources</span>}
        title="Revues et Newsletter Cycle"
        titleClassName="mt-3 text-2xl font-bold text-balance text-white sm:text-3xl xl:text-[1.9rem] xl:leading-[1.2]"
        description={
          <>
            Cycle décrypte l&apos;essentiel de l&apos;actualité IT, et partage l&apos;expérience et les retours
            terrain de ses consultants, pour vous aider à apprendre, comprendre et entreprendre les transitions
            numériques de demain.
            <br />
            <br />
            Par nous, pour vous.
          </>
        }
        image="/images/offres/ressources-dark.webp"
        imageAlt=""
        imageSide="right"
        tint="#581496"
        mobileFullBleedPhoto
      >
        <div className="mt-8">
          <Breadcrumb
            items={["Apprendre", <span key="c" className={`font-semibold ${GRADIENT_LIGHT}`}>Comprendre</span>, "Entreprendre"]}
          />
        </div>
      </PageHero>

      <section className="bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-lg leading-relaxed font-medium text-anthracite sm:text-xl">
            Nos consultants accompagnent chaque jour des entreprises dans leurs projets de transformation,
            d&apos;optimisation des processus et d&apos;amélioration de la performance. Cet espace rassemble ce que
            nous en retenons.
          </p>
          <div className="mt-8 space-y-5 text-sm leading-relaxed text-anthracite-soft sm:text-base">
            <p>
              Pas de discours commercial ni de tendance abstraite : des articles pratiques, illustrés par des cas
              réels, qui répondent à des questions que se posent les équipes IT et les directions.
            </p>
            <p>
              L&apos;objectif est simple : vous donner des repères directement exploitables, que vous soyez
              responsable de production, chef de projet, manager ou dirigeant.
            </p>
          </div>
        </div>
      </section>

      <section id="blog" className="mx-auto max-w-3xl px-4 pt-8 pb-16 sm:pt-10 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-anthracite sm:text-2xl lg:text-3xl">
          À lire <span className={GRADIENT_DARK}>en ce moment</span> sur notre blog
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {articlesVisibles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      <section className="bg-callout-light">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-anthracite sm:text-3xl">
            Un besoin concret <span className={`whitespace-nowrap ${GRADIENT_DARK}`}>derrière votre lecture</span> ?
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-anthracite-soft">
            Un article donne des repères ; votre situation mérite une réponse adaptée. Parlez-nous de votre
            contexte et de vos contraintes : un consultant Cycle Consulting vous répond directement.
          </p>
          <Link
            href="/contact"
            className="cta-primary cta-primary-on-light mt-8 inline-block w-full rounded-md px-6 py-3 text-center text-sm font-bold sm:w-auto"
          >
            Échanger avec un consultant
          </Link>
        </div>
      </section>
    </>
  );
}
