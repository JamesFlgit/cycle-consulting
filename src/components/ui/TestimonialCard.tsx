import Image from "next/image";
import { hasCitation, type Temoignage } from "@/data/temoignages";

export default function TestimonialCard({ temoignage }: { temoignage: Temoignage }) {
  // Une citation encore a recueillir (marqueur "[A COMPLETER ...]") ou vide : on
  // affiche quand meme la carte (logo + nom), mais sans bloc de citation.
  const citation = hasCitation(temoignage) ? temoignage.citation : null;

  return (
    <figure className="flex h-full flex-col rounded-xl border border-border-subtle bg-surface p-6 shadow-sm">
      {!citation && <div className="flex-1" aria-hidden="true" />}
      <div className="mx-auto flex h-36 w-full shrink-0 items-center justify-center rounded-lg bg-white p-4">
        {temoignage.logo ? (
          <Image
            src={temoignage.logo}
            alt={`Logo ${temoignage.auteur}`}
            width={240}
            height={112}
            className="h-full w-full object-contain"
            style={temoignage.logoScale ? { transform: `scale(${temoignage.logoScale})` } : undefined}
          />
        ) : (
          <span className="text-3xl font-serif leading-none text-anthracite-mist" aria-hidden="true">
            &ldquo;
          </span>
        )}
      </div>
      {citation ? (
        <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-anthracite-soft">{citation}</blockquote>
      ) : (
        <div className="flex-1" aria-hidden="true" />
      )}
      <figcaption className="mt-4 border-t border-border-subtle pt-4 text-sm font-semibold text-anthracite">
        {temoignage.auteur}
      </figcaption>
    </figure>
  );
}
