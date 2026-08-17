"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import OfferCard from "@/components/ui/OfferCard";
import type { Pole } from "@/data/poles";

const AUTOPLAY_INTERVAL_MS = 5000;
const MAX_VISIBLE_DEPTH = 2;

/** Shortest signed distance from `index` to the active card, in either rotation direction. */
function getOffset(index: number, activeIndex: number, length: number) {
  const activeMod = ((activeIndex % length) + length) % length;
  let diff = index - activeMod;
  if (diff > length / 2) diff -= length;
  if (diff < -length / 2) diff += length;
  return diff;
}

function transformForOffset(offset: number) {
  const abs = Math.abs(offset);
  const dir = Math.sign(offset);
  if (abs > MAX_VISIBLE_DEPTH) {
    return { x: dir * 640, scale: 0.5, opacity: 0, zIndex: 0 };
  }
  const x = dir * (abs === 1 ? 230 : 400);
  const scale = 1 - abs * 0.16;
  const opacity = abs === 0 ? 1 : abs === 1 ? 0.85 : 0.5;
  const zIndex = 30 - abs * 10;
  return { x, scale, opacity, zIndex };
}

export default function OffresCarousel({ poles }: { poles: Pole[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const length = poles.length;

  const goTo = useCallback((direction: 1 | -1) => {
    setActiveIndex((current) => current + direction);
  }, []);

  useEffect(() => {
    if (isPaused || length <= 1) return;
    const id = setInterval(() => goTo(1), AUTOPLAY_INTERVAL_MS);
    return () => clearInterval(id);
  }, [isPaused, length, goTo]);

  const activeMod = ((activeIndex % length) + length) % length;

  return (
    <div
      className="relative mx-auto hidden max-w-5xl lg:block"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") goTo(-1);
        if (event.key === "ArrowRight") goTo(1);
      }}
    >
      <div className="relative h-[460px] overflow-x-hidden">
        {poles.map((pole, index) => {
          const offset = getOffset(index, activeIndex, length);
          const { x, scale, opacity, zIndex } = transformForOffset(offset);
          const isActive = offset === 0;
          return (
            <div
              key={pole.slug}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ zIndex, pointerEvents: Math.abs(offset) > MAX_VISIBLE_DEPTH ? "none" : "auto" }}
              aria-hidden={!isActive}
            >
              <motion.div
                className="w-[280px]"
                animate={{ x, scale, opacity }}
                transition={{ type: "spring", stiffness: 240, damping: 28 }}
              >
                <OfferCard pole={pole} />
              </motion.div>
            </div>
          );
        })}

        <button
          type="button"
          aria-label="Offre précédente"
          onClick={() => goTo(-1)}
          className="absolute left-0 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border-subtle bg-surface shadow-sm transition-colors hover:bg-surface-alt"
        >
          <ChevronIcon className="h-5 w-5 rotate-180" />
        </button>
        <button
          type="button"
          aria-label="Offre suivante"
          onClick={() => goTo(1)}
          className="absolute right-0 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border-subtle bg-surface shadow-sm transition-colors hover:bg-surface-alt"
        >
          <ChevronIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-8 flex justify-center gap-2">
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
