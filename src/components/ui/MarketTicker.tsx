"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MarketQuote } from "@/lib/market";

const REFRESH_MS = 5 * 60 * 1000;
const SPARK_W = 60;
const SPARK_H = 18;

const UP = "#5cf2ab";
const DOWN = "#ff8592";
const FLAT = "rgba(255,255,255,0.55)";

const pctFmt = new Intl.NumberFormat("fr-FR", {
  signDisplay: "exceptZero",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const priceFmt = new Intl.NumberFormat("fr-FR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const timeFmt = new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit" });

function trendColor(pct: number) {
  if (pct > 0) return UP;
  if (pct < 0) return DOWN;
  return FLAT;
}

function Sparkline({ series, color }: { series: number[]; color: string }) {
  if (series.length < 2) return null;
  const min = Math.min(...series);
  const max = Math.max(...series);
  const range = max - min || 1;
  const points = series
    .map((v, i) => {
      const x = (i / (series.length - 1)) * (SPARK_W - 2) + 1;
      const y = SPARK_H - 1 - ((v - min) / range) * (SPARK_H - 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg
      width={SPARK_W}
      height={SPARK_H}
      viewBox={`0 0 ${SPARK_W} ${SPARK_H}`}
      className="hidden shrink-0 sm:block"
      aria-hidden="true"
    >
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Arrow({ pct, color }: { pct: number; color: string }) {
  // Flèche diagonale : haut-droite si hausse, bas-droite si baisse, trait si stable.
  const d = pct > 0 ? "M6 14 14 6M8 6h6v6" : pct < 0 ? "M6 6 14 14M14 8v6h-6" : "M5 10h10";
  return (
    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 shrink-0" aria-hidden="true">
      <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Pastille "indicateur de marché" pour les héros. Cours différés (voir
 * `src/lib/market.ts`). Se met à jour toutes les 5 min et garde sa dernière
 * valeur connue si un rafraîchissement échoue.
 */
export default function MarketTicker({ className = "" }: { className?: string }) {
  const [quote, setQuote] = useState<MarketQuote | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/market", { cache: "no-store" });
      const json = (await res.json()) as { ok: boolean; quote?: MarketQuote };
      if (json.ok && json.quote) setQuote(json.quote);
    } catch {
      /* on garde la dernière valeur connue */
    }
  }, []);

  useEffect(() => {
    // `setTimeout` : on ne déclenche pas le fetch (donc le setState) en synchrone
    // dans le corps de l'effet.
    const first = window.setTimeout(load, 0);
    timer.current = window.setInterval(load, REFRESH_MS);
    const onVisible = () => {
      if (document.visibilityState === "visible") load();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(timer.current);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [load]);

  const base =
    "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 " +
    "text-xs font-semibold text-white backdrop-blur-sm";

  if (!quote) {
    return (
      <span className={`${base} ${className}`} aria-hidden="true">
        <span className="h-3.5 w-3.5 shrink-0 animate-pulse rounded-full bg-white/25" />
        <span className="h-3 w-24 animate-pulse rounded bg-white/15" />
      </span>
    );
  }

  const color = trendColor(quote.changePercent);
  const pct = `${pctFmt.format(quote.changePercent)} %`;
  const detail = `${quote.fullLabel} · ${priceFmt.format(quote.price)} ${quote.currency} · cours différé, mis à jour à ${timeFmt.format(new Date(quote.asOf))}`;

  return (
    <span
      className={`${base} ${className}`}
      role="status"
      title={detail}
      aria-label={`${quote.fullLabel} : ${pct} sur la séance`}
    >
      <span className="uppercase tracking-[0.14em] text-white/70">{quote.label}</span>
      <Sparkline series={quote.series} color={color} />
      <Arrow pct={quote.changePercent} color={color} />
      <span style={{ color }}>{pct}</span>
    </span>
  );
}
