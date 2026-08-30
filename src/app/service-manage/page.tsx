import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";

// Brand gradient, dark variant — for accents on light sections.
const GRADIENT_DARK = "bg-gradient-to-r from-[#fa11f7] via-[#132bdd] to-[#0bceff] bg-clip-text text-transparent";
// Brand gradient, light variant — for accents on dark sections.
const GRADIENT_LIGHT = "bg-gradient-to-r from-[#f77bf0] via-[#6f8cf5] to-[#7ef0ff] bg-clip-text text-transparent";

export const metadata: Metadata = {
  title: "Service Managé | Cycle Consulting",
  description:
    "Service Delivery, infogérance et veille technologique : pilotez votre entreprise avec les meilleurs outils grâce aux Consultants Cycle Consulting.",
};

const DOMAINES = [
  {
    title: "Une expertise au cœur de vos environnements IT",
    intro:
      "Les techniciens OSS de Cycle Consulting interviennent sur l'ensemble du cycle de vie du poste de travail et des services associés afin d'assurer un fonctionnement optimal de votre environnement numérique. Nos prestations couvrent notamment :",
    items: [
      "Assistance et support de proximité auprès des utilisateurs",
      "Gestion des incidents et des demandes de services",
      "Préparation, intégration et déploiement des postes de travail",
      "Installation, configuration et maintenance des équipements informatiques",
      "Gestion des périphériques et des équipements mobiles",
      "Accompagnement des utilisateurs lors des évolutions technologiques",
      "Support VIP et Comités de Direction",
      "Gestion des salles de réunion et équipements audiovisuels",
      "Inventaire, traçabilité et gestion du parc informatique",
      "Renouvellement des équipements et campagnes de migration",
      "Respect des engagements contractuels (SLA) et amélioration continue des performances",
    ],
    outro:
      "Chaque intervention est réalisée dans le respect des processus ITSM et des exigences opérationnelles propres à nos clients.",
  },
  {
    title: "Des compétences techniques reconnues",
    intro:
      "Nos techniciens disposent d'une solide expertise sur les principaux environnements technologiques du marché et interviennent dans des contextes exigeants, allant des PME aux grands groupes internationaux.",
    outro:
      "Leur expertise technique est continuellement renforcée par des programmes de formation et de montée en compétences afin d'accompagner les évolutions des technologies et des usages.",
  },
  {
    title: "Une organisation pensée pour les services managés",
    intro:
      "Nos dispositifs OSS s'intègrent pleinement dans votre modèle opérationnel. En collaboration avec vos équipes internes, vos centres de services ou vos partenaires, nos collaborateurs appliquent vos processus et vos standards de qualité afin d'assurer une parfaite continuité de service. Notre accompagnement comprend notamment :",
    items: [
      "le pilotage opérationnel des prestations",
      "le suivi des indicateurs de performance (KPI et SLA)",
      "la production de tableaux de bord",
      "les revues de service régulières",
      "les plans d'amélioration continue",
      "la gestion des capacités et de l'activité",
      "l'accompagnement des projets de transformation",
    ],
    outro: "Cette gouvernance garantit un haut niveau de qualité, de transparence et d'engagement sur les résultats.",
  },
  {
    title: "Un partenaire de confiance pour vos transformations numériques",
    intro:
      "Les projets de modernisation des environnements de travail nécessitent des équipes capables d'accompagner les utilisateurs tout au long du changement. Les techniciens OSS de Cycle Consulting participent activement aux projets de :",
    items: [
      "migration vers Windows et Microsoft 365",
      "renouvellement des postes de travail",
      "déploiement de nouveaux outils collaboratifs",
      "digitalisation des espaces de travail",
      "déménagements et réorganisations de sites",
      "intégration de nouveaux collaborateurs",
      "campagnes de renouvellement matériel",
    ],
    outro:
      "Grâce à leur présence sur le terrain, ils facilitent l'adoption des nouveaux usages et sécurisent chaque étape des projets de transformation.",
  },
];

const POURQUOI = [
  "Des équipes rigoureusement sélectionnées et certifiées",
  "Une expertise reconnue des environnements utilisateurs",
  "Une forte culture de la qualité de service",
  "Une gouvernance orientée performance et amélioration continue",
  "Une capacité à adapter rapidement les ressources aux besoins de nos clients",
  "Un accompagnement personnalisé fondé sur la proximité, l'excellence opérationnelle et la confiance",
];

function CheckMark() {
  return (
    <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-[#132bdd]" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="currentColor" opacity={0.12} />
      <path d="m6 10.2 2.6 2.6L14.2 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ServiceManagePage() {
  return (
    <>
      <PageHero
        eyebrow={<span className={GRADIENT_LIGHT}>Service Managé</span>}
        title={<>Des experts de proximité au service de <span className={GRADIENT_LIGHT}>votre performance</span> opérationnelle</>}
        titleClassName="mt-3 max-w-4xl text-2xl font-bold text-white sm:text-3xl lg:text-4xl xl:text-5xl"
        description="L'excellence des services managés sur site."
      />

      <section className="bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-lg leading-relaxed font-medium text-anthracite sm:text-xl">
            Dans un environnement où la continuité des activités repose sur la disponibilité des systèmes
            d&apos;information, la qualité du support informatique est devenue un enjeu stratégique.
          </p>
          <div className="mt-8 space-y-5 text-sm leading-relaxed text-anthracite-soft sm:text-base">
            <p>
              Chez Cycle Consulting, nous accompagnons les entreprises dans l&apos;exploitation de leurs
              infrastructures numériques grâce à des prestations de Services Managés reposant sur des équipes de
              techniciens On-Site Support (OSS) hautement qualifiés.
            </p>
            <p>
              Bien plus que des intervenants techniques, nos collaborateurs sont les ambassadeurs de votre
              Direction des Systèmes d&apos;Information. Présents au plus près des utilisateurs, ils garantissent
              la continuité de service, renforcent l&apos;expérience utilisateur et contribuent directement à la
              performance de votre organisation.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pt-8 pb-16 sm:pt-10 sm:px-6 lg:px-8">
        <h2 className="text-center text-xl font-bold text-anthracite sm:text-2xl lg:text-3xl">
          Un support de proximité{" "}
          <span className={`whitespace-nowrap ${GRADIENT_DARK}`}>au service de vos utilisateurs</span>
        </h2>

        <div className="mt-14 space-y-14 sm:space-y-16">
          {DOMAINES.map((domaine) => (
            <div key={domaine.title} className="flex gap-6 sm:gap-8">
              <span className="w-1.5 shrink-0 self-stretch rounded-full bg-gradient-to-b from-[#fa11f7] via-[#132bdd] to-[#0bceff]" />
              <div>
                <h3 className="text-lg font-bold text-anthracite sm:text-xl">{domaine.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-anthracite-soft">{domaine.intro}</p>
                {domaine.items && (
                  <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                    {domaine.items.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-anthracite-soft">
                        <CheckMark />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <p className="mt-4 text-sm leading-relaxed text-anthracite-soft">{domaine.outro}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-chiffres-section">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Une approche orientée <span className={GRADIENT_LIGHT}>expérience utilisateur</span>
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/80">
            <p>
              La qualité d&apos;un service managé ne se mesure pas uniquement à la rapidité de résolution des
              incidents. Elle repose également sur la qualité de la relation avec les utilisateurs.
            </p>
            <p>
              Chez Cycle Consulting, nous accordons une importance particulière aux compétences comportementales
              de nos équipes. Nos techniciens sont sélectionnés pour leur capacité à écouter et comprendre les
              besoins des utilisateurs, communiquer avec pédagogie, faire preuve de réactivité et de
              professionnalisme, gérer les situations critiques avec calme et efficacité, et représenter
              l&apos;image de votre entreprise avec discrétion et excellence.
            </p>
            <p>
              Cette proximité favorise l&apos;adoption des outils numériques, améliore la satisfaction des
              utilisateurs et contribue à une meilleure performance globale des services informatiques.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl font-bold text-anthracite sm:text-3xl">
              Pourquoi choisir <span className={GRADIENT_DARK}>Cycle Consulting ?</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-anthracite-soft">
              Choisir Cycle Consulting, c&apos;est faire le choix d&apos;un partenaire engagé dans la réussite de
              vos opérations. Nous nous distinguons par :
            </p>
            <p className="mt-4 text-sm leading-relaxed text-anthracite-soft">
              Notre objectif est simple : permettre à vos collaborateurs de travailler dans les meilleures
              conditions, tout en garantissant la disponibilité, la sécurité et la performance de votre
              environnement informatique.
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
            Votre partenaire <span className={GRADIENT_DARK}>des services managés</span>
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-anthracite-soft">
            <p>
              Chez Cycle Consulting, nous considérons que le support de proximité est un élément essentiel de la
              chaîne de valeur des services numériques.
            </p>
            <p>
              En mettant à votre disposition des techniciens qualifiés, engagés et orientés satisfaction
              utilisateur, nous contribuons à renforcer la résilience de vos opérations, à optimiser votre
              performance et à accompagner durablement votre transformation numérique.
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
