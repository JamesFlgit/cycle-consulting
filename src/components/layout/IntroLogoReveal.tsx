"use client";

import { useEffect, useRef, useState } from "react";
import {
  RING1,
  RING2,
  LOGO_PATHS,
  MARK_TRANSFORM,
  GRAD_CX,
  GRAD_CY,
  GRADIENT_STOPS,
  clamp,
  easeInOutCubic,
  easeOutCubic,
  lerp,
  wedgePath,
} from "@/components/logo/logo-geometry";

const STAGE_W = 1280;
const STAGE_H = 720;
const BIG_SCALE = 0.62;
const FINAL_SCALE = 0.34;
const CENTER = { x: STAGE_W / 2, y: STAGE_H / 2 };
const FINAL_POS = { x: CENTER.x, y: CENTER.y - 100 };
const MARK_W = 1456;
const MARK_H = 731;
const RULE_Y = CENTER.y + 65;
const RULE_HALF_W = 320;
const TEXT_Y = CENTER.y + 120;
const SPIN_SPEED = 40;
const DRAW_DUR = 1.3;
const COMPOSE_DUR = 0.9;
const HOLD_DUR = 0.6;
const TOTAL_DUR = DRAW_DUR + COMPOSE_DUR + HOLD_DUR;
const FADE_MS = 350;
const MARK_COLOR = "#2b2e33";

const STORAGE_KEY = "cc-intro-played";

export default function IntroLogoReveal() {
  const [show, setShow] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "1") {
      const id = window.setTimeout(() => setShow(false), 0);
      return () => window.clearTimeout(id);
    }

    let raf = 0;
    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const t = (now - startRef.current) / 1000;
      setElapsed(t);
      if (t < TOTAL_DUR) {
        raf = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem(STORAGE_KEY, "1");
        setFadeOut(true);
        window.setTimeout(() => setShow(false), FADE_MS);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!show) return;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [show]);

  if (!show) return null;

  const gradAngle = SPIN_SPEED * elapsed;

  let scale: number;
  let mcx: number;
  let mcy: number;
  let t: number;
  let easedT: number;
  let ruleT: number;
  let textOpacity: number;

  if (elapsed < DRAW_DUR) {
    t = clamp(elapsed / DRAW_DUR, 0, 1);
    easedT = easeInOutCubic(t);
    scale = BIG_SCALE;
    mcx = CENTER.x;
    mcy = CENTER.y;
    ruleT = 0;
    textOpacity = 0;
  } else if (elapsed < DRAW_DUR + COMPOSE_DUR) {
    const sceneT = (elapsed - DRAW_DUR) / COMPOSE_DUR;
    const p = clamp(sceneT / 0.8, 0, 1);
    const e = easeOutCubic(p);
    t = 1;
    easedT = 1;
    scale = lerp(BIG_SCALE, FINAL_SCALE, e);
    mcx = lerp(CENTER.x, FINAL_POS.x, e);
    mcy = lerp(CENTER.y, FINAL_POS.y, e);
    ruleT = easeOutCubic(clamp((e - 0.45) / 0.55, 0, 1));
    textOpacity = clamp((e - 0.65) / 0.35, 0, 1);
  } else {
    t = 1;
    easedT = 1;
    scale = FINAL_SCALE;
    mcx = FINAL_POS.x;
    mcy = FINAL_POS.y;
    ruleT = 1;
    textOpacity = 1;
  }

  const dotP = clamp((t - 0.68) / 0.16, 0, 1);
  const dashP = clamp((t - 0.84) / 0.16, 0, 1);
  const dotScale = 1 + 1.3 * Math.sin(dotP * Math.PI);
  const dashScale = 1 + 0.8 * Math.sin(dashP * Math.PI);

  const w = MARK_W * scale;
  const h = MARK_H * scale;
  const x = mcx - w / 2;
  const y = mcy - h / 2;

  const ring1Rot = RING1.twist * (1 - easedT);
  const ring2Rot = RING2.twist * (1 - easedT);
  const ring1Sweep = RING1.sweepDeg * t;
  const ring2Sweep = RING2.sweepDeg * t;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white transition-opacity duration-[350ms] ease-out"
      style={{ opacity: fadeOut ? 0 : 1 }}
      aria-hidden="true"
    >
      <svg viewBox={`0 0 ${STAGE_W} ${STAGE_H}`} className="h-full w-full max-w-[1280px]">
        <defs>
          <linearGradient
            id="cc-intro-gradient"
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
          <mask id="cc-ring1-mask">
            <path d={wedgePath(RING1.cx, RING1.cy, RING1.r, RING1.startDeg, ring1Sweep)} fill="#ffffff" />
          </mask>
          <mask id="cc-ring2-mask">
            <path d={wedgePath(RING2.cx, RING2.cy, RING2.r, RING2.startDeg, ring2Sweep)} fill="#ffffff" />
          </mask>
        </defs>

        <g transform={`translate(${x},${y}) scale(${scale})`}>
          <g transform={MARK_TRANSFORM}>
            <g transform={`rotate(${ring1Rot} ${RING1.cx} ${RING1.cy})`}>
              <path d={RING1.d} fill="url(#cc-intro-gradient)" mask="url(#cc-ring1-mask)" />
            </g>
            <g transform={`rotate(${ring2Rot} ${RING2.cx} ${RING2.cy})`}>
              <path d={RING2.d} fill="url(#cc-intro-gradient)" mask="url(#cc-ring2-mask)" />
            </g>
            <g transform={`translate(4368,3439) scale(${dotScale}) translate(-4368,-3439)`} opacity={dotP}>
              <path d={LOGO_PATHS.DOT_D} fill="url(#cc-intro-gradient)" />
            </g>
            <g transform={`translate(10224,3429) scale(${dashScale}) translate(-10224,-3429)`} opacity={dashP}>
              <path d={LOGO_PATHS.DASH_D} fill="url(#cc-intro-gradient)" />
            </g>
          </g>
        </g>

        {ruleT > 0 && (
          <line
            x1={CENTER.x - RULE_HALF_W * ruleT}
            y1={RULE_Y}
            x2={CENTER.x + RULE_HALF_W * ruleT}
            y2={RULE_Y}
            stroke={MARK_COLOR}
            strokeWidth={2}
          />
        )}

        <text
          x={CENTER.x}
          y={TEXT_Y}
          opacity={textOpacity}
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize={46}
          letterSpacing="2px"
          textAnchor="middle"
          fill={MARK_COLOR}
        >
          Cycle Consulting
        </text>
      </svg>
    </div>
  );
}
