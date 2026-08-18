import Link from "next/link";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import BrochureCallout from "@/components/ui/BrochureCallout";
import OffresCarousel from "@/components/ui/OffresCarousel";
import PartnerLogo from "@/components/ui/PartnerLogo";
import TestimonialCarousel from "@/components/ui/TestimonialCarousel";
import StatItem from "@/components/ui/StatItem";
import ContactForm from "@/components/ui/ContactForm";
import CasClientCard from "@/components/ui/CasClientCard";
import Reveal from "@/components/ui/Reveal";
import Slogan from "@/components/ui/Slogan";
import { poles } from "@/data/poles";
import { partenaires } from "@/data/partenaires";
import { temoignages } from "@/data/temoignages";
import { entreprise } from "@/data/entreprise";
import { chiffresCles } from "@/data/chiffres-cles";
import { casClients } from "@/data/cas-clients";

export default function Home() {
  const casClientsApercu = casClients.filter((c) => c.visible).slice(0, 3);

  return (
    <>
      <section className="bg-home-hero flex min-h-screen items-center">
        <div className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/60 sm:text-sm">
            Conseil &amp; Services IT
          </p>
          <h1 className="mt-4 max-w-3xl text-lg font-bold text-white sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl">
            <Slogan variant="light" />
          </h1>
          <p className="mt-10 max-w-2xl text-base leading-relaxed text-white sm:mt-12 sm:text-lg">
            Cycle Consulting accompagne les décideurs d&apos;entreprise avec des consultants experts en
            formations, service managé, infogérance, business &amp; stratégie, ingénierie IT et logistique.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
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
            title="Cinq pôles d'expertise au service de votre performance"
            description="Des consultants référencés et disponibles pour vous accompagner à chaque étape de vos projets."
          />
        </Reveal>
        <Reveal className="mt-10">
          <OffresCarousel poles={poles.filter((pole) => pole.visible)} />
        </Reveal>
      </section>

      <section className="bg-anthracite">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-center text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
              Cycle Consulting en chiffres
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3">
            {chiffresCles.map((chiffre, index) => (
              <Reveal key={chiffre.libelle} delay={index * 0.1}>
                <StatItem chiffre={chiffre} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

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

      <section className="bg-surface-alt py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading eyebrow="Ils nous font confiance" title="Nos partenaires" center />
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
            <SectionHeading title="Un projet ? Parlons-en avec un consultant Cycle." center />
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
              <div className="mt-8 space-y-4 text-sm text-anthracite-soft">
                <div>
                  <p className="font-semibold text-anthracite">Contact</p>
                  <p>{entreprise.contact}</p>
                </div>
                <div>
                  <p className="font-semibold text-anthracite">Téléphone</p>
                  <p>{entreprise.telephone}</p>
                </div>
                <div>
                  <p className="font-semibold text-anthracite">E-mail</p>
                  <p>{entreprise.email}</p>
                </div>
              </div>
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
    </>
  );
}
