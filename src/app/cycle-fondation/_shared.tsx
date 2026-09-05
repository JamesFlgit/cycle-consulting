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
 * Hero des pages enfant : même principe que les heros "à arc" des pages
 * expertises (copie à gauche, visuel docké à droite dont le bord gauche est un
 * arc), mais habillé aux couleurs de la Foundation. À droite : le logo en grand,
 * le slogan juste en dessous.
 */
export function FoundationChildHero({
  breadcrumbLabel,
  title,
  intro,
}: {
  breadcrumbLabel: string;
  title: string;
  intro: string;
}) {
  const logo = (
    <Image
      src="/images/cycle-fondation/logo.webp"
      alt="Cycle Foundation"
      width={1600}
      height={1087}
      priority
      className="h-auto w-full max-w-full mix-blend-screen"
    />
  );

  return (
    <section
      className="relative overflow-hidden xl:grid xl:min-h-(--hero-h) xl:grid-cols-2"
      style={
        {
          background:
            "linear-gradient(115deg, #0a0a0a 0%, #0b0b0b 42%, #17130a 78%, #1e1710 100%)",
          "--hero-h": "clamp(22rem, 26vw, 34rem)",
        } as CSSProperties
      }
    >
      <div className="pointer-events-none absolute inset-0" style={DARK_SECTION_STYLE} />

      {/* Colonne copie — alignée sur la gouttière de la grille du site. */}
      <div className="relative z-10 flex flex-col justify-center px-6 py-12 sm:px-8 xl:min-h-(--hero-h) xl:py-10 xl:pr-10 xl:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
        <div className="xl:max-w-lg">
          <nav aria-label="Fil d'ariane" className="text-sm">
            <ol className="flex flex-wrap items-center gap-2 text-[#ecd9a0]/60">
              <li className="flex items-center gap-2">
                <Link href="/cycle-fondation" className="transition-colors hover:text-[#ecd9a0]">
                  Cycle Foundation
                </Link>
                <span aria-hidden="true">›</span>
              </li>
              <li className="text-[#ecd9a0]">{breadcrumbLabel}</li>
            </ol>
          </nav>

          <h1 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{title}</h1>
          <p className={`mt-4 max-w-2xl text-base leading-relaxed ${GOLD_TEXT_ON_DARK_BG}`}>{intro}</p>
        </div>

        {/* Sous xl : logo + slogan sur un panneau noir, sous la copie. */}
        <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl bg-black px-6 py-6 xl:hidden">
          <div className="w-60 max-w-full sm:w-72">{logo}</div>
          <FoundationSlogan className="sm:text-base" />
        </div>
      </div>

      {/* xl+ : panneau noir docké à droite, bord gauche en arc ; logo en grand + slogan dessous. */}
      <div className="relative hidden xl:block">
        <div className="hero-arc-photo absolute inset-0 flex flex-col items-center justify-center gap-6 bg-black px-14 py-10">
          <div className="w-[68%] max-w-sm">{logo}</div>
          <FoundationSlogan className="text-base" />
        </div>
      </div>
    </section>
  );
}
