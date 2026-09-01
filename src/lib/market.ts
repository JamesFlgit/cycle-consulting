/**
 * Indicateur de marché affiché dans les héros (accueil + Ingénierie & IT Support).
 *
 * Source : endpoint public de Yahoo Finance (pas de clé). Fiable au quotidien
 * mais non contractuel : cours différés et l'endpoint peut évoluer. Toute la
 * dépendance est isolée ici et dans `src/app/api/market/route.ts`. Pour passer
 * à un fournisseur avec contrat (Twelve Data, Finnhub, Financial Modeling Prep),
 * il suffit de réécrire `fetchMarketQuote()` : la forme de `MarketQuote` ne bouge pas.
 *
 * Valeur suivie : ETF Xtrackers MSCI World Information Technology (EUR), utilisé
 * comme proxy d'un indice technologique mondial (marchés US, Europe, Asie).
 */

/** Symbole Yahoo Finance de la valeur suivie. */
export const MARKET_SYMBOL = "XDWT.MI";

/** Libellé court affiché dans la pastille. */
export const MARKET_SHORT_LABEL = "Secteur Tech";

/** Libellé complet (infobulle). */
export const MARKET_FULL_LABEL = "MSCI World, technologies de l'information";

/** Durée de mise en cache côté serveur, en secondes (cours différés : 10 min suffisent). */
export const MARKET_REVALIDATE_SECONDS = 600;

export type MarketQuote = {
  /** Libellé court pour l'affichage. */
  label: string;
  /** Nom complet de l'instrument. */
  fullLabel: string;
  /** Dernier cours. */
  price: number;
  /** Devise ISO (ex. "EUR"). */
  currency: string;
  /** Variation du jour en pourcentage (peut être négative). */
  changePercent: number;
  /** Horodatage du dernier cours (ms). */
  asOf: number;
  /** Série de clôtures récentes pour le sparkline (ancien -> récent). */
  series: number[];
};

type YahooChart = {
  chart: {
    result?: Array<{
      meta: {
        regularMarketPrice?: number;
        regularMarketChangePercent?: number;
        chartPreviousClose?: number;
        currency?: string;
        regularMarketTime?: number;
      };
      indicators?: { quote?: Array<{ close?: Array<number | null> }> };
    }>;
    error?: unknown;
  };
};

/**
 * Récupère le cours courant + une série récente. Lève une erreur si la réponse
 * est inexploitable — l'appelant (route API) décide quoi renvoyer au client.
 */
export async function fetchMarketQuote(): Promise<MarketQuote> {
  const url =
    `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(MARKET_SYMBOL)}` +
    `?range=1mo&interval=1d`;

  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; CycleConsultingBot/1.0)" },
    next: { revalidate: MARKET_REVALIDATE_SECONDS },
  });
  if (!res.ok) throw new Error(`Yahoo Finance HTTP ${res.status}`);

  const data = (await res.json()) as YahooChart;
  const result = data.chart.result?.[0];
  const meta = result?.meta;
  if (!meta || typeof meta.regularMarketPrice !== "number") {
    throw new Error("Yahoo Finance : réponse sans cours");
  }

  const price = meta.regularMarketPrice;
  const changePercent =
    typeof meta.regularMarketChangePercent === "number"
      ? meta.regularMarketChangePercent
      : typeof meta.chartPreviousClose === "number" && meta.chartPreviousClose > 0
        ? ((price - meta.chartPreviousClose) / meta.chartPreviousClose) * 100
        : 0;

  const series = (result?.indicators?.quote?.[0]?.close ?? [])
    .filter((v): v is number => typeof v === "number")
    .slice(-20);

  return {
    label: MARKET_SHORT_LABEL,
    fullLabel: MARKET_FULL_LABEL,
    price,
    currency: meta.currency ?? "EUR",
    changePercent,
    asOf: (meta.regularMarketTime ?? Math.floor(Date.now() / 1000)) * 1000,
    series: series.length >= 2 ? series : [price, price],
  };
}
