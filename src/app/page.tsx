import Link from "next/link";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import BrochureCallout from "@/components/ui/BrochureCallout";
import OffresCarousel from "@/components/ui/OffresCarousel";
import PartnerLogo from "@/components/ui/PartnerLogo";
import TestimonialCarousel from "@/components/ui/TestimonialCarousel";
import StatItem from "@/components/ui/StatItem";
import ArticleCard from "@/components/ui/ArticleCard";
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
import { articles } from "@/data/articles";
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

// Les 3 ressources les plus récentes, pour la section blog de la home.
const derniersArticles = articles
  .filter((article) => article.visible)
  .sort((a, b) => b.dateISO.localeCompare(a.dateISO))
  .slice(0, 3);

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
        {/* Centered on 75% (the midpoint of the right half), not anchored
            to the right edge — with a capped max-width, a right-edge
            anchor drags the video toward the edge on very wide screens
            instead of keeping it centered in the right half. */}
        {/* Centered on 75% with width capped at 44vw (not 50): at exactly
            half the distance from center to the viewport edge, 50vw would
            put the video's right edge flush against the viewport edge with
            zero margin at any size where max-w isn't yet the constraint. */}
        <HeroSchemaVideo className="pointer-events-none absolute top-1/2 left-[75%] hidden w-[44vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 lg:block 2xl:max-w-6xl" />

        <div className="hero-grid mx-auto w-full max-w-7xl px-4 pt-24 pb-10 sm:px-6 sm:py-32 lg:max-w-[96rem] lg:px-8">
          <div className="hero-grid-text">
            <h1 className="text-[1.75rem] font-bold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-6xl">
              Transformer la complexité IT{" "}
              <span className={GRADIENT_LIGHT}>en performance</span>
            </h1>
            <p className="mt-2 max-w-2xl text-[9px] leading-relaxed text-white/70 sm:text-[11px] md:text-xs lg:mt-3 lg:text-sm 2xl:text-[15px]">
              Révéler les talents qui la rendent possible
            </p>
            <h2 className="mt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60 sm:text-xs sm:tracking-[0.25em] md:text-sm lg:mt-8 lg:text-base 2xl:text-lg">
              <Slogan variant="light" />
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white sm:mt-10 sm:text-base lg:text-lg 2xl:text-xl">
              CYCLE CONSULTING accompagne les entreprises dans la transformation, le pilotage et
              l&apos;exploitation de leurs environnements IT, en combinant expertise technologique,
              excellence opérationnelle et proximité humaine.
            </p>
          </div>

          <HeroSchemaVideo className="hero-grid-video w-full lg:hidden" />

          <div className="hero-grid-cta flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <Link
              href="/contact"
              className="cta-primary w-full rounded-md px-6 py-3 text-center text-sm font-bold sm:w-auto lg:px-8 lg:py-4 lg:text-base 2xl:px-10 2xl:py-5 2xl:text-lg"
            >
              Demander un devis
            </Link>
            <Link
              href="#offres"
              className="w-full rounded-md border border-white/30 px-6 py-3 text-center text-sm font-bold text-white transition-colors hover:border-transparent hover:bg-white hover:text-anthracite sm:w-auto lg:px-8 lg:py-4 lg:text-base 2xl:px-10 2xl:py-5 2xl:text-lg"
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
            description="Références présentées de façon anonymisée pour des raisons de confidentialité contractuelle : enjeux et résultats réels, nom du client non communiqué."
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

      <section id="partenaires" className="scroll-mt-18 bg-surface-alt py-20">
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
            <SectionHeading title="Ils nous ont fait confiance" center />
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
              eyebrow={<span className={GRADIENT_DARK_DEEP}>Cycle News</span>}
              title="Revues et Newsletter Cycle"
              description={
                <>
                  Cycle décrypte l&apos;essentiel de l&apos;actualité IT, et partage l&apos;expérience et les
                  retours terrain de ses consultants, pour vous aider à apprendre, comprendre et entreprendre les
                  transitions numériques de demain.
                  <br />
                  <br />
                  Par nous, pour vous.
                </>
              }
              center
            />
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {derniersArticles.map((article, index) => (
              <Reveal key={article.slug} delay={index * 0.08} className="h-full">
                <ArticleCard article={article} />
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/ressources"
              className="text-sm font-semibold text-anthracite underline-offset-4 hover:underline"
            >
              Voir toutes les ressources →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20">
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
