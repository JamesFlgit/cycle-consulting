import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/site";

export type Crumb = { name: string; href?: string };

/**
 * Fil d'Ariane navigable + `BreadcrumbList` JSON-LD.
 * Bandeau utilitaire placé **en tête du corps de page** (juste sous le hero),
 * pas dans le hero : le hero garde son focus (pitch + conversion). L'ordre DOM
 * n'a aucune incidence sur le schéma.
 * Le dernier item = la page courante (sans `href`). Rien n'est rendu à moins de
 * 2 items (une seule entrée = pas de fil d'Ariane).
 */
export default function Breadcrumb({ items }: { items: Crumb[] }) {
  if (items.length < 2) return null;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(items)} />
      <nav aria-label="Fil d'Ariane" className="border-b border-border-subtle bg-surface">
        <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-2 gap-y-1 px-4 py-3 text-xs text-anthracite-mist sm:px-6 sm:text-sm lg:px-8">
          {items.map((item, i) => {
            const last = i === items.length - 1;
            return (
              <li key={i} className="flex items-center gap-x-2">
                {item.href && !last ? (
                  <Link
                    href={item.href}
                    className="underline-offset-2 hover:text-anthracite hover:underline"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <span
                    aria-current={last ? "page" : undefined}
                    className={last ? "text-anthracite-soft" : undefined}
                  >
                    {item.name}
                  </span>
                )}
                {!last && (
                  <span aria-hidden="true" className="text-anthracite-mist/60">
                    /
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
