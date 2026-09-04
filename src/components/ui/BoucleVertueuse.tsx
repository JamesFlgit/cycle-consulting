"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import styles from "./BoucleVertueuse.module.css";

const STEPS = [
  "Identifier les talents",
  "Comprendre leur potentiel",
  "Foisonner leur potentiel",
  "Éprouver leur potentiel",
  "Accompagner les profils dans leurs missions",
  "Créer de la valeur chez nos clients",
  "Valoriser le foisonnement du résultat",
];

// Ring: centre (100,100), r 70. Angles clockwise, 0deg = right, 90deg = bottom.
const ARC_MID = "M55 46.4 A70 70 0 1 1 123.9 165.8"; // 230deg -> 70deg, starts clear of the incoming arrow
const ARC_FIRST = "M31.1 87.8 A70 70 0 1 1 123.9 165.8"; // 190deg -> 70deg, wider cut on the left
const ARC_LAST = "M55 46.4 A70 70 0 1 1 46.4 145"; // 230deg -> 140deg, closes with no arrow
const ARROW = "99.5,174.7 118.8,151.7 129,179.9";

export type BoucleStep = string | { label: string; description?: string };

const DEFAULT_GRADIENT_STOPS = [
  { offset: "0%", color: "#fa11f7" },
  { offset: "25%", color: "#871eea" },
  { offset: "55%", color: "#132bdd" },
  { offset: "80%", color: "#0f7cee" },
  { offset: "100%", color: "#0bceff" },
];

type Props = {
  steps?: BoucleStep[];
  title?: string;
  eyebrow?: string;
  /** Smaller ring/spacing (same sizing used at the mobile breakpoint) — for
   * placement next to a shorter block of text, at any viewport width. */
  compact?: boolean;
  /** Override the ring/arrow gradient stops — for pages with their own brand
   * accent (defaults to the pink/blue Cycle Consulting gradient). */
  gradientStops?: { offset: string; color: string }[];
  /** Override the step label colour (defaults to a dark charcoal) — for
   * placement on a dark background. */
  labelColor?: string;
};

/**
 * Chain of large ring/arrow loops revealing on scroll, one per step — each
 * ring drawn as a near-full circle (SVG arc) with an arrowhead, alternating
 * left/right down the column.
 */
export default function BoucleVertueuse({
  steps = STEPS,
  title = "",
  eyebrow = "",
  compact = false,
  gradientStops = DEFAULT_GRADIENT_STOPS,
  labelColor,
}: Props) {
  const gradientId = `cc-loop-gradient-${useId().replace(/[^a-zA-Z0-9-]/g, "")}`;
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const hasDescriptions = steps.some((step) => typeof step !== "string" && step.description);

  useEffect(() => {
    // Reduced-motion users get every ring visible immediately via the CSS
    // media query in BoucleVertueuse.module.css, independent of this state
    // — no need to special-case it here too.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number((entry.target as HTMLElement).dataset.index);
          setRevealed((prev) => (prev[index] ? prev : { ...prev, [index]: true }));
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -14% 0px", threshold: 0.35 },
    );

    refs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, [steps]);

  return (
    <section
      className={styles.section}
      aria-label={title || "Boucle vertueuse"}
      style={labelColor ? ({ "--cc-charcoal": labelColor } as CSSProperties) : undefined}
    >
      {title && (
        <header className={styles.header}>
          {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
          <h2 className={styles.title}>{title}</h2>
          <span className={styles.titleRule} />
        </header>
      )}

      <svg className={styles.gradientDefs} aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            {gradientStops.map((stop) => (
              <stop key={stop.offset} offset={stop.offset} stopColor={stop.color} />
            ))}
          </linearGradient>
        </defs>
      </svg>

      <ol
        className={[styles.chain, compact && styles.compact, hasDescriptions && styles.rich]
          .filter(Boolean)
          .join(" ")}
      >
        {steps.map((step, i) => {
          const label = typeof step === "string" ? step : step.label;
          const description = typeof step === "string" ? undefined : step.description;
          const isRight = i % 2 === 0;
          const isLast = i === steps.length - 1;
          return (
            <li key={label} className={styles.row}>
              <div
                ref={(node) => {
                  refs.current[i] = node;
                }}
                data-index={i}
                className={`${styles.loop} ${isRight ? styles.loopRight : styles.loopLeft} ${
                  revealed[i] ? styles.isVisible : ""
                }`}
              >
                <svg viewBox="0 0 200 200" className={styles.ring} aria-hidden="true">
                  <g transform={isRight ? undefined : "translate(200,0) scale(-1,1)"}>
                    <path
                      d={i === 0 ? ARC_FIRST : isLast ? ARC_LAST : ARC_MID}
                      fill="none"
                      stroke={`url(#${gradientId})`}
                      strokeWidth="13"
                    />
                    {!isLast && <polygon points={ARROW} fill={`url(#${gradientId})`} />}
                  </g>
                </svg>
                <span className={styles.label}>
                  {description ? (
                    <span className={styles.labelStack}>
                      <strong className={styles.stepTitle}>{label}</strong>
                      <span className={styles.stepDescription}>{description}</span>
                    </span>
                  ) : (
                    label
                  )}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
