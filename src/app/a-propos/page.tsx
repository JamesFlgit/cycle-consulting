import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Slogan from "@/components/ui/Slogan";
import DonutChart from "@/components/ui/DonutChart";
import InternationalHighlight from "@/components/ui/InternationalHighlight";
import { repartitionPractices, repartitionGenre } from "@/data/repartitions";

// Brand gradient, light variant — see Slogan.tsx — for the same accent used on
// the homepage's dark "chiffres" section.
const GRADIENT_LIGHT = "bg-gradient-to-r from-[#f77bf0] via-[#6f8cf5] to-[#7ef0ff] bg-clip-text text-transparent";

export const metadata: Metadata = {
  title: "À propos de Cycle Consulting — Cycle Consulting",
  description:
    "Découvrez Cycle Consulting, société de conseil et de services IT : notre histoire, nos valeurs, nos atouts et notre équipe.",
};

export default function AProposPage() {
  return (
    <>
      <PageHero
        eyebrow="L'entreprise"
        title="À propos de Cycle Consulting"
        description={
          <>
            <Slogan variant="light" /> — société de conseil et de services IT au service de la performance de ses
            clients.
          </>
        }
      />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-4 text-sm leading-relaxed text-anthracite-soft">
          <p>[À COMPLÉTER — présentation de Cycle Consulting : histoire, mission, positionnement.]</p>
        </div>
      </section>

      <section className="bg-chiffres-section">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-md">
            <h3 className={`text-center text-sm font-semibold uppercase tracking-wide ${GRADIENT_LIGHT}`}>
              Dimension internationale
            </h3>
            <div className="mt-6">
              <InternationalHighlight />
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h3 className={`text-center text-sm font-semibold uppercase tracking-wide ${GRADIENT_LIGHT}`}>
                Nos effectifs par pôle d&apos;expertise
              </h3>
              <div className="mt-6">
                <DonutChart
                  data={repartitionPractices}
                  ariaLabel="Répartition des effectifs par pôle d'expertise : Service Managé 31%, Infogérance 26%, Business et Stratégie 22%, Centre Logistique 14%, Formations 7%"
                />
              </div>
            </div>
            <div>
              <h3 className={`text-center text-sm font-semibold uppercase tracking-wide ${GRADIENT_LIGHT}`}>
                Parité au sein de nos équipes
              </h3>
              <div className="mt-6">
                <DonutChart
                  data={repartitionGenre}
                  ariaLabel="Répartition Hommes / Femmes des effectifs : Hommes 62%, Femmes 38%"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="nos-valeurs-et-engagements" className="mx-auto max-w-4xl scroll-mt-18 px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Nos valeurs"
          title="Nos valeurs et engagements"
          description="Les principes qui guident Cycle Consulting au quotidien, dans ses missions comme dans ses relations clients."
        />
        <div className="mt-8 space-y-4 text-sm leading-relaxed text-anthracite-soft">
          <p>[À COMPLÉTER — valeurs de l&apos;entreprise, engagements RSE, qualité, éthique.]</p>
        </div>
      </section>

      <section id="nos-atouts-et-differences" className="scroll-mt-18 bg-surface-alt">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Nos atouts"
            title="Nos atouts et différences"
            description="Ce qui distingue Cycle Consulting dans l'accompagnement de ses clients et la réalisation de ses missions."
          />
          <div className="mt-8 space-y-4 text-sm leading-relaxed text-anthracite-soft">
            <p>[À COMPLÉTER — atouts différenciants : expertise, méthode, réactivité, couverture géographique.]</p>
          </div>
        </div>
      </section>

      <section id="equipe" className="mx-auto max-w-4xl scroll-mt-18 px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="L'équipe"
          title="L'équipe Cycle Consulting"
          description="Des consultants et experts IT engagés au quotidien auprès de nos clients."
        />
        <div className="mt-8 space-y-4 text-sm leading-relaxed text-anthracite-soft">
          <p>[À COMPLÉTER — présentation de l&apos;équipe : portraits, rôles, expertises.]</p>
        </div>
      </section>
    </>
  );
}
