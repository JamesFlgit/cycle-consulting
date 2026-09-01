import { NextResponse } from "next/server";
import { fetchMarketQuote, MARKET_REVALIDATE_SECONDS } from "@/lib/market";

// Cours différés, mis en cache : on revalide au rythme de la source.
export const revalidate = 600; // = MARKET_REVALIDATE_SECONDS

export async function GET() {
  try {
    const quote = await fetchMarketQuote();
    return NextResponse.json(
      { ok: true, quote },
      {
        headers: {
          "Cache-Control": `public, s-maxage=${MARKET_REVALIDATE_SECONDS}, stale-while-revalidate=86400`,
        },
      },
    );
  } catch (error) {
    // Le widget garde sa dernière valeur connue et réessaiera : on répond 200
    // avec ok:false plutôt qu'une erreur, pour ne pas polluer les logs client.
    console.error("[api/market]", error);
    return NextResponse.json(
      { ok: false },
      { headers: { "Cache-Control": "no-store" } },
    );
  }
}
