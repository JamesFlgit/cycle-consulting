"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import RotatingGlobe, { REGIONS, ACCENT } from "@/components/ui/RotatingGlobe";

const DWELL_MS = 4500;

export default function InternationalHighlight() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveIndex((i) => (i + 1) % REGIONS.length);
    }, DWELL_MS);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <motion.div
        className="w-full"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <RotatingGlobe active={REGIONS[activeIndex].key} />
      </motion.div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {REGIONS.map((region, i) => {
          const isActive = i === activeIndex;
          return (
            <motion.button
              key={region.key}
              type="button"
              onClick={() => setActiveIndex(i)}
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.15, ease: "easeOut" }}
              className="relative rounded-full border px-4 py-1.5 text-sm font-medium text-white"
              style={{ borderColor: isActive ? ACCENT : "rgba(255,255,255,0.2)" }}
            >
              {isActive && (
                <motion.span
                  layoutId="continent-highlight"
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.55)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{region.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
