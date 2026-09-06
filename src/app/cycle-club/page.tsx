import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { pageMetadata } from "@/lib/site";

// CYCLE Club porte l'accent violet de son logo (dégradé pourpre sur noir) —
// décliné ici en dégradé clair pour rester lisible sur la section sombre.
const VIOLET_ON_DARK =
  "bg-gradient-to-r from-[#e9d5ff] via-[#c084fc] to-[#a855f7] bg-clip-text text-transparent";

export const metadata: Metadata = pageMetadata({
  title: "Cycle Club",
  description:
    "Le Cycle Club réunit les membres du club CYCLE autour de la passion, de la relation et de l'émotion : réseau, spiritueux, sport, évènements, économie et gastronomie.",
  path: "/cycle-club",
});

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
    </section>
  );
}
