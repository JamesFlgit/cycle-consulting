import Link from "next/link";
import type { CasClient } from "@/data/cas-clients";

export default function CasClientCard({ casClient }: { casClient: CasClient }) {
  return (
    <Link
      href={casClient.href}
      className="flex flex-col rounded-xl border border-border-subtle bg-surface p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <span className="inline-block w-fit rounded-full bg-surface-alt px-3 py-1 text-xs font-semibold uppercase tracking-wide text-anthracite-mist">
        {casClient.secteur}
      </span>
      <h3 className="mt-4 text-lg font-semibold text-anthracite">{casClient.navLabel}</h3>
      {casClient.tailleEntreprise && (
        <p className="mt-1 text-xs text-anthracite-mist">{casClient.tailleEntreprise}</p>
      )}
      <p className="mt-3 flex-1 text-sm leading-relaxed text-anthracite-mist">{casClient.resume}</p>
      <span className="mt-6 text-sm font-semibold text-anthracite underline-offset-4 hover:underline">
        Découvrir le cas client →
      </span>
    </Link>
  );
}
