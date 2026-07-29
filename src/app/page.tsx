import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import OfferCard from "@/components/ui/OfferCard";
import PartnerLogo from "@/components/ui/PartnerLogo";
import TestimonialCard from "@/components/ui/TestimonialCard";
import { offres } from "@/data/offres";
import { partenaires } from "@/data/partenaires";
import { temoignages } from "@/data/temoignages";
import { entreprise } from "@/data/entreprise";

export default function Home() {
  return (
    <>
      <section className="bg-page-hero bg-office-gradient">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60">
            Conseil &amp; Services IT
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            {entreprise.slogan}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
            Cycle Consulting accompagne les décideurs d&apos;entreprise avec des consultants experts en
            formations, service managé, infogérance, business &amp; stratégie, ingénierie IT et logistique.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/contact" className="cta-primary rounded-md px-6 py-3 text-sm font-bold">
              Nous contacter
            </Link>
            <Link
              href="/partenaires"
              className="rounded-md border border-white/30 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-transparent hover:bg-white hover:text-anthracite"
            >
              Découvrir nos partenaires
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Nos offres"
          title="Cinq pôles d'expertise au service de votre performance"
          description="Des consultants référencés et disponibles pour vous accompagner à chaque étape de vos projets."
        />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {offres.map((offre) => (
            <OfferCard key={offre.titre} offre={offre} />
          ))}
        </div>
      </section>

      <section className="bg-surface-alt py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Ils nous font confiance" title="Nos partenaires" center />
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {partenaires.map((p) => (
              <PartnerLogo key={p.nom} nom={p.nom} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Livre d'or" title="Ce que nos clients disent de nous" center />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {temoignages.map((t) => (
            <TestimonialCard key={t.auteur} temoignage={t} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/livre-or"
            className="text-sm font-semibold text-anthracite underline-offset-4 hover:underline"
          >
            Voir tous les témoignages →
          </Link>
        </div>
      </section>

      <section className="bg-anthracite">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Un projet ? Parlons-en avec un consultant Cycle.
          </h2>
          <div className="mt-8">
            <Link
              href="/contact"
              className="cta-primary inline-block rounded-md px-6 py-3 text-sm font-bold"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
