"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import EvenementCarouselCard from "@/components/ui/EvenementCarouselCard";
import type { Evenement } from "@/data/evenements";

type BreakpointKey = "mobile" | "tablet" | "desktop";

// The active card is shown flat on the left of the group, the following cards
// fan out to its right, receding (smaller, angled). Every visible card stays
// fully opaque — the "faded" look of the back cards comes only from a white
// wash inside the card itself (same trick as OffresCarousel / OfferCard), so a
// back card never reveals the cards stacked behind it. The whole group is
// centred in the track.
const GEOMETRY: Record<
  BreakpointKey,
  {
    cardWidth: number;
    cardHeight: number;
    /** Horizontal gap between each receding card. */
    stackStep: number;
    /** How many cards behind the active one stay visible. */
    maxVisibleDepth: number;
  }
> = {
  mobile: { cardWidth: 268, cardHeight: 384, stackStep: 82, maxVisibleDepth: 2 },
  tablet: { cardWidth: 336, cardHeight: 412, stackStep: 172, maxVisibleDepth: 3 },
  desktop: { cardWidth: 368, cardHeight: 424, stackStep: 208, maxVisibleDepth: 3 },
};

/** Half the width the visible group spans — used to centre it in the track. */
function halfSpan(g: (typeof GEOMETRY)[BreakpointKey]) {
  return (g.cardWidth + g.maxVisibleDepth * g.stackStep) / 2;
}

function getBreakpoint(width: number): BreakpointKey {
  if (width < 640) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

/** Signed distance from `index` to the active card, forward = to the right. */
function getOffset(index: number, activeIndex: number, length: number) {
  const activeMod = ((activeIndex % length) + length) % length;
  let diff = index - activeMod;
  if (diff > length / 2) diff -= length;
  if (diff < -length / 2) diff += length;
  return diff;
}

// Ombre portée légère : juste un léger décollement du fond, sans bloc marqué
// (les cartes sont fortement inclinées, une ombre lourde devient sale).
const SHADOW_NONE = "0 0 0 rgba(0,0,0,0)";
const SHADOW_ACTIVE = "0 10px 22px -14px rgba(7,20,46,0.22)";
const SHADOW_STACK = "0 8px 18px -14px rgba(7,20,46,0.16)";

function transformForOffset(offset: number, g: (typeof GEOMETRY)[BreakpointKey]) {
  const shift = -halfSpan(g); // centre the group around the track's midpoint
  // Cards already passed slide off to the left, hidden.
  if (offset < 0) {
    return { x: shift - g.cardWidth * 1.15, scale: 0.92, opacity: 0, rotateY: 0, zIndex: 0, boxShadow: SHADOW_NONE };
  }
  // Cards deep in the stack wait, hidden, at the far right.
  if (offset > g.maxVisibleDepth) {
    return {
      x: shift + g.stackStep * (g.maxVisibleDepth + 1),
      scale: 0.6,
      opacity: 0,
      rotateY: -52,
      zIndex: 0,
      boxShadow: SHADOW_NONE,
    };
  }
  // Visible cards: fully opaque, only scaled / shifted / angled. Les cartes de
  // la pile (à droite de l'active) sont fortement inclinées, et de plus en plus
  // à mesure qu'elles reculent.
  const x = shift + offset * g.stackStep;
  const scale = 1 - offset * 0.06;
  const rotateY = offset === 0 ? 0 : -(42 + (offset - 1) * 6);
  return {
    x,
    scale,
    opacity: 1,
    rotateY,
    zIndex: 40 - offset,
    boxShadow: offset === 0 ? SHADOW_ACTIVE : SHADOW_STACK,
  };
}

/** Cadence du défilement automatique en continu (ms entre deux cartes). */
const AUTOPLAY_INTERVAL_MS = 3800;

export default function EvenementsCarousel({ evenements }: { evenements: Evenement[] }) {
  // Start on the first card — the caller passes the list sorted by date, so
  // index 0 is the nearest upcoming event.
  const [activeIndex, setActiveIndex] = useState(0);
  const [breakpoint, setBreakpoint] = useState<BreakpointKey>("desktop");
  // Le défilement auto se met en pause au survol, au focus clavier et pendant
  // qu'on fait glisser une carte.
  const [isPaused, setIsPaused] = useState(false);
  const geometry = GEOMETRY[breakpoint];
  const length = evenements.length;

  useEffect(() => {
    const updateBreakpoint = () => setBreakpoint(getBreakpoint(window.innerWidth));
    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);
    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

  // Défilement automatique en continu : on avance d'une carte à intervalle
  // régulier, en boucle (getOffset gère le wrap). Respecte prefers-reduced-motion.
  useEffect(() => {
    if (isPaused || length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActiveIndex((current) => current + 1), AUTOPLAY_INTERVAL_MS);
    return () => clearInterval(id);
  }, [isPaused, length]);

  const goTo = useCallback((direction: 1 | -1) => {
    setActiveIndex((current) => current + direction);
  }, []);

  if (length === 0) return null;

  return (
    <div
      className="relative mx-auto max-w-6xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") goTo(-1);
        if (event.key === "ArrowRight") goTo(1);
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{ height: geometry.cardHeight + 96, perspective: 1200 }}
      >
        {evenements.map((evenement, index) => {
          const offset = getOffset(index, activeIndex, length);
          const { x, scale, opacity, rotateY, zIndex, boxShadow } = transformForOffset(offset, geometry);
          const isActive = offset === 0;
          return (
            <div
              key={evenement.slug}
              className="absolute top-1/2"
              style={{
                left: "50%",
                transform: "translateY(-50%)",
                zIndex,
                pointerEvents: offset < 0 || offset > geometry.maxVisibleDepth ? "none" : "auto",
                transformStyle: "preserve-3d",
              }}
              aria-hidden={!isActive}
            >
              <motion.div
                style={{
                  width: geometry.cardWidth,
                  height: geometry.cardHeight,
                  transformOrigin: "left center",
                  borderRadius: "0.75rem",
                }}
                animate={{ x, scale, opacity, rotateY, boxShadow }}
                transition={{ type: "spring", stiffness: 240, damping: 30 }}
                drag={isActive && length > 1 ? "x" : false}
                dragElastic={0.7}
                dragConstraints={{ left: -geometry.cardWidth, right: geometry.stackStep }}
                dragTransition={{ bounceStiffness: 400, bounceDamping: 40 }}
                onDragStart={() => setIsPaused(true)}
                onDragEnd={(_, info) => {
                  const threshold = geometry.cardWidth * 0.22;
                  if (info.offset.x < -threshold || info.velocity.x < -500) goTo(1);
                  else if (info.offset.x > threshold || info.velocity.x > 500) goTo(-1);
                }}
              >
                <EvenementCarouselCard evenement={evenement} active={isActive} />
              </motion.div>
            </div>
          );
        })}
      </div>

      {length > 1 && (
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            aria-label="Évènement précédent"
            onClick={() => goTo(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-surface shadow-sm transition-colors hover:bg-surface-alt"
          >
            <ChevronIcon className="h-4 w-4 rotate-180" />
          </button>
          <button
            type="button"
            aria-label="Évènement suivant"
            onClick={() => goTo(1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-surface shadow-sm transition-colors hover:bg-surface-alt"
          >
            <ChevronIcon className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}
