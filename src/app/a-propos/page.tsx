import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import StatItem from "@/components/ui/StatItem";
import Slogan from "@/components/ui/Slogan";
import { chiffresCles } from "@/data/chiffres-cles";

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

      <section className="bg-anthracite">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {chiffresCles.map((chiffre) => (
              <StatItem key={chiffre.libelle} chiffre={chiffre} />
            ))}
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
