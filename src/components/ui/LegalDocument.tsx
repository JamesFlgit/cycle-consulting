import type { ReactNode } from "react";
import PageHero from "@/components/ui/PageHero";

/**
 * Gabarit commun aux pages d'informations légales (mentions légales, politique
 * de confidentialité). Hero sobre + colonne de texte lisible.
 */
export default function LegalDocument({
  title,
  description,
  updatedOn,
  children,
}: {
  title: string;
  description?: string;
  /** Date de dernière mise à jour, déjà formatée (ex. « 1er septembre 2026 »). */
  updatedOn: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero eyebrow="Informations légales" title={title} description={description} />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-xs text-anthracite-mist">Dernière mise à jour : {updatedOn}</p>
        <div className="mt-10 space-y-12">{children}</div>
      </section>
    </>
  );
}

/** Une rubrique numérotée du document. */
export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-bold text-anthracite sm:text-2xl">{title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-anthracite-soft sm:text-base">
        {children}
      </div>
    </section>
  );
}

/** Liste à puces réutilisable, alignée sur le reste du texte. */
export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex gap-2.5">
          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#132bdd]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
