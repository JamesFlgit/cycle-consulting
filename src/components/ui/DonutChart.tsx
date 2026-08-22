"use client";

import { useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Counter from "@/components/ui/Counter";
import type { RepartitionItem } from "@/data/repartitions";

const SIZE = 420;
const CENTER = SIZE / 2;
const RADIUS = 80;
const STROKE = 24;
// Labels are centered on their tag point (not edge-anchored), so this radius
// has to clear the ring by more than half the widest label's width in every
// direction, not just along the radial line — see the clearance check this
// value was picked against: even a long two-word label centered at this
// distance stays clear of the ring at any angle, including the worst case
// (a purely horizontal tag point, where the label's near edge comes closest).
const LABEL_RADIUS = RADIUS + STROKE / 2 + 100;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function DonutChart({
  data,
  ariaLabel,
}: {
  data: RepartitionItem[];
  ariaLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const segments = useMemo(() => {
    const result: (RepartitionItem & {
      offset: number;
      length: number;
      surface: [number, number];
      tag: [number, number];
    })[] = [];
    let cumulative = 0;
    for (const item of data) {
      const share = item.value / 100;
      const offset = cumulative;
      const mid = cumulative + share / 2;
      const angle = (-90 + mid * 360) * (Math.PI / 180);
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const surface: [number, number] = [CENTER + RADIUS * cos, CENTER + RADIUS * sin];
      const tag: [number, number] = [CENTER + LABEL_RADIUS * cos, CENTER + LABEL_RADIUS * sin];
      result.push({ ...item, offset, length: share, surface, tag });
      cumulative += share;
    }
    return result;
  }, [data]);

  return (
    <div ref={ref} className="relative mx-auto aspect-square w-full max-w-105">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-full w-full" role="img" aria-label={ariaLabel}>
        <g transform={`rotate(-90 ${CENTER} ${CENTER})`}>
          {segments.map((seg, i) => {
            const segLength = seg.length * CIRCUMFERENCE;
            return (
              <motion.circle
                key={seg.label}
                cx={CENTER}
                cy={CENTER}
                r={RADIUS}
                fill="none"
                stroke={seg.color}
                strokeWidth={STROKE}
                strokeDashoffset={-seg.offset * CIRCUMFERENCE}
                initial={{ strokeDasharray: `0 ${CIRCUMFERENCE}` }}
                animate={
                  isInView
                    ? { strokeDasharray: `${segLength} ${CIRCUMFERENCE - segLength}` }
                    : { strokeDasharray: `0 ${CIRCUMFERENCE}` }
                }
                transition={{ duration: 0.8, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] }}
              />
            );
          })}
        </g>
        {segments.map((seg, i) => (
          <motion.line
            key={`line-${seg.label}`}
            x1={seg.surface[0]}
            y1={seg.surface[1]}
            x2={seg.tag[0]}
            y2={seg.tag[1]}
            stroke={seg.color}
            strokeWidth={1.5}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 0.7 } : {}}
            transition={{ duration: 0.4, delay: 0.5 + i * 0.15, ease: "easeOut" }}
          />
        ))}
      </svg>

      {segments.map((seg, i) => (
        <motion.div
          key={seg.label}
          initial={{ opacity: 0, y: 6 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.65 + i * 0.15, ease: "easeOut" }}
          className="absolute flex w-20 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-0 text-center text-xs sm:w-auto sm:whitespace-nowrap sm:text-sm"
          style={{ left: `${(seg.tag[0] / SIZE) * 100}%`, top: `${(seg.tag[1] / SIZE) * 100}%` }}
        >
          <span className="text-white/70">{seg.label}</span>
          <span className="font-semibold text-white">
            <Counter to={seg.value} duration={1.1} />%
          </span>
        </motion.div>
      ))}
    </div>
  );
}
