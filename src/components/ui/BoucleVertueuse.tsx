"use client";

import { useEffect, useId, useRef, useState } from "react";
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

type Props = {
  steps?: string[];
  title?: string;
  eyebrow?: string;
};

/**
 * Chain of large ring/arrow loops revealing on scroll, one per step — each
 * ring drawn as a near-full circle (SVG arc) with an arrowhead, alternating
 * left/right down the column.
 */
export default function BoucleVertueuse({ steps = STEPS, title = "", eyebrow = "" }: Props) {
  const gradientId = `cc-loop-gradient-${useId().replace(/[^a-zA-Z0-9-]/g, "")}`;
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

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
    <section className={styles.section} aria-label={title || "Boucle vertueuse"}>
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
            <stop offset="0%" stopColor="#fa11f7" />
            <stop offset="25%" stopColor="#871eea" />
            <stop offset="55%" stopColor="#132bdd" />
            <stop offset="80%" stopColor="#0f7cee" />
            <stop offset="100%" stopColor="#0bceff" />
          </linearGradient>
        </defs>
      </svg>

      <ol className={styles.chain}>
        {steps.map((label, i) => {
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
                <span className={styles.label}>{label}</span>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
