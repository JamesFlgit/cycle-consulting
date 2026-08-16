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
  GRADIENT_STOPS_LIGHT,
  clamp,
  easeInOutCubic,
  easeOutCubic,
  wedgePath,
} from "@/components/logo/logo-geometry";

const DRAW_DUR = 1.3;
const REVEAL_DUR = 0.9;
const TOTAL_DUR = DRAW_DUR + REVEAL_DUR;
// Lockup proportions (rule width, gaps, wordmark size) match the business card artwork.
const RULE_Y = 814;
const RULE_X1 = 0;
const RULE_X2 = 1456;
const TEXT_X = 728;
const TEXT_Y = 1013;
const WHITE = "#ffffff";

type Phase = "pending" | "playing" | "done";

export default function FooterLogoReveal({ className }: { className?: string }) {
  const [phase, setPhase] = useState<Phase>("pending");
  const [elapsed, setElapsed] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef(0);
  const gradId = useId();
  const mask1Id = useId();
  const mask2Id = useId();

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setPhase("playing");

        const tick = (now: number) => {
          if (startRef.current === null) startRef.current = now;
          const t = (now - startRef.current) / 1000;
          if (t < TOTAL_DUR) {
            setElapsed(t);
            rafRef.current = requestAnimationFrame(tick);
          } else {
            setPhase("done");
          }
        };
        rafRef.current = requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const isPlaying = phase === "playing";
  const isDone = phase === "done";

  let t = 0;
  let easedT = 0;
  let ruleT = 0;
  let textOpacity = 0;

  if (isDone) {
    t = 1;
    easedT = 1;
    ruleT = 1;
    textOpacity = 1;
  } else if (isPlaying) {
    const e = elapsed;
    if (e < DRAW_DUR) {
      t = clamp(e / DRAW_DUR, 0, 1);
      easedT = easeInOutCubic(t);
    } else {
      t = 1;
      easedT = 1;
      const revealP = clamp((e - DRAW_DUR) / REVEAL_DUR, 0, 1);
      const eased = easeOutCubic(revealP);
      ruleT = easeOutCubic(clamp((eased - 0.45) / 0.55, 0, 1));
      textOpacity = clamp((eased - 0.65) / 0.35, 0, 1);
    }
  }

  const dotP = clamp((t - 0.68) / 0.16, 0, 1);
  const dashP = clamp((t - 0.84) / 0.16, 0, 1);
  const dotScale = isPlaying ? 1 + 1.3 * Math.sin(dotP * Math.PI) : 1;
  const dashScale = isPlaying ? 1 + 0.8 * Math.sin(dashP * Math.PI) : 1;

  const ring1Rot = RING1.twist * (1 - easedT);
  const ring2Rot = RING2.twist * (1 - easedT);
  const ring1Sweep = RING1.sweepDeg * t;
  const ring2Sweep = RING2.sweepDeg * t;

  const ruleCx = (RULE_X1 + RULE_X2) / 2;
  const ruleHalfW = ((RULE_X2 - RULE_X1) / 2) * ruleT;

  return (
    <svg ref={svgRef} viewBox="-70 0 1596 1084" className={className} role="img" aria-label="Cycle Consulting" focusable="false">
      <defs>
        <linearGradient
          id={gradId}
          gradientUnits="userSpaceOnUse"
          x1="1206"
          y1="3450"
          x2="13390"
          y2="3450"
          gradientTransform={`rotate(0 ${GRAD_CX} ${GRAD_CY})`}
        >
          {GRADIENT_STOPS_LIGHT.map((stop) => (
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
      {ruleT > 0 && (
        <line
          x1={ruleCx - ruleHalfW}
          y1={RULE_Y}
          x2={ruleCx + ruleHalfW}
          y2={RULE_Y}
          stroke={WHITE}
          strokeWidth={16.9}
        />
      )}
      <text
        x={TEXT_X}
        y={TEXT_Y}
        opacity={textOpacity}
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize={145.6}
        letterSpacing="3.8px"
        textAnchor="middle"
        fill={WHITE}
      >
        CYCLE CONSULTING
      </text>
    </svg>
  );
}
