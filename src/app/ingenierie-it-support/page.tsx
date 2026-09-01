import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Breadcrumb from "@/components/ui/Breadcrumb";
import MarketTicker from "@/components/ui/MarketTicker";
import RelatedExpertises from "@/components/ui/RelatedExpertises";
import { GraduationCapIcon, GearIcon, HeadsetIcon } from "@/components/icons/card-icons";
import JsonLd from "@/components/seo/JsonLd";
import { serviceJsonLd } from "@/lib/site";
import { getPoleBySlug } from "@/data/poles";

const pole = getPoleBySlug("ingenierie-it-support")!;

// Brand gradient, dark variant — for accents on light sections.
const GRADIENT_DARK = "bg-gradient-to-r from-[#fa11f7] via-[#132bdd] to-[#0bceff] bg-clip-text text-transparent";
// Brand gradient, light variant — for accents on dark sections.
const GRADIENT_LIGHT = "bg-gradient-to-r from-[#f77bf0] via-[#6f8cf5] to-[#7ef0ff] bg-clip-text text-transparent";

export const metadata: Metadata = {
  title: "Ingénierie & IT Support | Cycle Consulting",
  description:
    "OSS, IT Support et Ingénierie IT : des consultants qualifiés pour renforcer vos équipes techniques et vos infrastructures.",
};

const EXPERTISES = [
  {
    title: "Une expertise au service des organisations les plus exigeantes",
    intro:
      "Les consultants de Cycle Consulting interviennent au cœur des dispositifs d'infogérance afin de garantir la performance globale des services numériques. Ils apportent leur expertise sur des missions à forte responsabilité telles que :",
    items: [
      "Gouvernance des services IT",
      "Pilotage des contrats d'infogérance",
      "Direction des opérations informatiques",
      "Management des centres de services",
      "Pilotage de la production informatique",
      "Gestion des engagements de services (SLA, KPI, OLA)",
      "Transformation des organisations IT",
      "Optimisation des processus ITSM",
      "Amélioration continue des performances",
      "Accompagnement des programmes de transformation",
    ],
    outro:
      "Notre objectif est de permettre aux organisations de disposer d'une gouvernance efficace, agile et alignée sur leurs enjeux métiers.",
  },
  {
    title: "Des profils seniors pour accompagner les décisions stratégiques",
    intro:
      "La qualité d'une prestation d'infogérance repose avant tout sur la capacité des femmes et des hommes qui la pilotent. Cycle Consulting sélectionne des consultants reconnus pour leur expérience, leur vision stratégique et leur maîtrise des environnements complexes. Nos expertises couvrent notamment les fonctions de :",
    items: [
      "Chef de Projet Infrastructure et Production",
      "Service Delivery Manager (SDM)",
      "Delivery Manager (DM)",
      "Responsable de Production Informatique",
      "Responsable de Centre de Services",
      "Incident Manager",
      "Problem Manager",
      "Transition Manager",
      "Responsable d'Exploitation",
      "Directeur des Opérations IT",
      "Directeur de Centre de Services",
      "Directeur de Programme",
    ],
    outro:
      "Ces profils disposent d'une solide expérience acquise auprès de grands groupes nationaux et internationaux, dans des environnements exigeants où la qualité de service et la maîtrise des risques constituent des enjeux majeurs.",
  },
  {
    title: "Une gouvernance orientée performance",
    intro:
      "Chez Cycle Consulting, nous sommes convaincus que la performance d'un dispositif d'infogérance ne se limite pas au respect des indicateurs contractuels. Elle repose sur une gouvernance proactive, une capacité d'anticipation et une amélioration continue des services. Nos consultants accompagnent leurs clients dans :",
    items: [
      "la définition des indicateurs de performance",
      "le pilotage des engagements contractuels",
      "l'animation des comités opérationnels et stratégiques",
      "la gestion des risques et des plans d'actions",
      "le suivi des plans de progrès",
      "l'optimisation des coûts d'exploitation",
      "la coordination des partenaires et fournisseurs",
      "la conduite des transformations organisationnelles",
    ],
    outro:
      "Ils interviennent comme de véritables partenaires de confiance auprès des décideurs afin de garantir une prise de décision rapide, pertinente et durable.",
  },
  {
    title: "Une culture du résultat",
    intro:
      "Chez Cycle Consulting, nous considérons que la réussite d'une mission se mesure avant tout par les résultats obtenus. Nos consultants interviennent avec une exigence permanente de performance. Ils s'engagent à :",
    items: [
      "améliorer la qualité de service",
      "renforcer la satisfaction des utilisateurs",
      "optimiser les coûts d'exploitation",
      "sécuriser les engagements contractuels",
      "accroître l'efficacité opérationnelle",
      "accompagner durablement les transformations",
    ],
    outro:
      "Chaque mission est pilotée avec des objectifs clairs, des indicateurs mesurables et une démarche d'amélioration continue permettant de générer une valeur tangible pour nos clients.",
  },
];

const POURQUOI = [
  "Une parfaite maîtrise des métiers de l'infogérance",
  "Des consultants seniors disposant d'une forte expérience opérationnelle et managériale",
  "Une culture du conseil associée à une forte orientation résultats",
];

function CheckMark() {
  return (
    <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-[#132bdd]" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="currentColor" opacity={0.12} />
      <path d="m6 10.2 2.6 2.6L14.2 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function IngenierieItSupportPage() {
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
        eyebrow={<span className={GRADIENT_LIGHT}>Ingénierie &amp; IT Support</span>}
        title={<><span className={GRADIENT_LIGHT}>Piloter la performance</span> des services numériques avec une expertise de haut niveau</>}
        titleClassName="mt-3 text-2xl font-bold text-balance text-white sm:text-3xl xl:text-[1.9rem] xl:leading-[1.2]"
        description="Conseil en Infogérance & Gouvernance des Services IT."
        image="/images/offres/ingenierie-it-support-dark.webp"
        imageAlt={pole.imageAlt}
        imageSide="right"
        tint="#122130"
        caption="Run"
        captionColor="green"
        badges={[
          { icon: <HeadsetIcon className="h-full w-full" tone="light" />, label: "Ingénierie" },
          { icon: <GearIcon className="h-full w-full" tone="light" />, label: "Gouvernance" },
          { icon: <GraduationCapIcon className="h-full w-full" tone="light" />, label: "Performance" },
        ]}
        cta={
          <Link
            href="#expertises"
            className="cta-primary cta-primary-light inline-block w-full rounded-md px-6 py-3 text-center text-sm font-bold sm:w-auto"
          >
            Découvrir nos expertises
          </Link>
        }
      >
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
          <Breadcrumb
            items={["Apprendre", "Comprendre", <span key="e" className={`font-semibold ${GRADIENT_LIGHT}`}>Entreprendre</span>]}
          />
          <MarketTicker />
        </div>
      </PageHero>

      <section className="bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-lg leading-relaxed font-medium text-anthracite sm:text-xl">
            Dans un contexte où les systèmes d&apos;information constituent le socle de la performance des
            entreprises, l&apos;infogérance ne peut plus être considérée comme une simple prestation
            d&apos;exploitation.
          </p>
          <div className="mt-8 space-y-5 text-sm leading-relaxed text-anthracite-soft sm:text-base">
            <p>
              Elle est devenue un levier stratégique permettant d&apos;améliorer la qualité des services, de
              maîtriser les coûts, de sécuriser les engagements contractuels et d&apos;accompagner durablement la
              transformation numérique des organisations.
            </p>
            <p>
              Chez Cycle Consulting, nous mettons à disposition des entreprises des consultants seniors spécialisés
              en infogérance, capables d&apos;intervenir sur les dimensions stratégiques, organisationnelles et
              opérationnelles des services IT. Nos experts accompagnent les Directions des Systèmes
              d&apos;Information, les Directions des Opérations et les Directions Générales dans le pilotage de
              leurs activités critiques, avec une approche orientée gouvernance, excellence opérationnelle et
              création de valeur.
            </p>
          </div>
        </div>
      </section>

      <section id="expertises" className="mx-auto max-w-5xl scroll-mt-24 px-4 pt-8 pb-16 sm:pt-10 sm:px-6 lg:px-8">
        <h2 className="text-center text-xl font-bold text-anthracite sm:text-2xl lg:text-3xl">
          Une gouvernance IT{" "}
          <span className={`whitespace-nowrap ${GRADIENT_DARK}`}>au service de vos ambitions</span>
        </h2>

        <div className="mt-14 space-y-14 sm:space-y-16">
          {EXPERTISES.map((expertise) => (
            <div key={expertise.title} className="flex gap-6 sm:gap-8">
              <span className="w-1.5 shrink-0 self-stretch rounded-full bg-gradient-to-b from-[#fa11f7] via-[#132bdd] to-[#0bceff]" />
              <div>
                <h3 className="text-lg font-bold text-anthracite sm:text-xl">{expertise.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-anthracite-soft">{expertise.intro}</p>
                <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                  {expertise.items.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-anthracite-soft">
                      <CheckMark />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm leading-relaxed text-anthracite-soft">{expertise.outro}</p>
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
            Un accompagnement fondé sur <span className={GRADIENT_LIGHT}>la proximité et la confiance</span>
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/80">
            <p>
              Chez Cycle Consulting, nous privilégions une relation de proximité avec chacun de nos clients. Nos
              consultants ne se contentent pas de piloter une prestation : ils s&apos;intègrent pleinement à votre
              organisation, comprennent vos enjeux et s&apos;investissent dans l&apos;atteinte de vos objectifs.
            </p>
            <p>
              Cette proximité leur permet d&apos;anticiper les évolutions de vos besoins, de proposer des solutions
              pragmatiques et innovantes, de faciliter les échanges entre les équipes métiers et IT,
              d&apos;accompagner efficacement les projets de transformation et de garantir une amélioration
              continue de la qualité de service.
            </p>
            <p>
              Notre ambition est de construire des partenariats durables fondés sur la confiance, la transparence
              et l&apos;engagement.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl font-bold text-anthracite sm:text-3xl">
              Pourquoi choisir <span className={GRADIENT_LIGHT}>Cycle Consulting ?</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-anthracite-soft">
              Notre différence réside dans la combinaison de trois expertises complémentaires :
            </p>
            <p className="mt-4 text-sm leading-relaxed text-anthracite-soft">
              Nos équipes interviennent aussi bien pour renforcer vos dispositifs existants que pour piloter des
              programmes de transformation complexes, dans une logique de partenariat à long terme. Parce que les
              enjeux des Directions Informatiques dépassent aujourd&apos;hui la seule dimension technique, nous
              apportons une vision globale, capable d&apos;aligner les services numériques avec les ambitions
              stratégiques de votre entreprise.
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-3">
            {POURQUOI.map((raison) => (
              <li
                key={raison}
                className="flex items-center gap-2.5 rounded-lg border border-border-subtle bg-surface px-4 py-3 text-sm font-medium text-anthracite-soft"
              >
                <CheckMark />
                {raison}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-callout-light">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-anthracite sm:text-3xl">
            Le partenaire <span className={GRADIENT_LIGHT}>de vos opérations stratégiques</span>
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-anthracite-soft">
            <p>
              Les organisations performantes s&apos;appuient sur une gouvernance solide, des processus maîtrisés et
              des femmes et des hommes capables de transformer les défis opérationnels en leviers de croissance.
            </p>
            <p>
              Chez Cycle Consulting, nos consultants en infogérance mettent leur expérience, leur leadership et
              leur expertise au service de vos ambitions. Nous accompagnons les entreprises dans le pilotage de
              leurs opérations critiques avec une seule exigence : garantir une performance durable, sécuriser les
              engagements et créer les conditions d&apos;une transformation maîtrisée.
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

      <RelatedExpertises currentSlug="ingenierie-it-support" />
    </>
  );
}
