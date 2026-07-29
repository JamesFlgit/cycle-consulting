"use client";

import { useEffect, useRef, useState } from "react";

const RING1_D =
  "m4200 6509c-957-47-1851-514-2417-1266-229-304-388-638-488-1028-74-292-90-429-90-785 1-354 14-464 89-761 138-544 402-1001 808-1397 691-675 1686-991 2702-857 414 55 878 218 1262 445 208 123 457 314 604 464 30 31 60 56 68 56 12 0 79-56 274-230l57-51 6 33c3 18 14 119 25 223 10 105 37 361 60 570 60 558 91 867 88 870-2 2-73-12-158-31s-225-50-310-69c-217-47-1129-252-1163-260-15-4-27-10-25-14 3-7 201-189 291-268l48-41-34-34c-18-18-78-71-132-116-281-235-633-406-975-475-203-41-304-50-508-44-205 6-331 25-515 77-350 101-632 265-882 515-193 192-296 342-400 580-109 249-168 538-168 825 0 385 117 804 304 1083 335 498 867 820 1494 903 91 12 166 15 310 11 211-7 281-15 435-54 428-106 795-320 1150-669l105-103 131 122c72 67 196 182 275 256s180 169 224 210c44 42 98 91 119 108l39 32-93 101c-354 384-818 693-1315 878-387 144-848 212-1295 191z";
const RING2_D =
  "m10026 6509c-421-24-853-137-1243-324-305-147-608-351-813-551l-65-63-158 146c-87 80-160 143-163 141-2-3-20-117-39-254s-57-411-85-609c-106-755-115-827-110-829s892 189 1240 267c85 19 215 48 288 63 72 15 132 30 132 34s-70 72-155 151c-85 78-155 146-155 149 0 10 201 159 315 235 122 81 336 190 469 239 146 55 352 105 505 123 161 18 442 13 588-11 424-72 819-270 1126-565 230-220 433-579 506-892 38-163 52-276 58-457 18-586-180-1099-570-1479-301-293-669-478-1112-559-121-22-432-30-566-14-324 37-627 141-923 315-171 101-318 216-521 409-107 103-102 101-150 50-5-6-86-82-180-170-272-254-540-508-543-515-6-12 337-336 456-431 502-401 1125-652 1757-708 194-18 524-16 700 4 474 54 968 224 1360 468 456 284 843 696 1079 1149 228 436 337 896 338 1419 1 700-223 1352-648 1890-85 107-364 387-467 468-558 440-1185 676-1891 712-105 5-198 9-206 8-8 0-78-5-154-9z";
const DOT_D =
  "m4303 3730c-58-12-97-34-145-82-75-75-104-188-75-289 78-266 439-292 555-40 35 75 36 175 4 241-28 58-92 124-146 149-49 24-135 33-193 21z";
const DASH_D = "m9660 3430v-140h565 565v140 140h-565-565v-140z";
const MARK_TRANSFORM = "translate(0 731) scale(.1 -.1)";

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
const GRAD_CX = 7298;
const GRAD_CY = 3451;
const SPIN_SPEED = 40;
const DRAW_DUR = 1.3;
const COMPOSE_DUR = 0.9;
const HOLD_DUR = 0.6;
const TOTAL_DUR = DRAW_DUR + COMPOSE_DUR + HOLD_DUR;
const FADE_MS = 350;
const MARK_COLOR = "#2b2e33";

const RING1 = { d: RING1_D, cx: 4226, cy: 3448, startDeg: 30, sweepDeg: 320, r: 3700, twist: -18 };
const RING2 = { d: RING2_D, cx: 10369, cy: 3453, startDeg: 210, sweepDeg: 318, r: 3700, twist: 18 };

const STORAGE_KEY = "cc-intro-played";

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const easeInOutCubic = (x: number) => (x < 0.5 ? 4 * x ** 3 : 1 - (-2 * x + 2) ** 3 / 2);
const easeOutCubic = (x: number) => 1 - (1 - x) ** 3;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function wedgePath(cx: number, cy: number, r: number, startDeg: number, sweepDeg: number) {
  if (sweepDeg <= 0) return `M${cx} ${cy} Z`;
  const s = (startDeg * Math.PI) / 180;
  const e = ((startDeg + sweepDeg) * Math.PI) / 180;
  const x1 = cx + r * Math.cos(s);
  const y1 = cy + r * Math.sin(s);
  const x2 = cx + r * Math.cos(e);
  const y2 = cy + r * Math.sin(e);
  const largeArc = sweepDeg > 180 ? 1 : 0;
  return `M${cx} ${cy} L${x1} ${y1} A${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
}

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
            <stop offset="1.3%" stopColor="#fa11f7" />
            <stop offset="17.6%" stopColor="#871eea" />
            <stop offset="51.7%" stopColor="#132bdd" />
            <stop offset="84.9%" stopColor="#0f7cee" />
            <stop offset="98.8%" stopColor="#0bceff" />
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
              <path d={DOT_D} fill="url(#cc-intro-gradient)" />
            </g>
            <g transform={`translate(10224,3429) scale(${dashScale}) translate(-10224,-3429)`} opacity={dashP}>
              <path d={DASH_D} fill="url(#cc-intro-gradient)" />
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
