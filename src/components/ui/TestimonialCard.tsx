import Image from "next/image";
import type { Temoignage } from "@/data/temoignages";

export default function TestimonialCard({ temoignage }: { temoignage: Temoignage }) {
  return (
    <figure className="flex h-full flex-col rounded-xl border border-border-subtle bg-surface p-6 shadow-sm">
      <div className="mx-auto flex h-32 w-full items-center justify-center rounded-lg bg-white p-2">
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
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-anthracite-soft">
        {temoignage.citation}
      </blockquote>
      <figcaption className="mt-4 border-t border-border-subtle pt-4 text-sm font-semibold text-anthracite">
        {temoignage.auteur}
      </figcaption>
    </figure>
  );
}
