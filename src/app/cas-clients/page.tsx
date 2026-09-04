import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import CasClientCard from "@/components/ui/CasClientCard";
import { casClients } from "@/data/cas-clients";
import { pageMetadata } from "@/lib/site";

// Brand gradient, light variant — see Slogan.tsx — for the accent on this
// page's dark hero.
const GRADIENT_LIGHT = "bg-gradient-to-r from-[#f77bf0] via-[#6f8cf5] to-[#7ef0ff] bg-clip-text text-transparent";

export const metadata: Metadata = pageMetadata({
  title: "Cas clients",
  description:
    "Transformation de centres de services, pilotage du service delivery, migration IT internationale, support N3 : les missions menées par Cycle Consulting.",
  path: "/cas-clients",
});

export default function CasClientsPage() {
  const visibles = casClients.filter((c) => c.visible);

  return (
    <>
      <PageHero
        eyebrow={<span className={GRADIENT_LIGHT}>Cas clients</span>}
        title={
          <>
            Ils nous font confiance{" "}
            <span className="whitespace-nowrap">
              sur <span className={GRADIENT_LIGHT}>des enjeux similaires aux vôtres</span>
            </span>
          </>
        }
        titleClassName="mt-3 text-2xl font-bold text-balance text-white sm:text-3xl lg:text-4xl xl:text-[1.9rem] xl:leading-[1.2]"
        description="Pour des raisons de confidentialité contractuelle, nos références sont présentées de façon anonymisée : les enjeux, l'intervention et les résultats décrits sont réels, seul le nom du client n'est pas communiqué."
        image="/images/offres/cas-clients-dark.webp"
        imageAlt=""
        imageSide="right"
        tint="#071633"
        mobileFullBleedPhoto
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibles.map((casClient) => (
            <CasClientCard key={casClient.slug} casClient={casClient} imageHeader />
          ))}
        </div>
      </section>
    </>
  );
}
