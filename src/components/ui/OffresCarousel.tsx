"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import OfferCard from "@/components/ui/OfferCard";
import type { Pole } from "@/data/poles";

type BreakpointKey = "mobile" | "tablet" | "desktop";

const GEOMETRY: Record<
  BreakpointKey,
  {
    cardWidth: number;
    activeScale: number;
    height: number;
    offset1: number;
    offset2: number;
    maxVisibleDepth: number;
    edgeGutter: number;
  }
> = {
  mobile: { cardWidth: 280, activeScale: 1.1, height: 520, offset1: 190, offset2: 300, maxVisibleDepth: 1, edgeGutter: 4 },
  tablet: { cardWidth: 280, activeScale: 1.22, height: 520, offset1: 240, offset2: 380, maxVisibleDepth: 2, edgeGutter: 0 },
  desktop: { cardWidth: 280, activeScale: 1.22, height: 520, offset1: 250, offset2: 400, maxVisibleDepth: 2, edgeGutter: 0 },
};

function getBreakpoint(width: number): BreakpointKey {
  if (width < 640) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

/** Shortest signed distance from `index` to the active card, in either rotation direction. */
function getOffset(index: number, activeIndex: number, length: number) {
  const activeMod = ((activeIndex % length) + length) % length;
  let diff = index - activeMod;
  if (diff > length / 2) diff -= length;
  if (diff < -length / 2) diff += length;
  return diff;
}

function transformForOffset(offset: number, geometry: (typeof GEOMETRY)[BreakpointKey]) {
  const abs = Math.abs(offset);
  const dir = Math.sign(offset);
  if (abs > geometry.maxVisibleDepth) {
    return { x: dir * (geometry.offset2 + geometry.cardWidth), scale: 0.5, opacity: 0, filter: "none", zIndex: 0 };
  }
  const x = dir * (abs === 1 ? geometry.offset1 : geometry.offset2);
  const scale = abs === 0 ? geometry.activeScale : 1 - abs * 0.16;
  const zIndex = 30 - abs * 10;
  return { x, scale, opacity: 1, filter: "none", zIndex };
}

export default function OffresCarousel({ poles }: { poles: Pole[] }) {
  const [activeIndex, setActiveIndex] = useState(() => Math.max(0, poles.findIndex((p) => p.slug === "formations")));
  const [breakpoint, setBreakpoint] = useState<BreakpointKey>("desktop");
  const geometry = GEOMETRY[breakpoint];
  const length = poles.length;

  useEffect(() => {
    const updateBreakpoint = () => setBreakpoint(getBreakpoint(window.innerWidth));
    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);
    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

  const goTo = useCallback((direction: 1 | -1) => {
    setActiveIndex((current) => current + direction);
  }, []);

  const activeMod = ((activeIndex % length) + length) % length;

  return (
    <div
      className="relative mx-auto max-w-5xl"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") goTo(-1);
        if (event.key === "ArrowRight") goTo(1);
      }}
    >
      <div className="relative overflow-x-hidden overflow-y-visible" style={{ height: geometry.height }}>
        {poles.map((pole, index) => {
          const offset = getOffset(index, activeIndex, length);
          const { x, scale, opacity, filter, zIndex } = transformForOffset(offset, geometry);
          const isActive = offset === 0;
          return (
            <div
              key={pole.slug}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ zIndex, pointerEvents: Math.abs(offset) > geometry.maxVisibleDepth ? "none" : "auto" }}
              aria-hidden={!isActive}
            >
              <motion.div
                style={{ width: geometry.cardWidth }}
                animate={{ x, scale, opacity, filter }}
                transition={{ type: "spring", stiffness: 240, damping: 28 }}
                drag={isActive ? "x" : false}
                dragElastic={0.85}
                dragConstraints={{ left: -geometry.cardWidth * 1.2, right: geometry.cardWidth * 1.2 }}
                dragTransition={{ bounceStiffness: 400, bounceDamping: 40 }}
                onDragEnd={(_, info) => {
                  const threshold = geometry.cardWidth * 0.25;
                  if (info.offset.x < -threshold || info.velocity.x < -500) goTo(1);
                  else if (info.offset.x > threshold || info.velocity.x > 500) goTo(-1);
                }}
              >
                <OfferCard pole={pole} active={isActive} />
              </motion.div>
            </div>
          );
        })}

        <button
          type="button"
          aria-label="Offre précédente"
          onClick={() => goTo(-1)}
          className="absolute top-1/2 z-40 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border-subtle bg-surface shadow-sm transition-colors hover:bg-surface-alt sm:h-11 sm:w-11"
          style={{ left: geometry.edgeGutter }}
        >
          <ChevronIcon className="h-4 w-4 rotate-180 sm:h-5 sm:w-5" />
        </button>
        <button
          type="button"
          aria-label="Offre suivante"
          onClick={() => goTo(1)}
          className="absolute top-1/2 z-40 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border-subtle bg-surface shadow-sm transition-colors hover:bg-surface-alt sm:h-11 sm:w-11"
          style={{ right: geometry.edgeGutter }}
        >
          <ChevronIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>

      {/* Card-style navigation — only from sm up; too wide for a phone screen. */}
      <div className="mt-8 hidden flex-wrap justify-center gap-3 sm:flex">
        {poles.map((pole, index) => {
          const isActive = index === activeMod;
          return (
            <button
              key={pole.slug}
              type="button"
              aria-label={`Aller à l'offre ${pole.navLabel}`}
              aria-current={isActive}
              onClick={() => setActiveIndex(index)}
              className={
                isActive
                  ? "rounded-xl bg-gradient-to-r from-[#fa11f7] via-[#132bdd] to-[#0bceff] p-[1.5px] shadow-sm transition-shadow"
                  : "rounded-xl border border-border-subtle bg-surface p-[1.5px] transition-colors hover:border-anthracite"
              }
            >
              <span
                className={`flex min-w-32 flex-col items-center justify-center rounded-[calc(0.75rem-1.5px)] px-4 py-6 text-center text-sm font-semibold ${
                  isActive
                    ? "bg-gradient-to-br from-bleu-nuit to-[#16305e] text-white"
                    : "text-anthracite-mist hover:text-anthracite"
                }`}
              >
                {pole.navLabel}
              </span>
            </button>
          );
        })}
      </div>

      {/* Dots — mobile only. */}
      <div className="mt-8 flex justify-center gap-2 sm:hidden">
        {poles.map((pole, index) => (
          <button
            key={pole.slug}
            type="button"
            aria-label={`Aller à l'offre ${pole.navLabel}`}
            aria-current={index === activeMod}
            onClick={() => setActiveIndex(index)}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              index === activeMod ? "bg-anthracite" : "bg-border-subtle hover:bg-accent"
            }`}
          />
        ))}
      </div>
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
