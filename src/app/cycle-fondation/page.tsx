import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import BoucleVertueuse from "@/components/ui/BoucleVertueuse";
import { pageMetadata } from "@/lib/site";

// CYCLE Foundation a sa propre identité (or/noir, cf. son logo) — distincte du
// gradient rose/bleu de CYCLE CONSULTING utilisé partout ailleurs sur le site.
const GOLD_ON_DARK = "bg-gradient-to-r from-[#f8e3a3] via-[#d4af37] to-[#9c7a2c] bg-clip-text text-transparent";
const GOLD_ON_LIGHT = "bg-gradient-to-r from-[#8a6a1f] via-[#b8952f] to-[#8a6a1f] bg-clip-text text-transparent";
const GOLD_RING_STOPS = [
  { offset: "0%", color: "#f8e3a3" },
  { offset: "45%", color: "#d4af37" },
  { offset: "100%", color: "#9c7a2c" },
];
// Dark sections: pure black (no navy), with a soft gold glow — replaces the
// site's usual bg-chiffres-section, which bakes in a blue radial highlight.
const DARK_SECTION_STYLE: CSSProperties = {
  backgroundImage:
    "radial-gradient(circle at 50% 15%, rgba(212,175,55,0.16) 0%, transparent 55%), linear-gradient(160deg, #141414 0%, #0d0d0d 45%, #060606 75%, #020202 100%)",
};

export const metadata: Metadata = pageMetadata({
  title: "Cycle Foundation",
  description:
    "CYCLE Foundation accompagne de jeunes talents vers les métiers de l'IT et développe son action à l'international, notamment en République démocratique du Congo, à Abidjan et au Sénégal.",
  path: "/cycle-fondation",
});

const VISION_STEPS = [
  {
    label: "Apprendre",
    description: "Donner accès à la connaissance et à la formation",
  },
  {
    label: "Comprendre",
    description: "Développer les compétences, la confiance et la capacité à construire son propre parcours.",
  },
  {
    label: "Transmettre",
    description: "Encourager les générations accompagnées à transmettre à leur tour leurs connaissances.",
  },
];

const METIERS_IT = [
  "Développement informatique",
  "Data & Intelligence Artificielle",
  "Cybersécurité",
  "Cloud & Infrastructure",
  "Réseaux & Télécommunications",
  "Systèmes d'information",
  "Management de projets IT",
  "Transformation digitale",
];

const PARCOURS_INTERNATIONAL = [
  "L'identification des talents",
  "L'accompagnement des étudiants",
  "Le financement de parcours d'études",
  "La transmission des compétences",
  "L'accès au monde professionnel",
];

const SECTEURS_TRANSFORMES = ["Technologie", "Finance", "Industrie", "Santé", "Éducation", "Services", "Entrepreneuriat"];

const METIERS_DE_DEMAIN = [
  "un ingénieur",
  "un expert",
  "un entrepreneur",
  "un chef de projet",
  "un dirigeant",
  "un formateur",
  "un créateur d'emplois",
];

const ENGAGEMENT_STEPS = [
  "Identifier",
  "Sélectionner",
  "Financer",
  "Accompagner",
  "Former",
  "Insérer",
  "Transmettre",
];

const ACTEURS_DU_CYCLE = [
  {
    audience: "Vous êtes une école ?",
    reponse: "Construisons ensemble des dispositifs permettant d'identifier et d'accompagner les talents.",
  },
  {
    audience: "Vous êtes une entreprise ?",
    reponse: "Soutenez un parcours, développez un programme de mentorat ou contribuez au financement d'une formation.",
  },
  {
    audience: "Vous êtes un professionnel de l'IT ?",
    reponse: "Partagez votre expérience, accompagnez un étudiant et transmettez votre savoir.",
  },
  {
    audience: "Vous souhaitez soutenir notre action ?",
    reponse:
      "Votre contribution peut participer directement au financement de parcours éducatifs et à l'émergence de nouvelles compétences.",
  },
];

export default function CycleFondationPage() {
  return (
    <>
      <PageHero
        eyebrow={<span className={GOLD_ON_DARK}>L&apos;entreprise</span>}
        title="Cycle Foundation"
        description="Révéler les talents. Construire les opportunités. Préparer l'avenir."
        image="/images/cycle-fondation/hero.webp"
        imageAlt="Jeune eleve souriante devant un ordinateur, dans une salle de classe portant l'inscription Un meilleur avenir avec le numerique"
        imageSide="right"
        tint="#2a1f16"
        fieldColor="#0a0a0a"
        eyebrowDotClassName="bg-linear-to-r from-[#f8e3a3] to-[#9c7a2c]"
        mobileFullBleedPhoto
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={<span className={GOLD_ON_LIGHT}>Notre mission</span>}
          title="L'éducation, un levier de développement"
          titleClassName="text-neutral-900"
        />
        <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-4 text-sm leading-relaxed text-neutral-600">
            <p>
              Chez CYCLE Foundation, nous sommes convaincus que l&apos;accès à l&apos;éducation constitue l&apos;un
              des leviers les plus puissants du développement.
            </p>
            <p className="font-semibold text-neutral-900">
              Le talent est présent partout.
              <br />
              Les opportunités, elles, ne le sont pas toujours.
            </p>
            <p>
              Notre mission est de contribuer à réduire cette différence en permettant à de jeunes étudiants issus
              de parcours et de territoires où l&apos;accès aux études supérieures peut être plus difficile, de
              poursuivre leur formation, développer leurs compétences et construire leur avenir professionnel dans
              les métiers de l&apos;IT.
            </p>
            <p className="font-semibold text-neutral-900">
              Notre ambition est simple : identifier les talents de demain et leur donner les moyens de réussir.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl ring-1 ring-[#d4af37]/40">
            <Image
              src="/images/cycle-fondation/mission.webp"
              alt="Jeune etudiant concentre devant un ordinateur, dans une salle de classe portant l'inscription Learn Create Achieve"
              width={1536}
              height={1024}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section style={DARK_SECTION_STYLE}>
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Investir dans <span className={`whitespace-nowrap ${GOLD_ON_DARK}`}>les talents de demain</span>
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/80">
            <p>
              Les métiers de l&apos;informatique évoluent rapidement et représentent un formidable levier de
              développement économique et social.
            </p>
            <p>
              Pourtant, de nombreux jeunes talents disposent de la motivation et des capacités nécessaires sans
              toujours avoir accès aux mêmes opportunités de formation. CYCLE Foundation souhaite contribuer à
              changer cette réalité.
            </p>
            <p className="text-white">Notre engagement consiste à soutenir prioritairement des étudiants souhaitant s&apos;orienter vers les métiers de :</p>
          </div>

          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {METIERS_IT.map((metier) => (
              <li
                key={metier}
                className="rounded-lg border border-[#d4af37]/25 bg-white/5 px-4 py-3 text-sm font-medium text-white"
              >
                {metier}
              </li>
            ))}
          </ul>

          <p className={`mt-8 text-base font-semibold ${GOLD_ON_DARK}`}>
            Parce que financer une formation, c&apos;est permettre à une compétence de devenir une expertise.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={<span className={GOLD_ON_LIGHT}>À l&apos;international</span>}
          title="Une action internationale"
          titleClassName="text-neutral-900"
        />
        <div className="mt-8 space-y-4 text-sm leading-relaxed text-neutral-600">
          <p>
            CYCLE Foundation souhaite développer son action au-delà des frontières et contribuer à l&apos;émergence
            d&apos;une nouvelle génération de professionnels de l&apos;IT sur le continent africain.
          </p>
          <p>
            Notre démarche s&apos;appuie notamment sur des partenariats avec des établissements et acteurs éducatifs
            en{" "}
            <span className="font-semibold text-neutral-900">
              République démocratique du Congo, à Abidjan et au Sénégal
            </span>
            .
          </p>
          <p>Ces partenariats ont vocation à permettre :</p>
        </div>

        <ol className="mt-8">
          {PARCOURS_INTERNATIONAL.map((etape, index) => {
            const isLast = index === PARCOURS_INTERNATIONAL.length - 1;
            return (
              <li key={etape} className={`relative flex items-center gap-3 ${isLast ? "" : "pb-8"}`}>
                {!isLast && (
                  <span
                    className="absolute top-7 bottom-0 left-3 w-1 rounded-full bg-border-subtle"
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-alt text-xs font-bold text-neutral-900">
                  {index + 1}
                </span>
                <span className="text-sm font-medium text-neutral-900">{etape}</span>
              </li>
            );
          })}
        </ol>

        <p className="mt-8 text-sm leading-relaxed text-neutral-600">
          Notre ambition est de construire progressivement un réseau permettant aux talents accompagnés de
          bénéficier d&apos;une ouverture internationale et de contribuer à leur tour au développement de leur
          environnement.
        </p>
      </section>

      <section style={DARK_SECTION_STYLE}>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            De l&apos;Afrique <span className={GOLD_ON_DARK}>au monde</span>
          </h2>

          <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="space-y-4 text-sm leading-relaxed text-white/80">
                <p>
                  Nous croyons profondément à la capacité du continent africain à devenir un acteur majeur de
                  l&apos;économie numérique mondiale.
                </p>
                <p>La transformation digitale crée de nouvelles opportunités dans tous les secteurs :</p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {SECTEURS_TRANSFORMES.map((secteur) => (
                  <span
                    key={secteur}
                    className="rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 px-3 py-1 text-xs font-medium text-[#f8e3a3]"
                  >
                    {secteur}
                  </span>
                ))}
              </div>

              <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/80">
                <p>Mais cette transformation nécessite avant tout des femmes et des hommes capables de la porter.</p>
                <p className="text-white">
                  C&apos;est pourquoi nous voulons investir dans les compétences plutôt que simplement répondre aux
                  besoins immédiats.
                </p>
                <p>Former un étudiant aujourd&apos;hui, c&apos;est potentiellement créer demain :</p>
              </div>

              <ul className="mt-6 flex flex-wrap gap-2">
                {METIERS_DE_DEMAIN.map((metier) => (
                  <li
                    key={metier}
                    className="rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 px-3.5 py-1.5 text-sm font-medium text-white"
                  >
                    {metier}
                  </li>
                ))}
              </ul>
            </div>

            <div className="overflow-hidden rounded-2xl ring-1 ring-[#d4af37]/40">
              <Image
                src="/images/cycle-fondation/afrique.webp"
                alt="Jeune eleve souriant devant un ordinateur, en uniforme scolaire, dans une salle de classe"
                width={1535}
                height={1024}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-alt">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center lg:text-left">
            <p className={`text-xs font-semibold uppercase tracking-wide ${GOLD_ON_LIGHT}`}>Notre vision</p>
            <h2 className="mt-2 text-3xl font-bold text-neutral-900 sm:text-4xl">Créer un cycle vertueux</h2>
          </div>

          <div className="mt-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex justify-center">
              <BoucleVertueuse steps={VISION_STEPS} gradientStops={GOLD_RING_STOPS} />
            </div>
            <div className="space-y-5 text-center text-sm leading-relaxed text-neutral-600 lg:text-left">
              <p>Notre philosophie s&apos;inscrit naturellement dans l&apos;ADN de CYCLE.</p>
              <p className="text-base font-semibold text-neutral-900">
                Recevoir une opportunité. La transformer en réussite. Puis donner à son tour une opportunité à
                quelqu&apos;un d&apos;autre.
              </p>
              <p className="text-base font-semibold text-neutral-900">
                C&apos;est le cycle que nous souhaitons construire.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={<span className={GOLD_ON_LIGHT}>Deux dimensions complémentaires</span>}
          title="Cycle Foundation & Cycle Consulting"
          titleClassName="text-neutral-900"
        />
        <div className="mt-8 space-y-4 text-sm leading-relaxed text-neutral-600">
          <p>
            CYCLE Foundation est portée par une conviction partagée avec CYCLE CONSULTING :{" "}
            <span className="font-semibold text-neutral-900">
              la performance durable repose avant tout sur les femmes et les hommes qui la rendent possible
            </span>
            .
          </p>
          <p>
            CYCLE CONSULTING agit auprès des entreprises pour accompagner leurs transformations. CYCLE Foundation agit
            auprès des talents pour contribuer à construire celles et ceux qui porteront les transformations de
            demain.
          </p>
          <p>Ces deux dimensions sont complémentaires.</p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border-subtle bg-surface p-6">
            <p className={`text-sm font-bold uppercase tracking-wide ${GOLD_ON_LIGHT}`}>Cycle Consulting</p>
            <p className="mt-2 text-base font-semibold text-neutral-900">Accompagner les entreprises.</p>
          </div>
          <div className="rounded-xl border border-border-subtle bg-surface p-6">
            <p className={`text-sm font-bold uppercase tracking-wide ${GOLD_ON_LIGHT}`}>Cycle Foundation</p>
            <p className="mt-2 text-base font-semibold text-neutral-900">Accompagner les talents.</p>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-[#d4af37]/30 bg-surface-alt p-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-anthracite-mist">Une même ambition</p>
          <p className={`mt-2 text-base font-semibold sm:text-lg ${GOLD_ON_LIGHT}`}>
            Créer de la valeur durable par la connaissance, la transmission et l&apos;engagement.
          </p>
        </div>
      </section>

      <section className="py-16" style={DARK_SECTION_STYLE}>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">Notre engagement</h2>
          <div className="mx-auto mt-6 max-w-2xl space-y-4 text-center text-sm leading-relaxed text-white/80">
            <p>Nous souhaitons inscrire notre action dans la durée.</p>
            <p>Notre objectif n&apos;est pas simplement de financer une année d&apos;études.</p>
            <p>Nous voulons progressivement construire un dispositif permettant de :</p>
          </div>
        </div>

        <BoucleVertueuse steps={ENGAGEMENT_STEPS} gradientStops={GOLD_RING_STOPS} labelColor="#ffffff" compact />

        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm leading-relaxed text-white/80">
            Chaque étudiant soutenu doit pouvoir devenir demain un acteur de son propre développement et,
            idéalement, un contributeur au développement des générations suivantes.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={<span className={GOLD_ON_LIGHT}>Devenez acteur du Cycle</span>}
          title="Le développement des talents est une responsabilité collective"
          titleClassName="text-neutral-900"
          description="Entreprises, écoles, professionnels de l'IT, associations et particuliers peuvent contribuer à cette dynamique."
        />

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {ACTEURS_DU_CYCLE.map((acteur) => (
            <div key={acteur.audience} className="rounded-xl border border-border-subtle bg-surface p-6">
              <p className="text-base font-bold text-neutral-900">{acteur.audience}</p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{acteur.reponse}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={DARK_SECTION_STYLE}>
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <p className={`text-sm font-semibold uppercase tracking-wide ${GOLD_ON_DARK}`}>Notre promesse</p>
          <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
            Un talent ne devrait jamais être limité par l&apos;absence d&apos;opportunité.
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-white/80">
            CYCLE Foundation souhaite contribuer, à son échelle, à faire de l&apos;éducation et de la technologie des
            leviers d&apos;émancipation, de développement et de coopération internationale.
          </p>
          <p className="mt-6 text-base leading-relaxed font-semibold text-white">
            Identifier les talents d&apos;aujourd&apos;hui.
            <br />
            Former les experts de demain.
            <br />
            Construire ensemble l&apos;avenir numérique.
          </p>

          <p className="mt-10 text-lg font-bold tracking-wide text-white">CYCLE FOUNDATION</p>
          <p className="mt-2 text-sm font-semibold">
            <span className={GOLD_ON_DARK}>Apprendre</span>
            <span className={`mx-1.5 font-bold ${GOLD_ON_DARK}`}>&gt;</span>
            <span className={GOLD_ON_DARK}>Comprendre</span>
            <span className={`mx-1.5 font-bold ${GOLD_ON_DARK}`}>&gt;</span>
            <span className={GOLD_ON_DARK}>Entreprendre</span>
            <span className={`mx-1.5 font-bold ${GOLD_ON_DARK}`}>&gt;</span>
            <span className={GOLD_ON_DARK}>Transmettre</span>
          </p>

          <Link
            href="/contact"
            className="mt-10 inline-block w-full rounded-md bg-gradient-to-r from-[#f8e3a3] via-[#d4af37] to-[#9c7a2c] px-6 py-3 text-center text-sm font-bold text-[#241b0d] transition hover:brightness-110 sm:w-auto"
          >
            Nous contacter
          </Link>
        </div>
      </section>
    </>
  );
}
