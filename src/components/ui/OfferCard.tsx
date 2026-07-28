import Link from "next/link";
import type { Offre } from "@/data/offres";

export default function OfferCard({ offre }: { offre: Offre }) {
  return (
    <div className="flex flex-col rounded-xl border border-border-subtle bg-surface p-6 shadow-sm transition-shadow hover:shadow-md">
      <h3 className="text-lg font-semibold text-anthracite">{offre.titre}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-anthracite-mist">{offre.accroche}</p>
      <div className="mt-6 border-t border-border-subtle pt-4">
        <div className="mb-4">
          <p className="text-xs uppercase tracking-wide text-anthracite-mist">À partir de</p>
          <p className="text-sm font-semibold text-anthracite">{offre.apartirde}</p>
        </div>
        <Link
          href="/contact"
          className="block w-full rounded-md bg-anthracite px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-anthracite-soft"
        >
          Demander un devis
        </Link>
      </div>
    </div>
  );
}
