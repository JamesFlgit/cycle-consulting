import type { Temoignage } from "@/data/temoignages";

export default function TestimonialCard({ temoignage }: { temoignage: Temoignage }) {
  return (
    <figure className="flex h-full flex-col rounded-xl border border-border-subtle bg-surface p-6 shadow-sm">
      <span className="text-3xl font-serif leading-none text-anthracite-mist" aria-hidden="true">
        &ldquo;
      </span>
      <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-anthracite-soft">
        {temoignage.citation}
      </blockquote>
      <figcaption className="mt-4 border-t border-border-subtle pt-4 text-sm font-semibold text-anthracite">
        {temoignage.auteur}
      </figcaption>
    </figure>
  );
}
