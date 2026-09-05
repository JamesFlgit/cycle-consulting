import Link from "next/link";
import Image from "next/image";
import type { Evenement } from "@/data/evenements";

const MOIS_ABBR = [
  "janv.", "févr.", "mars", "avr.", "mai", "juin",
  "juil.", "août", "sept.", "oct.", "nov.", "déc.",
];

function formatDateBlock(dateISO: string) {
  const [year, month, day] = dateISO.split("-").map(Number);
  return { jour: day, mois: MOIS_ABBR[month - 1], annee: year };
}

export default function EvenementCarouselCard({
  evenement,
  active = true,
}: {
  evenement: Evenement;
  active?: boolean;
}) {
  const { jour, mois, annee } = formatDateBlock(evenement.dateISO);
  const lieuLabel = [evenement.lieu, evenement.ville].filter(Boolean).join(", ") || evenement.ville;

  return (
    <div
      className={`h-full rounded-xl p-px shadow-sm transition-colors ${
        active ? "bg-gradient-to-r from-[#fa11f7] via-[#132bdd] to-[#0bceff]" : "bg-border-subtle"
      }`}
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(0.75rem-1px)] bg-surface transition-shadow hover:shadow-md">
        <div className="relative aspect-video shrink-0">
          {evenement.image ? (
            <Image
              src={evenement.image}
              alt={evenement.imageAlt ?? ""}
              fill
              sizes="(min-width:1024px) 380px, (min-width:640px) 45vw, 90vw"
              className="object-cover"
              style={evenement.imagePosition ? { objectPosition: evenement.imagePosition } : undefined}
            />
          ) : (
            <div className="card-header-frame flex h-full w-full items-center justify-center">
              <Image
                src="/cycle-mark-white.svg"
                alt=""
                width={160}
                height={80}
                className="h-auto w-1/2 opacity-90"
              />
            </div>
          )}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.85) 12%, transparent 55%)" }}
          />
          <span className="absolute left-4 top-4 flex flex-col items-center rounded-lg bg-white/95 px-3 py-1.5 text-anthracite shadow-sm">
            <span className="text-lg font-bold leading-none">{jour}</span>
            <span className="text-[10px] font-semibold uppercase tracking-wide text-anthracite-mist">
              {mois} {annee}
            </span>
          </span>
          <span className="absolute right-4 top-4 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-anthracite shadow-sm">
            {evenement.presta}
          </span>
          <h3 className="absolute inset-x-0 bottom-0 p-4 text-sm font-semibold text-white drop-shadow-sm">
            {evenement.nom}
          </h3>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <p className="text-xs font-semibold text-anthracite">{lieuLabel}</p>
          <p className="mt-2 line-clamp-3 flex-1 text-xs leading-relaxed text-anthracite-mist">
            {evenement.description}
          </p>
          {active && (
            <div className="mt-4 flex flex-col gap-2">
              <Link
                href="/evenements"
                className="cta-primary cta-primary-on-light block w-full rounded-md px-4 py-2 text-center text-xs font-bold"
              >
                Tous nos évènements
              </Link>
              {evenement.siteUrl && (
                <a
                  href={evenement.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center text-xs font-semibold text-[#132bdd] underline-offset-4 hover:underline"
                >
                  Site de l&apos;évènement →
                </a>
              )}
            </div>
          )}
        </div>

        {/* Whitening wash — self-contained inside the card (like OfferCard), so a
            back card reads as faded without turning translucent. */}
        {!active && <div className="pointer-events-none absolute inset-0 bg-white/55" />}
      </div>
    </div>
  );
}
