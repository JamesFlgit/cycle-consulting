import Image from "next/image";
import Link from "next/link";
import type { CasClient } from "@/data/cas-clients";

export default function CasClientCard({
  casClient,
  imageHeader = false,
}: {
  casClient: CasClient;
  /** Adds a framed header area for an illustration — used on the cas-clients hub page. */
  imageHeader?: boolean;
}) {
  return (
    <Link
      href={casClient.href}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border-subtle bg-surface shadow-sm transition-shadow hover:shadow-md"
    >
      {imageHeader && (
        <div className="relative h-40 shrink-0 overflow-hidden">
          {casClient.image ? (
            <div className="absolute inset-0 px-3">
              <Image
                src={casClient.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ) : (
            <div className="card-header-frame h-full w-full" />
          )}
          <span className="absolute bottom-3 left-4 z-10 inline-block w-fit rounded-full bg-white/95 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-anthracite shadow-sm">
            {casClient.secteur}
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        {!imageHeader && (
          <span className="inline-block w-fit rounded-full bg-surface-alt px-3 py-1 text-xs font-semibold uppercase tracking-wide text-anthracite-mist">
            {casClient.secteur}
          </span>
        )}
        <h3 className={`text-lg font-semibold text-anthracite ${imageHeader ? "" : "mt-4"}`}>{casClient.navLabel}</h3>
        {casClient.environnement && <p className="mt-1 text-xs text-anthracite-mist">{casClient.environnement}</p>}
        <p className="mt-3 flex-1 text-sm leading-relaxed text-anthracite-mist">{casClient.resume}</p>
        <span className="mt-6 text-sm font-semibold text-[#132bdd] underline-offset-4 hover:underline">
          Découvrir le cas client →
        </span>
      </div>
    </Link>
  );
}
