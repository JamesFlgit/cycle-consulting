"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MarketQuote } from "@/lib/market";

const REFRESH_MS = 5 * 60 * 1000;
const SPARK_W = 56;
const SPARK_H = 16;

const TREND = {
  light: { up: "#5cf2ab", down: "#ff8592", flat: "rgba(255,255,255,0.55)" },
  dark: { up: "#0a7d43", down: "#c23934", flat: "#6b6f76" },
} as const;

const pctFmt = new Intl.NumberFormat("fr-FR", {
  signDisplay: "exceptZero",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const priceFmt = new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const timeFmt = new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit" });

type Tone = "light" | "dark";

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
    <svg width={SPARK_W} height={SPARK_H} viewBox={`0 0 ${SPARK_W} ${SPARK_H}`} className="hidden shrink-0 sm:block" aria-hidden="true">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Arrow({ pct, color }: { pct: number; color: string }) {
  const d = pct > 0 ? "M6 14 14 6M8 6h6v6" : pct < 0 ? "M6 6 14 14M14 8v6h-6" : "M5 10h10";
  return (
    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 shrink-0" aria-hidden="true">
      <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Pastille "indicateur de marché" pour la barre de navigation. Cours différés
 * (voir `src/lib/market.ts`). Se met à jour toutes les 5 min et garde sa
 * dernière valeur connue si un rafraîchissement échoue.
 *
 * @param variant "full" (libellé + sparkline + variation) ou "compact" (variation seule, mobile).
 * @param tone    "light" sur fond sombre/transparent, "dark" sur fond clair.
 */
export default function MarketTicker({
  variant = "full",
  tone = "dark",
  className = "",
}: {
  variant?: "full" | "compact";
  tone?: Tone;
  className?: string;
}) {
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

  const shell =
    tone === "light"
      ? "border-white/15 bg-white/10 text-white backdrop-blur-sm"
      : "border-border-subtle bg-surface-alt text-anthracite";
  const pad = variant === "compact" ? "gap-1 px-2 py-1" : "gap-2 px-3 py-1.5";
  const base = `inline-flex items-center rounded-full border text-xs font-semibold ${shell} ${pad}`;

  if (!quote) {
    const bar = tone === "light" ? "bg-white/20" : "bg-anthracite/10";
    return (
      <span className={`${base} ${className}`} aria-hidden="true">
        <span className={`h-3.5 w-3.5 shrink-0 animate-pulse rounded-full ${bar}`} />
        {variant === "full" && <span className={`h-3 w-20 animate-pulse rounded ${bar}`} />}
      </span>
    );
  }

  const colors = TREND[tone];
  const color = quote.changePercent > 0 ? colors.up : quote.changePercent < 0 ? colors.down : colors.flat;
  const pct = `${pctFmt.format(quote.changePercent)} %`;
  const detail = `${quote.fullLabel} · ${priceFmt.format(quote.price)} ${quote.currency} · cours différé, mis à jour à ${timeFmt.format(new Date(quote.asOf))}`;
  const labelColor = tone === "light" ? "text-white/70" : "text-anthracite-mist";

  return (
    <span
      className={`${base} ${className}`}
      role="status"
      title={detail}
      aria-label={`${quote.fullLabel} : ${pct} sur la séance`}
    >
      {variant === "full" && <span className={`uppercase tracking-[0.14em] ${labelColor}`}>{quote.label}</span>}
      {variant === "full" && <Sparkline series={quote.series} color={color} />}
      <Arrow pct={quote.changePercent} color={color} />
      <span style={{ color }}>{pct}</span>
    </span>
  );
}
