"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  RING1,
  RING2,
  LOGO_PATHS,
  DOT_CENTER,
  DASH_CENTER,
  MARK_TRANSFORM,
  GRAD_CX,
  GRAD_CY,
  GRADIENT_STOPS,
  clamp,
  easeInOutCubic,
  wedgePath,
} from "@/components/logo/logo-geometry";

const DRAW_DUR = 1.3;
const CYCLE_MS = 30000;

export default function NavLogoMark({ className }: { className?: string }) {
  const [elapsed, setElapsed] = useState<number | null>(null);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef(0);
  const gradId = useId();
  const mask1Id = useId();
  const mask2Id = useId();

  useEffect(() => {
    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const t = (now - startRef.current) / 1000;
      if (t < DRAW_DUR) {
        setElapsed(t);
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setElapsed(null);
      }
    };
    const play = () => {
      startRef.current = null;
      rafRef.current = requestAnimationFrame(tick);
    };
    const interval = window.setInterval(play, CYCLE_MS);
    return () => {
      window.clearInterval(interval);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const playing = elapsed !== null;
  const t = playing ? clamp(elapsed / DRAW_DUR, 0, 1) : 1;
  const easedT = playing ? easeInOutCubic(t) : 1;
  const gradAngle = playing ? 360 * t : 0;

  const dotP = clamp((t - 0.68) / 0.16, 0, 1);
  const dashP = clamp((t - 0.84) / 0.16, 0, 1);
  const dotScale = playing ? 1 + 1.3 * Math.sin(dotP * Math.PI) : 1;
  const dashScale = playing ? 1 + 0.8 * Math.sin(dashP * Math.PI) : 1;

  const ring1Rot = RING1.twist * (1 - easedT);
  const ring2Rot = RING2.twist * (1 - easedT);
  const ring1Sweep = RING1.sweepDeg * t;
  const ring2Sweep = RING2.sweepDeg * t;

  return (
    <svg viewBox="0 0 1456 731" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient
          id={gradId}
          gradientUnits="userSpaceOnUse"
          x1="1206"
          y1="3450"
          x2="13390"
          y2="3450"
          gradientTransform={`rotate(${gradAngle} ${GRAD_CX} ${GRAD_CY})`}
        >
          {GRADIENT_STOPS.map((stop) => (
            <stop key={stop.offset} offset={stop.offset} stopColor={stop.color} />
          ))}
        </linearGradient>
        <mask id={mask1Id}>
          <path d={wedgePath(RING1.cx, RING1.cy, RING1.r, RING1.startDeg, ring1Sweep)} fill="#ffffff" />
        </mask>
        <mask id={mask2Id}>
          <path d={wedgePath(RING2.cx, RING2.cy, RING2.r, RING2.startDeg, ring2Sweep)} fill="#ffffff" />
        </mask>
      </defs>
      <g transform={MARK_TRANSFORM}>
        <g transform={`rotate(${ring1Rot} ${RING1.cx} ${RING1.cy})`}>
          <path d={RING1.d} fill={`url(#${gradId})`} mask={`url(#${mask1Id})`} />
        </g>
        <g transform={`rotate(${ring2Rot} ${RING2.cx} ${RING2.cy})`}>
          <path d={RING2.d} fill={`url(#${gradId})`} mask={`url(#${mask2Id})`} />
        </g>
        <g
          transform={`translate(${DOT_CENTER.x},${DOT_CENTER.y}) scale(${dotScale}) translate(${-DOT_CENTER.x},${-DOT_CENTER.y})`}
          opacity={dotP}
        >
          <path d={LOGO_PATHS.DOT_D} fill={`url(#${gradId})`} />
        </g>
        <g
          transform={`translate(${DASH_CENTER.x},${DASH_CENTER.y}) scale(${dashScale}) translate(${-DASH_CENTER.x},${-DASH_CENTER.y})`}
          opacity={dashP}
        >
          <path d={LOGO_PATHS.DASH_D} fill={`url(#${gradId})`} />
        </g>
      </g>
    </svg>
  );
}
