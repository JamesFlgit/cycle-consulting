import type { CSSProperties } from "react";
import Image from "next/image";
import Breadcrumb from "@/components/ui/Breadcrumb";

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

/** Slogan de la Foundation, or sur fond sombre. Les segments sont séparés par
 *  de vrais espaces : le chemin se replie sur les petits écrans au lieu d'être
 *  rogné. */
export function FoundationSlogan({ className = "" }: { className?: string }) {
  return (
    <span className={`text-sm font-semibold ${className}`}>
      <span className={`whitespace-nowrap ${GOLD_ON_DARK}`}>Apprendre</span>{" "}
      <span className={`whitespace-nowrap ${GOLD_ON_DARK}`}>
        <span className={`mr-1.5 font-bold ${GOLD_ON_DARK}`}>&gt;</span>Comprendre
      </span>{" "}
      <span className={`whitespace-nowrap ${GOLD_ON_DARK}`}>
        <span className={`mr-1.5 font-bold ${GOLD_ON_DARK}`}>&gt;</span>Transmettre
      </span>
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
    <>
      <section className="bg-black">
        <div className="mx-auto flex max-w-5xl flex-col items-center px-4 pt-10 pb-10 sm:px-6 sm:pb-14 lg:px-8">
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
      </section>
      <Breadcrumb
        items={[
          { name: "Accueil", href: "/" },
          { name: "Cycle Foundation", href: "/cycle-fondation" },
          { name: breadcrumbLabel },
        ]}
      />
    </>
  );
}
