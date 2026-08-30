import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Breadcrumb from "@/components/ui/Breadcrumb";

// Brand gradient, dark variant — for accents on light sections.
const GRADIENT_DARK = "bg-gradient-to-r from-[#fa11f7] via-[#132bdd] to-[#0bceff] bg-clip-text text-transparent";
// Brand gradient, light variant — for accents on dark sections.
const GRADIENT_LIGHT = "bg-gradient-to-r from-[#f77bf0] via-[#6f8cf5] to-[#7ef0ff] bg-clip-text text-transparent";

export const metadata: Metadata = {
  title: "Formations | Cycle Consulting",
  description:
    "Montez en compétence sur les outils Microsoft (Office, O365) et les processus Cycle Forms avec les Consultants Cycle Consulting.",
};

const PROGRAMMES = [
  {
    title: "Performance numérique et maîtrise des outils Microsoft",
    intro:
      "La maîtrise des outils collaboratifs et décisionnels constitue aujourd'hui un prérequis essentiel à l'efficacité opérationnelle. Cycle Consulting propose des formations complètes sur l'ensemble de l'environnement Microsoft Office afin de permettre aux collaborateurs de gagner en productivité, de fiabiliser leurs analyses et d'améliorer leur communication.",
    items: [
      "Microsoft Word",
      "Microsoft Excel (de l'initiation aux fonctions avancées)",
      "Microsoft PowerPoint",
      "Microsoft Power BI",
      "Microsoft Teams",
      "OneDrive",
      "OneNote",
    ],
    outro:
      "Au-delà de l'apprentissage technique, nos formations développent les bonnes pratiques permettant d'exploiter pleinement les données, d'automatiser les processus et de produire des tableaux de bord facilitant la prise de décision.",
  },
  {
    title: "Leadership et Management",
    intro:
      "Les transformations des organisations imposent une évolution profonde des pratiques managériales. Le manager d'aujourd'hui est avant tout un facilitateur, un leader capable de mobiliser les équipes, d'accompagner le changement et de développer l'intelligence collective. Les formations Management de Cycle Consulting permettent de renforcer les compétences indispensables pour :",
    items: [
      "développer un leadership inspirant",
      "piloter la performance collective",
      "conduire le changement",
      "accompagner les transformations organisationnelles",
      "renforcer la communication managériale",
      "gérer les situations complexes et les conflits",
      "développer l'engagement et la montée en compétences des équipes",
    ],
    outro:
      "Nos programmes s'adressent aussi bien aux managers de proximité qu'aux cadres dirigeants souhaitant faire évoluer leurs pratiques vers un management plus agile, collaboratif et orienté résultats.",
  },
  {
    title: "ITIL® : faire de l'IT un moteur de création de valeur",
    intro:
      "La Direction des Systèmes d'Information est aujourd'hui un acteur stratégique de la performance de l'entreprise. Les formations ITIL® proposées par Cycle Consulting permettent aux équipes IT de maîtriser les meilleures pratiques internationales en matière de gestion des services numériques. Nos programmes couvrent notamment :",
    items: [
      "les fondamentaux d'ITIL",
      "la gestion des services",
      "l'amélioration continue",
      "la gouvernance des processus",
      "l'expérience utilisateur",
      "l'optimisation de la performance opérationnelle",
    ],
    outro:
      "Ces formations s'adressent aux responsables de production, Service Delivery Managers, responsables d'exploitation, chefs de projets, équipes support et plus largement à tous les acteurs impliqués dans la qualité des services numériques.",
  },
  {
    title: "PRINCE2® : piloter les projets avec méthode et maîtrise",
    intro:
      "La réussite d'un projet repose autant sur la qualité de sa gouvernance que sur la maîtrise de son exécution. Les formations PRINCE2® dispensées par Cycle Consulting permettent aux chefs de projets, PMO, managers et responsables de programmes d'acquérir une méthode internationalement reconnue pour structurer, piloter et sécuriser leurs projets. Nos formations permettent notamment de :",
    items: [
      "définir une gouvernance claire",
      "maîtriser les risques",
      "piloter les coûts, les délais et la qualité",
      "renforcer la prise de décision",
      "améliorer la communication entre les parties prenantes",
      "garantir un pilotage orienté résultats",
    ],
  },
];

const MODALITES = [
  "Formations inter-entreprises",
  "Formations intra-entreprise",
  "Parcours personnalisés",
  "Accompagnement individuel",
  "Ateliers pratiques",
  "Classes virtuelles",
  "Présentiel ou à distance",
];

function CheckMark() {
  return (
    <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-[#132bdd]" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="currentColor" opacity={0.12} />
      <path d="m6 10.2 2.6 2.6L14.2 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function FormationsPage() {
  return (
    <>
      <PageHero
        eyebrow={<span className={GRADIENT_LIGHT}>Formations</span>}
        title={<>Façonner les compétences qui <span className={GRADIENT_LIGHT}>accélèrent la transformation</span> des entreprises</>}
        titleClassName="mt-3 max-w-4xl text-2xl font-bold text-white sm:text-3xl lg:text-4xl xl:text-5xl"
        description="L'excellence au service du développement des talents."
      >
        <div className="mt-8">
          <Breadcrumb items={["Apprendre", "Comprendre", "Entreprendre"]} />
        </div>
      </PageHero>

      <section className="bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-lg leading-relaxed font-medium text-anthracite sm:text-xl">
            Dans un monde où les transformations technologiques, organisationnelles et managériales
            s&apos;accélèrent, la capacité d&apos;une entreprise à développer les compétences de ses collaborateurs
            est devenue un facteur déterminant de compétitivité, d&apos;innovation et de performance durable.
          </p>
          <div className="mt-8 space-y-5 text-sm leading-relaxed text-anthracite-soft sm:text-base">
            <p>
              Chez Cycle Consulting, nous faisons de la formation un levier stratégique de transformation. En tant
              qu&apos;Entreprise de Services du Numérique (ESN), nous accompagnons les organisations dans le
              développement des savoir-faire qui répondent aux enjeux d&apos;aujourd&apos;hui et anticipent ceux de
              demain.
            </p>
            <p>
              Notre approche dépasse la simple transmission de connaissances. Nous concevons des parcours de
              formation qui permettent aux collaborateurs d&apos;acquérir des compétences immédiatement
              opérationnelles, de renforcer leur capacité d&apos;adaptation et de contribuer activement à la
              création de valeur au sein de leur organisation.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pt-8 pb-16 sm:pt-10 sm:px-6 lg:px-8">
        <h2 className="text-center text-xl font-bold text-anthracite sm:text-2xl lg:text-3xl">
          Des formations conçues pour répondre aux{" "}
          <span className={`whitespace-nowrap ${GRADIENT_DARK}`}>défis de l&apos;entreprise moderne</span>
        </h2>

        <div className="mt-14 space-y-14 sm:space-y-16">
          {PROGRAMMES.map((programme) => (
            <div key={programme.title} className="flex gap-6 sm:gap-8">
              <span className="w-1.5 shrink-0 self-stretch rounded-full bg-gradient-to-b from-[#fa11f7] via-[#132bdd] to-[#0bceff]" />
              <div>
                <h3 className="text-lg font-bold text-anthracite sm:text-xl">{programme.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-anthracite-soft">{programme.intro}</p>
                <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                  {programme.items.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-anthracite-soft">
                      <CheckMark />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {programme.outro && (
                  <p className="mt-4 text-sm leading-relaxed text-anthracite-soft">{programme.outro}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-chiffres-section">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Une pédagogie tournée vers{" "}
            <span className={`whitespace-nowrap ${GRADIENT_LIGHT}`}>l&apos;excellence opérationnelle</span>
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/80">
            <p>
              Chez Cycle Consulting, la qualité de la formation repose avant tout sur l&apos;expérience de nos
              intervenants. Nos formateurs sont des consultants, managers, chefs de projets et experts techniques
              qui accompagnent quotidiennement des entreprises dans leurs projets de transformation,
              d&apos;optimisation des processus et d&apos;amélioration de la performance.
            </p>
            <p>
              Cette double expertise, à la fois opérationnelle et pédagogique, garantit des formations concrètes,
              illustrées par des retours d&apos;expérience, des études de cas et des mises en situation directement
              inspirées des réalités du terrain.
            </p>
            <p>
              Chaque parcours est conçu pour favoriser l&apos;appropriation des connaissances, développer les
              compétences pratiques et faciliter leur mise en œuvre immédiate.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl font-bold text-anthracite sm:text-3xl">
              Une offre de formation{" "}
              <span className={`whitespace-nowrap ${GRADIENT_DARK}`}>adaptée aux exigences</span> des entreprises
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-anthracite-soft">
              Parce que les besoins diffèrent selon les organisations, Cycle Consulting propose des modalités
              d&apos;accompagnement flexibles :
            </p>
            <p className="mt-4 text-sm leading-relaxed text-anthracite-soft">
              Notre ambition est d&apos;offrir une expérience d&apos;apprentissage exigeante, efficace et
              parfaitement alignée avec les objectifs opérationnels de nos clients.
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {MODALITES.map((modalite) => (
              <li
                key={modalite}
                className="flex items-center gap-2.5 rounded-lg border border-border-subtle bg-surface px-4 py-3 text-sm font-medium text-anthracite-soft"
              >
                <CheckMark />
                {modalite}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-callout-light">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-anthracite sm:text-3xl">
            Former les talents qui construiront{" "}
            <span className={`whitespace-nowrap ${GRADIENT_DARK}`}>l&apos;entreprise de demain</span>
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-anthracite-soft">
            <p>
              La transformation numérique ne repose pas uniquement sur les technologies. Elle repose avant tout sur
              les femmes et les hommes qui les conçoivent, les pilotent et les font évoluer.
            </p>
            <p>
              Chez Cycle Consulting, nous sommes convaincus que la formation est un investissement stratégique, au
              service de la croissance, de l&apos;excellence opérationnelle et de la transformation durable des
              organisations.
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
    </>
  );
}
