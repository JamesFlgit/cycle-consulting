"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Item = { label: string; icon: ReactNode };

const INTERVAL = 5200;

/**
 * Vitrine "univers du club" : un seul univers visible à la fois, révélé
 * lentement de la droite vers la gauche, puis remplacé par le suivant.
 * Pause au survol.
 */
export default function UniversBand({ items }: { items: Item[] }) {
  const [index, setIndex] = useState(0);
  const paused = useRef(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) setIndex((v) => (v + 1) % items.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, [items.length]);

  const { label, icon } = items[index];
  const slide = reduceMotion ? 0 : 52;

  return (
    <div className="mx-auto w-full max-w-sm px-4">
      <div
        className="border-t border-white/10 pt-6 sm:pt-8"
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
      >
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.34em] text-white/40">
          Les univers du club
        </p>

        <div className="relative mt-5 h-20 overflow-hidden sm:mt-8 sm:h-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="absolute inset-0 flex flex-col items-center justify-center gap-2 sm:gap-3.5"
              initial={{ opacity: 0, x: slide }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -slide }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-[#c9a2f5] filter-[drop-shadow(0_0_18px_rgba(168,85,247,0.45))] [&_svg]:h-11 [&_svg]:w-11 sm:[&_svg]:h-14 sm:[&_svg]:w-14">
                {icon}
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/80">{label}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
