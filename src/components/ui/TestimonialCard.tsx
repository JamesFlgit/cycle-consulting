import { type Temoignage } from "@/data/temoignages";

// Bandeau bas aux couleurs de la marque (meme degrade que les carrousels
// Offres / Evenements), en aplat sous la citation.
const BANNER_GRADIENT = "bg-gradient-to-r from-[#fa11f7] via-[#132bdd] to-[#0bceff]";

export default function TestimonialCard({ temoignage }: { temoignage: Temoignage }) {
  // Noms et logos clients soumis à autorisation : on n'affiche que la citation
  // et le secteur d'activité, ce dernier dans le bandeau de couleur en bas.
  return (
    <figure className="flex h-full flex-col overflow-hidden rounded-xl border border-border-subtle bg-surface shadow-sm">
      <div className="flex flex-1 flex-col p-6">
        <span className="font-serif text-5xl leading-none text-accent" aria-hidden="true">
          &ldquo;
        </span>
        <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-anthracite-soft">
          {temoignage.citation}
        </blockquote>
      </div>
      <figcaption
        className={`${BANNER_GRADIENT} px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white`}
      >
        {temoignage.secteur}
      </figcaption>
    </figure>
  );
}
