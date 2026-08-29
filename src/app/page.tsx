import Link from "next/link";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import BrochureCallout from "@/components/ui/BrochureCallout";
import OffresCarousel from "@/components/ui/OffresCarousel";
import PartnerLogo from "@/components/ui/PartnerLogo";
import TestimonialCarousel from "@/components/ui/TestimonialCarousel";
import StatItem from "@/components/ui/StatItem";
import ContactForm from "@/components/ui/ContactForm";
import { EmailIcon } from "@/components/icons/card-icons";
// import CasClientCard from "@/components/ui/CasClientCard"; // "Nos cas clients" section — see below
import Reveal from "@/components/ui/Reveal";
import Slogan from "@/components/ui/Slogan";
import HeroSchemaVideo from "@/components/ui/HeroSchemaVideo";
import FaqAccordion from "@/components/ui/FaqAccordion";
import { poles } from "@/data/poles";
import { partenaires } from "@/data/partenaires";
import { temoignages } from "@/data/temoignages";
import { entreprise } from "@/data/entreprise";
import { chiffresCles } from "@/data/chiffres-cles";
// import { casClients } from "@/data/cas-clients"; // "Nos cas clients" section — see below
import { faqThemes } from "@/data/faq";

const homepageFaq = { theme: "Questions fréquentes", items: faqThemes.flatMap((t) => t.items).filter((item) => item.highlight) };

// Brand gradient, light variant — see Slogan.tsx — reused here on the dark
// "chiffres" section for the same on-brand accent treatment.
const GRADIENT_LIGHT = "bg-gradient-to-r from-[#f77bf0] via-[#6f8cf5] to-[#7ef0ff] bg-clip-text text-transparent";
// Brand gradient, dark variant — see Slogan.tsx — for the same accent on the
// page's light sections.
const GRADIENT_DARK = "bg-gradient-to-r from-[#fa11f7] via-[#132bdd] to-[#0bceff] bg-clip-text text-transparent";
// Deeper/darker take on the same gradient (stops dimmed ~30%) for headings
// that need more contrast against a light background.
const GRADIENT_DARK_DEEP = "bg-gradient-to-r from-[#af0cad] via-[#0d1e9b] to-[#0890b3] bg-clip-text text-transparent";

const satisfaction: (typeof chiffresCles)[number] = {
  valeur: "98",
  suffix: "%",
  libelle: "taux de satisfaction client",
};

export default function Home() {
  // const casClientsApercu = casClients.filter((c) => c.visible).slice(0, 3); // "Nos cas clients" section — see below

  return (
    <>
      <section className="bg-home-hero relative flex min-h-screen items-center overflow-hidden">
        {/* Desktop-only copy: positioned against the <section> itself (the
            full viewport width), not the max-w text container, so it can be
            enlarged and centered on the right half of the screen independent
            of how wide the text column is. The in-flow copy below handles
            mobile/tablet instead. */}
        <HeroSchemaVideo className="pointer-events-none absolute top-1/2 right-[7%] hidden w-[50vw] max-w-4xl -translate-y-1/2 lg:block" />

        <div className="hero-grid mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-[96rem] lg:px-8">
          <div className="hero-grid-text">
            <h1 className="max-w-3xl text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              Conseil &amp; Services IT
            </h1>
            <h2 className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60 sm:text-xs sm:tracking-[0.25em] md:text-sm">
              <Slogan variant="light" />
            </h2>
            <p className="mt-10 max-w-2xl text-base leading-relaxed text-white sm:mt-12 sm:text-lg">
              Cycle Consulting accompagne les décideurs d&apos;entreprise avec des consultants experts en
              formations, service managé, infogérance, business &amp; stratégie, ingénierie IT et logistique.
            </p>
          </div>

          <HeroSchemaVideo className="hero-grid-video max-w-sm justify-self-center lg:hidden" />

          <div className="hero-grid-cta flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <Link
              href="/contact"
              className="cta-primary w-full rounded-md px-6 py-3 text-center text-sm font-bold sm:w-auto"
            >
              Demander un devis
            </Link>
            <Link
              href="#offres"
              className="w-full rounded-md border border-white/30 px-6 py-3 text-center text-sm font-bold text-white transition-colors hover:border-transparent hover:bg-white hover:text-anthracite sm:w-auto"
            >
              Découvrir nos services
            </Link>
          </div>
        </div>
      </section>

      <section id="offres" className="mx-auto max-w-7xl scroll-mt-18 px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Nos offres"
            title={
              <>
                Cinq pôles d&apos;expertise au service de{" "}
                <span className={`whitespace-nowrap ${GRADIENT_DARK}`}>votre performance</span>
              </>
            }
            description="Des consultants référencés et disponibles pour vous accompagner à chaque étape de vos projets."
          />
        </Reveal>
        <Reveal className="mt-10">
          <OffresCarousel poles={poles.filter((pole) => pole.visible)} />
        </Reveal>
      </section>

      <section className="bg-chiffres-section">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-center text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Cycle Consulting en <span className={GRADIENT_LIGHT}>chiffres</span>
            </h2>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-10 lg:grid-cols-4">
            {[...chiffresCles, satisfaction].map((chiffre, index) => (
              <Reveal key={chiffre.libelle} delay={index * 0.1}>
                <StatItem chiffre={chiffre} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* "Nos cas clients" section — removed from the homepage at the client's
          request, kept here (and the casClientsApercu/CasClientCard wiring
          below) so it can be restored by uncommenting if they want it back. */}
      {/*
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Références"
            title="Nos cas clients"
            description="Références présentées de façon anonymisée pour des raisons de confidentialité contractuelle — enjeux et résultats réels, nom du client non communiqué."
            center
          />
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {casClientsApercu.map((casClient, index) => (
            <Reveal key={casClient.slug} delay={index * 0.08} className="h-full">
              <CasClientCard casClient={casClient} imageHeader />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/cas-clients"
            className="text-sm font-semibold text-anthracite underline-offset-4 hover:underline"
          >
            Voir tous les cas clients →
          </Link>
        </div>
      </section>
      */}

      <section className="bg-surface-alt py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow={<span className={GRADIENT_DARK_DEEP}>Ils nous font confiance</span>}
              title="Nos partenaires"
              center
            />
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
            {partenaires.map((p, index) => (
              <Reveal key={p.nom} delay={index * 0.06}>
                <PartnerLogo nom={p.nom} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading title="Ce que nos clients disent de nous" center />
          </Reveal>
        </div>
        <div className="mt-10">
          <TestimonialCarousel temoignages={temoignages} />
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

      <section className="bg-surface-alt py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              title={
                <>
                  Un projet ? <span className={GRADIENT_DARK}>Parlons-en</span> avec un consultant Cycle.
                </>
              }
              center
            />
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-5">
            <Reveal className="md:col-span-2">
              <Image
                src="/cycle-consulting-logo-wordmark.svg"
                alt="Cycle Consulting"
                width={241}
                height={164}
                className="h-20 w-auto"
              />
              <Slogan variant="dark" className="mt-4 text-lg font-semibold text-anthracite" />
              <a
                href={`mailto:${entreprise.email}`}
                className="mt-8 inline-flex items-center gap-2.5 rounded-md border border-border-subtle bg-surface-alt px-4 py-3 text-sm font-semibold text-anthracite transition-colors hover:border-anthracite"
              >
                <EmailIcon className="h-5 w-5 shrink-0 text-anthracite-mist" />
                {entreprise.email}
              </a>
            </Reveal>

            <Reveal className="md:col-span-3" delay={0.1}>
              <h3 className="text-lg font-semibold text-anthracite">Nous contacter</h3>
              <p className="mt-2 text-sm text-anthracite-mist">
                Les champs marqués d&apos;un astérisque (*) sont obligatoires.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <BrochureCallout />

      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="FAQ" title="Questions fréquentes" center />
        </Reveal>
        <Reveal className="mt-10">
          <FaqAccordion theme={homepageFaq} />
        </Reveal>
        <Reveal className="mt-8 text-center">
          <Link href="/faq" className="text-sm font-semibold text-anthracite underline-offset-4 hover:underline">
            Voir toutes les questions →
          </Link>
        </Reveal>
      </section>
    </>
  );
}
