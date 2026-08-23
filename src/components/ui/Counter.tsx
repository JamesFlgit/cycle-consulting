"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

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
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, to, duration]);

  return <span ref={ref}>{value}</span>;
}
