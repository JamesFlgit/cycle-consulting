import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";

// Identité CYCLE Foundation (or/noir) — partagée entre la page principale et ses
// pages enfant (faire un don, contact).
export const GOLD_ON_DARK =
  "bg-gradient-to-r from-[#f8e3a3] via-[#d4af37] to-[#9c7a2c] bg-clip-text text-transparent";
export const GOLD_ON_LIGHT =
  "bg-gradient-to-r from-[#8a6a1f] via-[#b8952f] to-[#8a6a1f] bg-clip-text text-transparent";
export const GOLD_TEXT_ON_DARK_BG = "text-[#ecd9a0]";
export const GOLD_TEXT_ON_LIGHT_BG = "text-[#8a6a1f]";

export const DARK_SECTION_STYLE: CSSProperties = {
  backgroundImage:
    "radial-gradient(circle at 50% 15%, rgba(212,175,55,0.16) 0%, transparent 55%), linear-gradient(160deg, #141414 0%, #0d0d0d 45%, #060606 75%, #020202 100%)",
};

/** Slogan de la Foundation, or sur fond sombre. */
export function FoundationSlogan({ className = "" }: { className?: string }) {
  return (
    <span className={`text-sm font-semibold ${className}`}>
      <span className={GOLD_ON_DARK}>Apprendre</span>
      <span className={`mx-1.5 font-bold ${GOLD_ON_DARK}`}>&gt;</span>
      <span className={GOLD_ON_DARK}>Comprendre</span>
      <span className={`mx-1.5 font-bold ${GOLD_ON_DARK}`}>&gt;</span>
      <span className={GOLD_ON_DARK}>Transmettre</span>
    </span>
  );
}

/**
 * Hero des pages enfant (faire un don, contact) : fond noir, le logo occupe
 * tout le hero, slogan juste en dessous. Le webp du logo a déjà un fond noir :
 * sur `bg-black` il se fond sans artefact, à toutes les tailles d'écran.
 * Le H1 / l'intro sont rendus par la page, en tête de sa section de contenu.
 */
export function FoundationChildHero({ breadcrumbLabel }: { breadcrumbLabel: string }) {
  return (
    <section className="bg-black">
      <div className="mx-auto max-w-5xl px-4 pt-8 pb-10 sm:px-6 sm:pb-14 lg:px-8">
        <nav aria-label="Fil d'ariane" className="text-sm">
          <ol className="flex flex-wrap items-center gap-2 text-[#ecd9a0]/55">
            <li className="flex items-center gap-2">
              <Link href="/cycle-fondation" className="transition-colors hover:text-[#ecd9a0]">
                Cycle Foundation
              </Link>
              <span aria-hidden="true">›</span>
            </li>
            <li className="text-[#ecd9a0]">{breadcrumbLabel}</li>
          </ol>
        </nav>

        <div className="mt-6 flex flex-col items-center sm:mt-8">
          <Image
            src="/images/cycle-fondation/logo.webp"
            alt="Cycle Foundation"
            width={1600}
            height={1087}
            priority
            className="h-auto w-full max-w-3xl"
          />
          <FoundationSlogan className="mt-3 sm:text-base" />
        </div>
      </div>
    </section>
  );
}
