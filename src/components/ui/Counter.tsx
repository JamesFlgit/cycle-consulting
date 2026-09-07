"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion, animate } from "framer-motion";

export default function Counter({
  to,
  duration = 1.5,
  start,
}: {
  to: number;
  duration?: number;
  /** When provided, drives the animation instead of this component's own
   * IntersectionObserver — for callers that already track visibility on an
   * ancestor (e.g. DonutChart) and want every counter inside it to start in
   * sync off a single, larger, more reliable observer target. */
  start?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const ownInView = useInView(ref, { once: true, margin: "-100px" });
  const isInView = start ?? ownInView;
  const reduceMotion = useReducedMotion();
  // Valeur finale rendue côté serveur et au premier rendu client : les robots
  // (et les visiteurs sans JS) lisent toujours le vrai chiffre, jamais « 0 ».
  const [value, setValue] = useState(to);

  // Après hydratation, le compteur redescend à 0 (hors écran) pour que le
  // décompte soit visible quand on l'atteint. `setTimeout(…, 0)` : on n'appelle
  // pas setState en synchrone dans l'effet (règle react-hooks + écart
  // d'hydratation), même idiome que ConsentBanner.
  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setTimeout(() => setValue(0), 0);
    return () => window.clearTimeout(id);
  }, [reduceMotion]);

  // Décompte 0 → `to` quand la section entre dans le viewport.
  useEffect(() => {
    if (reduceMotion || !isInView) return;
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, reduceMotion, to, duration]);

  return <span ref={ref}>{value}</span>;
}
