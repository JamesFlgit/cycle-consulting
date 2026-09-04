import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Breadcrumb from "@/components/ui/Breadcrumb";
import RelatedExpertises from "@/components/ui/RelatedExpertises";
import { GraduationCapIcon, UsersThreeIcon, GearIcon } from "@/components/icons/card-icons";
import JsonLd from "@/components/seo/JsonLd";
import { serviceJsonLd, pageMetadata } from "@/lib/site";
import { getPoleBySlug } from "@/data/poles";

const pole = getPoleBySlug("business-strategie")!;

// Brand gradient, dark variant — for accents on light sections.
const GRADIENT_DARK = "bg-gradient-to-r from-[#fa11f7] via-[#132bdd] to-[#0bceff] bg-clip-text text-transparent";
// Brand gradient, light variant — for accents on dark sections.
const GRADIENT_LIGHT = "bg-gradient-to-r from-[#f77bf0] via-[#6f8cf5] to-[#7ef0ff] bg-clip-text text-transparent";

export const metadata: Metadata = pageMetadata({
  title: "Business & Stratégie",
  description:
    "Business Managers et consultants expérimentés pour accompagner votre développement et vos transformations : une relation de confiance et une culture du résultat.",
  path: "/business-strategie",
});

const PILIERS = [
  {
    title: "Une relation de confiance avant tout",
    intro:
      "La réussite d'un projet repose avant tout sur la qualité de la relation entre le client et son partenaire. Chez Cycle Consulting, nos consultants et nos Business Managers entretiennent une relation durable avec les décideurs qu'ils accompagnent. Ils prennent le temps de comprendre les spécificités de chaque organisation, ses contraintes opérationnelles, ses ambitions de développement et les enjeux propres à son secteur d'activité.",
    outro:
      "Cette proximité nous permet de proposer des solutions parfaitement adaptées aux réalités du terrain, tout en conservant une vision stratégique orientée vers la création de valeur. Nous croyons qu'un partenariat réussi se construit dans la transparence, la confiance et la disponibilité.",
  },
  {
    title: "Une culture de l'engagement et du résultat",
    intro:
      "Chez Cycle Consulting, nous mesurons notre réussite à celle de nos clients. Nos équipes interviennent avec une conviction forte : chaque mission doit produire un impact concret, durable et mesurable sur la performance de l'entreprise. Cette culture du résultat guide chacune de nos actions :",
    items: [
      "comprendre avant de proposer",
      "conseiller avant de vendre",
      "accompagner avant de déléguer",
      "mesurer la valeur créée à chaque étape de la mission",
    ],
    outro:
      "Nos consultants travaillent en étroite collaboration avec les directions générales, les directions métiers et les directions informatiques afin de garantir un alignement permanent entre les enjeux stratégiques et les solutions mises en œuvre.",
  },
  {
    title: "Des expertises au service de votre transformation",
    intro:
      "Nos équipes accompagnent les organisations dans leurs projets de transformation et d'amélioration de la performance à travers plusieurs domaines d'intervention :",
    items: [
      "Conseil en stratégie et transformation d'entreprise",
      "Définition et optimisation des organisations",
      "Gouvernance des services numériques",
      "Pilotage de la performance opérationnelle",
      "Management de transition",
      "Accompagnement des directions informatiques",
      "Gestion de programmes et de projets stratégiques",
      "Transformation digitale",
      "Optimisation des processus métiers",
      "Excellence opérationnelle",
      "Conduite du changement",
    ],
    outro:
      "Notre approche associe vision stratégique, pragmatisme opérationnel et maîtrise des meilleures pratiques afin de sécuriser les décisions et accélérer la création de valeur.",
  },
];

const ENGAGEMENTS = [
  "La proximité et la disponibilité",
  "L'excellence opérationnelle",
  "L'exigence de qualité",
  "La transparence",
  "L'agilité",
  "Une culture permanente de la performance et du résultat",
];

function CheckMark() {
  return (
    <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-[#132bdd]" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="currentColor" opacity={0.12} />
      <path d="m6 10.2 2.6 2.6L14.2 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function BusinessStrategiePage() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: pole.navLabel,
          description: pole.metaDescription,
          path: pole.href,
          image: pole.image,
          imageAlt: pole.imageAlt,
        })}
      />
      <PageHero
        eyebrow={<span className={GRADIENT_LIGHT}>Business &amp; Stratégie</span>}
        title={<>Transformer les ambitions <span className={GRADIENT_LIGHT}>en résultats</span> durables</>}
        titleClassName="mt-3 text-2xl font-bold text-balance text-white sm:text-3xl xl:text-[1.9rem] xl:leading-[1.2]"
        description="Conseil en Business & Stratégie."
        image="/images/offres/business-strategie-dark.webp"
        imageAlt={pole.imageAlt}
        imageSide="right"
        tint="#172533"
        badges={[
          { icon: <UsersThreeIcon className="h-full w-full" tone="light" />, label: "Stratégie" },
          { icon: <GraduationCapIcon className="h-full w-full" tone="light" />, label: "Impact" },
          { icon: <GearIcon className="h-full w-full" tone="light" />, label: "Résultats" },
        ]}
        cta={
          <Link
            href="#piliers"
            className="cta-primary cta-primary-light inline-block w-full rounded-md px-6 py-3 text-center text-sm font-bold sm:w-auto"
          >
            Découvrir l&apos;accompagnement
          </Link>
        }
      >
        <div className="mt-6">
          <Breadcrumb
            items={["Apprendre", <span key="c" className={`font-semibold ${GRADIENT_LIGHT}`}>Comprendre</span>, "Entreprendre"]}
          />
        </div>
      </PageHero>

      <section className="bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-lg leading-relaxed font-medium text-anthracite sm:text-xl">
            Dans un environnement économique marqué par l&apos;accélération des transformations, l&apos;évolution
            des technologies et l&apos;intensification de la concurrence, les entreprises recherchent des
            partenaires capables de comprendre leurs enjeux, d&apos;anticiper leurs défis et de construire avec
            elles des solutions créatrices de valeur.
          </p>
          <div className="mt-8 space-y-5 text-sm leading-relaxed text-anthracite-soft sm:text-base">
            <p>
              Chez Cycle Consulting, nous faisons du conseil en Business &amp; Stratégie un véritable levier de
              croissance et de performance. Notre mission ne se limite pas à recommander des solutions : nous nous
              engageons aux côtés de nos clients pour comprendre leur activité, analyser leurs objectifs
              stratégiques et les accompagner jusqu&apos;à l&apos;obtention de résultats mesurables.
            </p>
            <p>
              Parce que chaque entreprise est unique, nous privilégions une approche fondée sur l&apos;écoute, la
              proximité et la co-construction.
            </p>
          </div>
        </div>
      </section>

      <section id="piliers" className="mx-auto max-w-5xl scroll-mt-24 px-4 pt-8 pb-16 sm:pt-10 sm:px-6 lg:px-8">
        <h2 className="text-center text-xl font-bold text-anthracite sm:text-2xl lg:text-3xl">
          Trois piliers au service de <span className={`whitespace-nowrap ${GRADIENT_DARK}`}>votre performance</span>
        </h2>

        <div className="mt-14 space-y-14 sm:space-y-16">
          {PILIERS.map((pilier) => (
            <div key={pilier.title} className="flex gap-6 sm:gap-8">
              <span className="w-1.5 shrink-0 self-stretch rounded-full bg-gradient-to-b from-[#fa11f7] via-[#132bdd] to-[#0bceff]" />
              <div>
                <h3 className="text-lg font-bold text-anthracite sm:text-xl">{pilier.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-anthracite-soft">{pilier.intro}</p>
                {pilier.items && (
                  <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                    {pilier.items.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-anthracite-soft">
                        <CheckMark />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <p className="mt-4 text-sm leading-relaxed text-anthracite-soft">{pilier.outro}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/contact"
            className="cta-primary cta-primary-on-light inline-block w-full rounded-md px-6 py-3 text-center text-sm font-bold sm:w-auto"
          >
            Nous contacter
          </Link>
        </div>
      </section>

      <section className="bg-chiffres-section">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            L&apos;humain au <span className={GRADIENT_LIGHT}>cœur de la performance</span>
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/80">
            <p>
              Nos Business Managers sont bien plus que des interlocuteurs commerciaux : ils sont les partenaires
              privilégiés de nos clients tout au long de leur développement. Leur rôle consiste à anticiper les
              besoins, identifier les opportunités d&apos;amélioration, mobiliser les expertises les plus
              pertinentes et garantir le succès des missions confiées.
            </p>
            <p>
              Nous sommes convaincus que les meilleures stratégies ne prennent vie que grâce aux femmes et aux
              hommes qui les mettent en œuvre. Au-delà de leur expertise métier, nos consultants sont reconnus pour
              leur capacité à fédérer, accompagner les transformations, transmettre les bonnes pratiques et
              instaurer une relation de confiance avec l&apos;ensemble des parties prenantes.
            </p>
            <p>
              Cette combinaison d&apos;excellence technique, de sens du service et d&apos;intelligence relationnelle
              constitue la signature de Cycle Consulting.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl font-bold text-anthracite sm:text-3xl">
              Un partenaire <span className={GRADIENT_LIGHT}>engagé dans votre réussite</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-anthracite-soft">
              Choisir Cycle Consulting, c&apos;est choisir un cabinet qui privilégie les relations durables plutôt
              que les collaborations ponctuelles. Nous construisons avec chacun de nos clients un partenariat fondé
              sur :
            </p>
            <p className="mt-4 text-sm leading-relaxed text-anthracite-soft">
              Notre ambition est d&apos;accompagner durablement les entreprises dans leurs projets de croissance, de
              transformation et d&apos;innovation en leur apportant des expertises adaptées à leurs enjeux
              stratégiques.
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {ENGAGEMENTS.map((engagement) => (
              <li
                key={engagement}
                className="flex items-center gap-2.5 rounded-lg border border-border-subtle bg-surface px-4 py-3 text-sm font-medium text-anthracite-soft"
              >
                <CheckMark />
                {engagement}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-callout-light">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-anthracite sm:text-3xl">
            Votre partenaire <span className={GRADIENT_LIGHT}>Business &amp; Stratégie</span>
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-anthracite-soft">
            <p>
              Dans un monde où chaque décision influence la compétitivité de demain, Cycle Consulting accompagne
              les organisations avec une vision claire : transformer les défis en opportunités et les ambitions en
              résultats concrets.
            </p>
            <p>
              Nos consultants, nos Business Managers et nos experts interviennent avec un objectif commun : créer
              de la valeur durable, renforcer la performance de nos clients et construire, à leurs côtés, les
              succès de demain.
            </p>
          </div>
          <Link
            href="/contact"
            className="cta-primary cta-primary-on-light mt-8 inline-block w-full rounded-md px-6 py-3 text-center text-sm font-bold sm:w-auto"
          >
            Demander un devis
          </Link>
        </div>
      </section>

      <RelatedExpertises currentSlug="business-strategie" />
    </>
  );
}
