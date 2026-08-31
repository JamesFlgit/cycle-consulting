import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import ArticleCard from "@/components/ui/ArticleCard";
import {
  articles,
  getArticleBySlug,
  getAutresArticles,
  type ArticleBloc,
} from "@/data/articles";

// Brand gradient, light variant — for the category eyebrow on the dark hero.
const GRADIENT_LIGHT = "bg-gradient-to-r from-[#f77bf0] via-[#6f8cf5] to-[#7ef0ff] bg-clip-text text-transparent";
// Brand gradient, dark variant — for accents on the light body.
const GRADIENT_DARK = "bg-gradient-to-r from-[#fa11f7] via-[#132bdd] to-[#0bceff] bg-clip-text text-transparent";

export function generateStaticParams() {
  return articles.filter((a) => a.visible).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.metaTitle,
    description: article.metaDescription,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article || !article.visible) notFound();

  const autresArticles = getAutresArticles(article.slug, 2);

  return (
    <>
      <PageHero
        eyebrow={<span className={GRADIENT_LIGHT}>{article.categorie}</span>}
        title={article.titre}
        titleClassName="mt-3 max-w-4xl text-2xl font-bold text-white sm:text-3xl lg:text-4xl"
        description={article.chapo}
        image={article.image}
      >
        <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-white/15 pt-6 text-xs text-white/60 sm:text-sm">
          <time dateTime={article.dateISO}>{article.dateLabel}</time>
          <span aria-hidden="true">·</span>
          <span>{article.tempsLecture}</span>
          <span aria-hidden="true">·</span>
          <span>Rédaction Cycle Consulting</span>
        </div>
        <div className="mt-6">
          <Link href="/ressources" className="text-sm font-semibold text-white underline-offset-4 hover:underline">
            ← Toutes les ressources
          </Link>
        </div>
      </PageHero>

      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {article.sections.map((section) => (
            <section key={section.titre}>
              <h2 className="text-xl font-bold text-anthracite sm:text-2xl">{section.titre}</h2>
              <div className="mt-4 space-y-4">
                {section.blocs.map((bloc, index) => (
                  <Bloc key={index} bloc={bloc} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-14 flex gap-5 rounded-xl border border-border-subtle bg-surface-alt p-6 sm:gap-6 sm:p-8">
          <span className="w-1.5 shrink-0 self-stretch rounded-full bg-gradient-to-b from-[#fa11f7] via-[#132bdd] to-[#0bceff]" />
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-anthracite">À retenir</p>
            <ul className="mt-4 space-y-2.5">
              {article.aRetenir.map((point) => (
                <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-anthracite-soft">
                  <CheckMark />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {article.sources.length > 0 && (
          <div className="mt-10">
            <p className="text-xs font-semibold uppercase tracking-wide text-anthracite-mist">Pour aller plus loin</p>
            <ul className="mt-3 space-y-1.5 text-sm text-anthracite-mist">
              {article.sources.map((source) => (
                <li key={source.label}>
                  {source.label}
                  <span className="text-anthracite-mist/70"> · {source.editeur}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="mt-10 border-t border-border-subtle pt-6 text-xs text-anthracite-mist">
          Ressource à visée informative. Les recommandations générales présentées ici ne remplacent pas une
          analyse de votre contexte par un consultant.
        </p>
      </article>

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

      {autresArticles.length > 0 && (
        <section className="bg-surface-alt py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="À lire aussi" title="D'autres articles" center />
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {autresArticles.map((autre) => (
                <ArticleCard key={autre.slug} article={autre} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function Bloc({ bloc }: { bloc: ArticleBloc }) {
  if (bloc.type === "paragraphe") {
    return <p className="text-sm leading-relaxed text-anthracite-soft sm:text-base">{bloc.texte}</p>;
  }

  if (bloc.type === "liste") {
    return (
      <ul className="space-y-2.5">
        {bloc.items.map((item) => (
          <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-anthracite-soft sm:text-base">
            <CheckMark />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="rounded-xl border border-border-subtle bg-surface-alt p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-anthracite-mist">{bloc.titre}</p>
      <p className="mt-2 text-sm leading-relaxed text-anthracite-soft">{bloc.texte}</p>
    </div>
  );
}

function CheckMark() {
  return (
    <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-[#132bdd]" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="currentColor" opacity={0.12} />
      <path
        d="m6 10.2 2.6 2.6L14.2 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
