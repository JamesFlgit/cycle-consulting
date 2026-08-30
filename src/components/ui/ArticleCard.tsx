import Link from "next/link";
import type { Article } from "@/data/articles";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={article.href}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border-subtle bg-surface shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="card-header-frame relative h-32 shrink-0">
        <span className="absolute bottom-3 left-4 z-10 inline-block w-fit rounded-full bg-white/95 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-anthracite shadow-sm">
          {article.categorie}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-anthracite">{article.titre}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-anthracite-mist">{article.extrait}</p>
        <span className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium uppercase tracking-wide text-anthracite-mist">
          <time dateTime={article.dateISO}>{article.dateLabel}</time>
          <span aria-hidden="true">·</span>
          {article.tempsLecture}
          <span aria-hidden="true">·</span>
          <span className="text-[#132bdd] group-hover:underline">Lire l&apos;article</span>
        </span>
      </div>
    </Link>
  );
}
