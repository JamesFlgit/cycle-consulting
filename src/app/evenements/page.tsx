import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import EventCard from "@/components/ui/EventCard";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata, SITE_URL } from "@/lib/site";
import { getEvenementsAVenir, getEvenementsPasses } from "@/data/evenements";

// Brand gradient, light variant — for the eyebrow on the dark hero.
const GRADIENT_LIGHT = "bg-gradient-to-r from-[#f77bf0] via-[#6f8cf5] to-[#7ef0ff] bg-clip-text text-transparent";
// Brand gradient, dark variant — for accents on light sections.
const GRADIENT_DARK = "bg-gradient-to-r from-[#fa11f7] via-[#132bdd] to-[#0bceff] bg-clip-text text-transparent";

export const metadata: Metadata = pageMetadata({
  title: "Salons & événements",
  description:
    "Retrouvez Cycle Consulting en salon professionnel ou étudiant partout en France : dates, villes et lieux des prochains évènements où l'équipe est présente.",
  path: "/evenements",
});

export default function EvenementsPage() {
  const today = new Date().toISOString().slice(0, 10);
  const aVenir = getEvenementsAVenir(today);
  const passes = getEvenementsPasses(today);

  const salons = aVenir.filter((e) => e.categorie === "salon");
  const receptions = aVenir.filter((e) => e.categorie === "reception");

  const eventsJsonLd = {
    "@context": "https://schema.org",
    "@graph": aVenir.map((e) => ({
      "@type": "Event",
      name: e.nom,
      startDate: e.dateISO,
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: {
        "@type": "Place",
        name: e.lieu ?? e.ville,
        address: e.adresse ?? e.ville,
      },
      ...(e.organisateur && { organizer: { "@type": "Organization", name: e.organisateur } }),
      ...(e.siteUrl && { url: e.siteUrl }),
      performer: { "@type": "Organization", name: "Cycle Consulting", url: SITE_URL },
      description: e.description,
    })),
  };

  return (
    <>
      <JsonLd data={eventsJsonLd} />
      <PageHero
        eyebrow={<span className={GRADIENT_LIGHT}>L&apos;entreprise</span>}
        title="Salons & événements"
        description="Cycle Consulting va à la rencontre de ses clients, partenaires et futurs talents partout en France. Retrouvez les prochains salons et évènements où l'équipe est présente."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Agenda"
          title={
            <>
              Les prochains <span className={GRADIENT_DARK}>salons</span> où nous croiser
            </>
          }
          description="Stands, présences et rencontres professionnelles : voici où venir échanger avec l'équipe Cycle Consulting dans les prochains mois."
        />

        {salons.length > 0 ? (
          <div className="mt-10 flex flex-col gap-6">
            {salons.map((evenement) => (
              <EventCard key={evenement.slug} evenement={evenement} />
            ))}
          </div>
        ) : (
          <p className="mt-8 text-sm text-anthracite-mist">
            Aucun salon programmé pour le moment. Revenez bientôt ou contactez-nous pour organiser une rencontre.
          </p>
        )}
      </section>

      {receptions.length > 0 && (
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Nos temps forts"
              title={
                <>
                  Les <span className={GRADIENT_DARK}>évènements</span> Cycle Consulting
                </>
              }
              description="En plus des salons professionnels, Cycle Consulting organise ses propres temps de rencontre avec ses clients et partenaires."
            />
            <div className="mt-10 flex flex-col gap-6">
              {receptions.map((evenement) => (
                <EventCard key={evenement.slug} evenement={evenement} />
              ))}
            </div>
          </div>
        </section>
      )}

      {passes.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Historique" title="Évènements passés" />
          <ul className="mt-8 divide-y divide-border-subtle">
            {passes.map((evenement) => (
              <li key={evenement.slug} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm">
                <span className="font-semibold text-anthracite">{evenement.nom}</span>
                <span className="text-anthracite-mist">
                  {evenement.dateLabel} · {evenement.ville}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="bg-callout-light">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-anthracite sm:text-3xl">
            Une mission à nous confier ou une candidature à déposer ?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-anthracite-soft">
            Pas besoin d&apos;attendre le prochain salon : l&apos;équipe Cycle Consulting échange avec vous dès
            maintenant.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className="cta-primary rounded-md px-6 py-3 text-center text-sm font-bold">
              Nous contacter
            </Link>
            <Link
              href="/rejoignez-nous"
              className="rounded-md border border-border-subtle px-6 py-3 text-center text-sm font-bold text-anthracite hover:bg-surface-alt"
            >
              Rejoignez-nous
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
