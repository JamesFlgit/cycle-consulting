import Image from "next/image";
import { hasCitation, type Temoignage } from "@/data/temoignages";

// Bandeau bas aux couleurs de la marque (meme degrade que les carrousels
// Offres / Evenements), en aplat sous la citation.
const BANNER_GRADIENT = "bg-gradient-to-r from-[#fa11f7] via-[#132bdd] to-[#0bceff]";

export default function TestimonialCard({ temoignage }: { temoignage: Temoignage }) {
  // Les noms clients restent confidentiels : seul le secteur d'activite est
  // affiche, dans le bandeau de couleur. Les clients qui ont donne leur accord
  // font exception et portent leur logo.
  const citation = hasCitation(temoignage) ? temoignage.citation : null;

  return (
    <figure className="flex h-full flex-col overflow-hidden rounded-xl border border-border-subtle bg-surface shadow-sm">
      <div className="flex flex-1 flex-col p-6">
        {/* Bandeau haut de hauteur fixe, present sur TOUTES les cartes (logo ou
            guillemet) pour que le gabarit reste identique et les cartes alignees.
            Sans citation, la carte est un logo seul : il prend la hauteur libre.
            Le logo est en `fill` (donc en absolu) : il se contente de la place
            disponible et ne dicte JAMAIS la hauteur de la carte, sinon un logo
            en portrait etirerait toutes les cartes du carrousel. */}
        <div className={`relative flex items-center ${citation ? "h-24 shrink-0" : "min-h-40 flex-1"}`}>
          {temoignage.logo ? (
            <Image
              src={temoignage.logo}
              alt={`Logo ${temoignage.ref}`}
              fill
              sizes="(min-width: 1024px) 384px, (min-width: 640px) 45vw, 90vw"
              className="object-contain"
            />
          ) : (
            <span className="font-serif text-5xl leading-none text-accent" aria-hidden="true">
              &ldquo;
            </span>
          )}
        </div>
        {citation && (
          <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-anthracite-soft">
            {citation}
          </blockquote>
        )}
      </div>
      <figcaption
        className={`${BANNER_GRADIENT} px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white`}
      >
        {temoignage.secteur}
      </figcaption>
    </figure>
  );
}
