import Image from "next/image";
import Link from "next/link";
import type { NavItem } from "@/data/nav-sections";

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path d="m5 8 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type Layout = "tile" | "wide" | "footer";

/**
 * Carte visuelle d'un item de nav marqué `card` (Cycle Foundation, Cycle Club).
 * Logo de la marque sur fond sombre.
 * - `layout="tile"`   : carte portrait, côte à côte dans le méga-menu desktop.
 *   Slogan empilé, un mot par ligne, avec un chevron vers le bas.
 * - `layout="wide"`   : carte pleine largeur, logo à gauche — menu burger mobile / tablette.
 * - `layout="footer"` : carte compacte empilée dans une colonne du footer, slogan sur une ligne.
 */
export default function NavFeatureCard({
  item,
  layout,
  onClick,
  className = "",
}: {
  item: NavItem;
  layout: Layout;
  onClick?: () => void;
  /** Classes ajoutées au conteneur (ex. largeur imposée dans le footer). */
  className?: string;
}) {
  const card = item.card;
  if (!card) return null;

  const accent = card.accentClassName ?? "text-white/70";
  const logo = (
    <Image
      src={card.logo}
      alt={item.navLabel}
      width={card.logoWidth}
      height={card.logoHeight}
      style={card.logoScale ? { transform: `scale(${card.logoScale})` } : undefined}
      className={`h-full w-auto max-w-full object-contain transition-transform duration-300 group-hover/card:scale-105 ${card.logoClassName ?? ""}`}
    />
  );

  const containerBase =
    "group/card relative flex overflow-hidden rounded-xl ring-1 ring-inset transition";

  if (layout === "wide") {
    return (
      <Link
        href={item.href}
        onClick={onClick}
        style={{ backgroundColor: card.background }}
        className={`${containerBase} items-center gap-2.5 px-3 py-3.5 ring-white/10 hover:ring-white/30 ${className}`}
      >
        <span className="flex h-11 w-18 shrink-0 items-center justify-center">{logo}</span>
        <span className="flex min-w-0 flex-col">
          <span className="text-sm font-semibold text-white">{item.navLabel}</span>
          {/* Tagline sur une seule ligne : le slogan le plus long
              (« Apprendre › Comprendre › Transmettre ») doit tenir dès ~360 px. */}
          <span className={`mt-0.5 whitespace-nowrap text-[0.58rem] font-medium tracking-tight ${accent}`}>
            {card.tagline.join(" › ")}
          </span>
        </span>
      </Link>
    );
  }

  if (layout === "footer") {
    return (
      <Link
        href={item.href}
        onClick={onClick}
        style={{ backgroundColor: card.background }}
        className={`${containerBase} flex-col items-center gap-2 px-4 py-4 text-center ring-white/15 hover:ring-white/35 ${className}`}
      >
        <span className="flex h-9 w-full items-center justify-center">{logo}</span>
        <span className="flex flex-col items-center">
          <span className="text-xs font-semibold text-white">{item.navLabel}</span>
          <span className={`mt-1 text-[0.65rem] font-medium tracking-wide ${accent}`}>{card.tagline.join(" › ")}</span>
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onClick}
      style={{ backgroundColor: card.background }}
      className={`${containerBase} min-h-60 flex-1 flex-col items-center gap-3 px-4 py-6 text-center ring-white/10 hover:ring-white/30 ${className}`}
    >
      <span className="flex h-16 w-full shrink-0 items-center justify-center">{logo}</span>
      <span className="mt-auto flex flex-col items-center">
        <span className="text-sm font-semibold text-white">{item.navLabel}</span>
        <span className={`mt-2 flex flex-col items-center gap-0.5 text-[0.72rem] font-semibold tracking-wide ${accent}`}>
          {card.tagline.map((word, i) => (
            <span key={word} className="flex flex-col items-center gap-0.5">
              {i > 0 && <ChevronDown className="opacity-70" />}
              {word}
            </span>
          ))}
        </span>
      </span>
    </Link>
  );
}
