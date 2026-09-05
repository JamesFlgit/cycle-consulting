import Link from "next/link";
import type { OffreEmploi } from "@/data/offres-emploi";

export default function OffreEmploiCard({ offre }: { offre: OffreEmploi }) {
  return (
    <Link
      href={offre.href}
      className="group flex h-full flex-col rounded-xl border border-border-subtle bg-surface p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <span className="inline-block w-fit rounded-full bg-surface-alt px-3 py-1 text-xs font-semibold uppercase tracking-wide text-anthracite-mist">
        Mission à pourvoir
      </span>
      <h3 className="mt-4 text-lg font-semibold text-anthracite">{offre.titre}</h3>
      <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-anthracite-mist">
        <span>{offre.lieu}</span>
        {offre.typeContrat && (
          <>
            <span aria-hidden="true">·</span>
            <span>{offre.typeContrat}</span>
          </>
        )}
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-anthracite-mist">{offre.resume}</p>
      <span className="mt-6 text-sm font-semibold text-[#132bdd] underline-offset-4 group-hover:underline">
        Voir l&apos;offre →
      </span>
    </Link>
  );
}
