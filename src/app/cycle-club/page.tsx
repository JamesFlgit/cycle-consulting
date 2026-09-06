import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { pageMetadata } from "@/lib/site";
import UniversBand from "./UniversBand";

// CYCLE Club porte l'accent violet de son logo (dégradé pourpre sur noir) —
// décliné ici en dégradé clair pour rester lisible sur la section sombre.
const VIOLET_ON_DARK =
  "bg-gradient-to-r from-[#e9d5ff] via-[#c084fc] to-[#a855f7] bg-clip-text text-transparent";

export const metadata: Metadata = pageMetadata({
  title: "Cycle Club",
  description:
    "Le club CYCLE réunit ses membres autour de la passion, de la relation et de l'émotion : réseau, spiritueux, sport, hippisme, évènements, économie, gastronomie.",
  path: "/cycle-club",
});

const iconProps = {
  viewBox: "0 0 64 64",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-10 w-10",
  "aria-hidden": true,
};

const CLUB_UNIVERS: { label: string; icon: ReactNode }[] = [
  {
    label: "Réseau",
    icon: (
      <svg {...iconProps}>
        <circle cx="14" cy="18" r="4.5" />
        <circle cx="32" cy="10" r="4.5" />
        <circle cx="50" cy="20" r="4.5" />
        <circle cx="12" cy="42" r="4.5" />
        <circle cx="32" cy="54" r="4.5" />
        <circle cx="52" cy="44" r="4.5" />
        <circle cx="33" cy="31" r="4.5" />
        <path d="M33 31 14 18M33 31 32 10M33 31 50 20M33 31 12 42M33 31 32 54M33 31 52 44M14 18 32 10M50 20 52 44M12 42 32 54" />
      </svg>
    ),
  },
  {
    label: "Spiritueux",
    icon: (
      <svg {...iconProps}>
        <path d="M18 8h28l-3.2 20.5a11 11 0 0 1-21.6 0z" />
        <path d="M21.6 19h20.8" />
        <path d="M32 39.5V54" />
        <path d="M22 54h20" />
      </svg>
    ),
  },
  {
    label: "Sport",
    icon: (
      <svg {...iconProps}>
        <circle cx="17" cy="44" r="6.5" />
        <circle cx="46" cy="44" r="6.5" />
        <path d="M6 44h4.5" />
        <path d="M23.5 44h16" />
        <path d="M6 44l2-6h6l4-5h9l2.5 5h10l6 6" />
        <path d="M8 38l-2-5h7l1 5" />
        <path d="M52.5 44h7.5v-6h-4" />
        <path d="M27 33h9l-2 5" />
      </svg>
    ),
  },
  {
    label: "Hippisme",
    icon: (
      <svg {...iconProps}>
        {/* tête de cheval de profil, crinière en escalier façon cavalier d'échecs */}
        <path d="M12 31 19 15 24 10 28 4 32 12 39 14 44 15 40 20 47 23 42 28 49 32 44 37 50 44 47 51 53 57 12 57 18 51 21 44 25 38 16 36 13 34Z" />
        <path d="M19 25h.01" />
      </svg>
    ),
  },
  {
    label: "Évènements",
    icon: (
      <svg {...iconProps}>
        <path d="M10 34v10c0 3.9 9.8 7 22 7s22-3.1 22-7V34" />
        <ellipse cx="32" cy="34" rx="22" ry="7" />
        <path d="M19 45v-6a3 3 0 0 1 6 0v6" />
        <path d="M29 47v-6a3 3 0 0 1 6 0v6" />
        <path d="M39 45v-6a3 3 0 0 1 6 0v6" />
        <path d="M18 27v-9M18 18h7l-2 2.5L25 23h-7" />
        <path d="M32 24V13M32 13h7l-2 2.5L37 18h-7" />
        <path d="M46 27v-9M46 18h7l-2 2.5L53 23h-7" />
      </svg>
    ),
  },
  {
    label: "Économie",
    icon: (
      <svg {...iconProps}>
        <path d="M10 12v40h44" />
        <rect x="17" y="38" width="8" height="12" />
        <rect x="30" y="30" width="8" height="20" />
        <rect x="43" y="22" width="8" height="28" />
        <path d="M14 42l12-12 8 6 16-18" />
        <path d="M44 18h6v6" />
      </svg>
    ),
  },
  {
    label: "Gastronomie",
    icon: (
      <svg {...iconProps}>
        <path d="M8 44a24 24 0 0 1 48 0" />
        <path d="M6 44h52" />
        <path d="M32 20v-3" />
        <circle cx="32" cy="14.5" r="2.5" />
      </svg>
    ),
  },
  {
    label: "Salon",
    icon: (
      <svg {...iconProps}>
        <path d="M18 30v-4a6 6 0 0 1 6-6h16a6 6 0 0 1 6 6v4" />
        <path d="M18 30a5 5 0 0 0-5 5v7h38v-7a5 5 0 0 0-5-5" />
        <path d="M18 30a5 5 0 0 1 5 5v3h18v-3a5 5 0 0 1 5-5" />
        <path d="M15 42v6M49 42v6" />
      </svg>
    ),
  },
  {
    label: "VIP",
    icon: (
      <svg {...iconProps}>
        <path d="M18 10h28l9 13-23 30L9 23z" />
        <path d="M9 23h46" />
        <path d="M18 10l6 13h16l6-13" />
        <path d="M24 23l8 30 8-30" />
      </svg>
    ),
  },
];

// Fond du hero en #0c0b13, appliqué à toute la page ; le logo (PNG officiel
// détouré fourni par Eric) a un fond transparent et s'y fond sans halo.
export default function CycleClubPage() {
  return (
    <section className="flex min-h-[calc(100vh-4.5rem)] flex-col justify-center gap-10 overflow-hidden bg-[#0c0b13] py-10 sm:gap-16 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="sr-only">Cycle Club</h1>

        <Image
          src="/images/cycle-club/cycle-club-officiel.webp"
          alt="Cycle Club"
          width={1500}
          height={905}
          priority
          className="mx-auto h-auto w-52 sm:w-80 lg:w-96"
        />

        <p className="mt-6 text-lg font-semibold sm:mt-8 sm:text-xl">
          <span className={VIOLET_ON_DARK}>Passion</span>
          <span className={`mx-2 font-bold ${VIOLET_ON_DARK}`}>&gt;</span>
          <span className={VIOLET_ON_DARK}>Relation</span>
          <span className={`mx-2 font-bold ${VIOLET_ON_DARK}`}>&gt;</span>
          <span className={VIOLET_ON_DARK}>Émotion</span>
        </p>

        <p className="mx-auto mt-10 max-w-xl text-sm leading-relaxed text-white/75 sm:mt-20 sm:text-base">
          Cet espace est réservé aux membres du club CYCLE.
        </p>

        <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
          <Link
            href="/cycle-club/connexion"
            className="inline-block rounded-md bg-gradient-to-r from-[#a855f7] via-[#8b3bd8] to-[#6d28d9] px-6 py-3 text-center text-sm font-bold text-white transition hover:brightness-110"
          >
            Accéder à mon espace membre
          </Link>
          <Link
            href="/cycle-club/parrainage"
            className="inline-block rounded-md border border-[#a855f7]/50 px-6 py-3 text-center text-sm font-bold text-[#d0b3f7] transition hover:bg-[#a855f7]/10"
          >
            Demander un parrainage
          </Link>
        </div>
      </div>

      <UniversBand items={CLUB_UNIVERS} />
    </section>
  );
}
