import type { Evenement } from "@/data/evenements";
import { MapPinIcon, GlobeIcon } from "@/components/icons/card-icons";

const MOIS_ABBR = [
  "janv.",
  "févr.",
  "mars",
  "avr.",
  "mai",
  "juin",
  "juil.",
  "août",
  "sept.",
  "oct.",
  "nov.",
  "déc.",
];

function formatDateBlock(dateISO: string) {
  const [year, month, day] = dateISO.split("-").map(Number);
  return { jour: day, mois: MOIS_ABBR[month - 1], annee: year };
}

export default function EventCard({ evenement }: { evenement: Evenement }) {
  const lieuLabel = [evenement.lieu, evenement.ville].filter(Boolean).join(", ") || evenement.ville;
  const { jour, mois, annee } = formatDateBlock(evenement.dateISO);

  return (
    <article className="flex flex-col gap-6 rounded-xl border border-border-subtle bg-surface p-6 shadow-sm sm:p-8 md:flex-row md:items-center">
      <time
        dateTime={evenement.dateISO}
        className="flex shrink-0 items-baseline gap-2 md:w-36 md:flex-col md:items-start md:gap-0 md:border-r md:border-border-subtle md:pr-6"
      >
        <span className={`text-3xl font-bold leading-none sm:text-4xl bg-gradient-to-r from-[#fa11f7] via-[#132bdd] to-[#0bceff] bg-clip-text text-transparent`}>
          {jour}
        </span>
        <span className="text-sm font-semibold uppercase tracking-wide text-anthracite-mist md:mt-1">
          {mois} {annee}
        </span>
      </time>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h3 className="text-lg font-semibold text-anthracite">{evenement.nom}</h3>
          <span className="w-fit rounded-full bg-surface-alt px-3 py-1 text-xs font-semibold uppercase tracking-wide text-anthracite">
            {evenement.presta}
          </span>
        </div>

        <div className="mt-2 flex items-start gap-1.5 text-sm text-anthracite-soft">
          <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-anthracite-mist" />
          <span>
            {lieuLabel}
            {evenement.adresse && <span className="text-anthracite-mist"> · {evenement.adresse}</span>}
          </span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-anthracite-soft">{evenement.description}</p>

        {evenement.organisateur && (
          <p className="mt-2 text-xs text-anthracite-mist">Organisé par {evenement.organisateur}</p>
        )}
      </div>

      {evenement.siteUrl && (
        <a
          href={evenement.siteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-md border border-border-subtle px-4 py-2 text-sm font-semibold text-anthracite transition-colors hover:bg-surface-alt md:self-center"
        >
          <GlobeIcon className="h-4 w-4" />
          Site de l&apos;évènement
        </a>
      )}
    </article>
  );
}
