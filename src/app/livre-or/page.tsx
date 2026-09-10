import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import TestimonialCard from "@/components/ui/TestimonialCard";
import { temoignages, isDisplayable, type Temoignage } from "@/data/temoignages";
import { pageMetadata } from "@/lib/site";

// Brand gradient, light variant — for the eyebrow on the dark hero.
const GRADIENT_LIGHT = "bg-gradient-to-r from-[#f77bf0] via-[#6f8cf5] to-[#7ef0ff] bg-clip-text text-transparent";

// Bandeau de logos : on le derive des temoignages pour qu'il ne puisse afficher
// que des clients ayant donne leur accord (seuls ceux-la portent un `logo`).
const clientsAutorises = temoignages.filter(
  (t): t is Temoignage & { logo: string } => Boolean(t.logo),
);

export const metadata: Metadata = pageMetadata({
  title: "Livre d'or",
  description:
    "Les témoignages des clients qui font confiance à Cycle Consulting pour accompagner la croissance et la transformation de leur système d'information.",
  path: "/livre-or",
});

export default function LivreOrPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ name: "Accueil", href: "/" }, { name: "Livre d'or" }]}
        eyebrow={<span className={GRADIENT_LIGHT}>Livre d&apos;or</span>}
        title="La confiance de nos clients, notre meilleure référence"
        titleClassName="mt-3 max-w-xl text-2xl font-bold text-balance text-white sm:text-3xl xl:text-4xl xl:leading-[1.15]"
        description="Ils nous font confiance pour accompagner la croissance et la transformation de leur entreprise."
        image="/images/livre-or/hero.webp"
        imageAlt="Deux consultants Cycle Consulting devant un livre d'or lumineux entouré d'avis clients cinq étoiles"
        imageSide="right"
        tint="#2b2875"
      />

      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-anthracite-mist">
          Ils nous font confiance
        </p>
        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
          {clientsAutorises.map((c) => (
            <div
              key={c.ref}
              className="flex h-24 items-center justify-center rounded-xl border border-border-subtle bg-surface p-4 shadow-sm"
            >
              <Image
                src={c.logo}
                alt={`Logo ${c.ref}`}
                width={240}
                height={96}
                sizes="(min-width: 640px) 240px, 90vw"
                className="h-full w-full object-contain"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {temoignages.filter(isDisplayable).map((t) => (
            <TestimonialCard key={t.ref} temoignage={t} />
          ))}
        </div>
      </section>
    </>
  );
}
