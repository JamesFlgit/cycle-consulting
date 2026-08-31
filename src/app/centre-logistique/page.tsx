import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Breadcrumb from "@/components/ui/Breadcrumb";
import RelatedExpertises from "@/components/ui/RelatedExpertises";
import { GearIcon, HeadsetIcon, PackageIcon } from "@/components/icons/card-icons";

// Brand gradient, dark variant — for accents on light sections.
const GRADIENT_DARK = "bg-gradient-to-r from-[#fa11f7] via-[#132bdd] to-[#0bceff] bg-clip-text text-transparent";
// Brand gradient, light variant — for accents on dark sections.
const GRADIENT_LIGHT = "bg-gradient-to-r from-[#f77bf0] via-[#6f8cf5] to-[#7ef0ff] bg-clip-text text-transparent";

export const metadata: Metadata = {
  title: "Centre Logistique | Cycle Consulting",
  description:
    "Stockage, livraison et expertises métiers : Cycle Consulting gère votre logistique IT de bout en bout.",
};

const DOMAINES = [
  {
    title: "Une maîtrise complète du cycle de vie des équipements IT",
    intro:
      "Notre Centre de Services Logistiques prend en charge l'ensemble des opérations nécessaires à la gestion de vos actifs informatiques. Nos équipes interviennent sur toutes les étapes du cycle de vie de vos équipements :",
    items: [
      "Réception et contrôle qualité des matériels",
      "Gestion des stocks et des actifs IT",
      "Entreposage sécurisé des équipements",
      "Préparation des commandes et des kits utilisateurs",
      "Gestion des inventaires et de la traçabilité",
      "Conditionnement et expédition",
      "Logistique retour (Reverse Logistics)",
      "Gestion des renouvellements de parc",
      "Reconditionnement et recyclage des équipements",
    ],
    outro:
      "Grâce à des processus industrialisés et des outils de pilotage performants, nous garantissons une gestion fiable, sécurisée et parfaitement adaptée aux exigences de nos clients.",
  },
  {
    title: "Une logistique nationale et internationale",
    intro:
      "Parce que les entreprises évoluent dans des environnements de plus en plus distribués, Cycle Consulting assure la préparation et l'expédition des équipements informatiques en France comme à l'international. Notre organisation logistique permet de répondre aux besoins des entreprises disposant d'un ou de plusieurs sites, tout en garantissant :",
    items: [
      "des délais de livraison maîtrisés",
      "un suivi complet des expéditions",
      "une traçabilité de bout en bout",
      "une coordination avec les équipes locales",
      "une qualité de service homogène sur l'ensemble des sites",
    ],
    outro:
      "Qu'il s'agisse d'un déploiement de masse, d'une ouverture de site ou d'un besoin ponctuel, nos équipes assurent une exécution fluide et sécurisée de chaque opération.",
  },
  {
    title: "Une expertise reconnue en intégration industrielle",
    intro:
      "L'industrialisation des postes de travail constitue l'un des piliers de notre savoir-faire. Notre Centre de Services prépare chaque équipement avant son déploiement afin de garantir une mise en service rapide, standardisée et conforme aux référentiels de nos clients. Nos prestations comprennent notamment :",
    items: [
      "intégration industrielle des postes de travail",
      "installation des systèmes d'exploitation",
      "déploiement des images master clients",
      "intégration des applications métiers",
      "configuration des postes selon les standards de sécurité",
      "personnalisation des environnements utilisateurs",
      "contrôle qualité avant expédition",
      "validation fonctionnelle des équipements",
    ],
    outro:
      "Cette approche permet de réduire significativement les délais de déploiement, d'améliorer la qualité des installations et de limiter les interventions sur site.",
  },
  {
    title: "Un service après-vente performant",
    intro:
      "La continuité des activités nécessite un traitement rapide et efficace des équipements défectueux. Cycle Consulting dispose d'un atelier dédié au Service Après-Vente (SAV), capable de prendre en charge les opérations de diagnostic, de réparation, de reconditionnement et de remise en service des matériels informatiques.",
    items: [
      "le diagnostic des pannes",
      "la réparation des équipements",
      "le remplacement des composants",
      "les tests de conformité",
      "le reconditionnement des matériels",
      "la gestion des garanties constructeurs",
      "le suivi des retours fournisseurs",
      "la remise en stock ou la réexpédition des équipements",
    ],
    outro:
      "Notre objectif est de prolonger le cycle de vie des actifs informatiques tout en garantissant leur disponibilité opérationnelle.",
  },
  {
    title: "Une organisation industrielle au service de vos projets",
    intro: "Notre Centre de Services Logistiques intervient en support des projets les plus exigeants :",
    items: [
      "déploiement de nouveaux postes de travail",
      "renouvellement de parc informatique",
      "projets de migration Windows et Microsoft 365",
      "intégration de nouveaux collaborateurs",
      "ouvertures et fermetures de sites",
      "opérations de fusion ou d'acquisition",
      "campagnes de remplacement de matériels",
      "projets internationaux de transformation numérique",
    ],
    outro:
      "Grâce à une organisation industrielle éprouvée, nous sommes en mesure d'absorber des volumes importants tout en garantissant un haut niveau de qualité et de réactivité.",
  },
];

const QUALITE = [
  "Une traçabilité complète des actifs",
  "Un contrôle qualité systématique",
  "Le respect des procédures clients",
  "La sécurisation des données et des équipements",
  "Une amélioration continue des performances opérationnelles",
];

function CheckMark() {
  return (
    <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-[#132bdd]" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="currentColor" opacity={0.12} />
      <path d="m6 10.2 2.6 2.6L14.2 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function CentreLogistiquePage() {
  return (
    <>
      <PageHero
        eyebrow={<span className={GRADIENT_LIGHT}>Centre Logistique</span>}
        title={<>Une chaîne logistique intégrée au service de <span className={GRADIENT_LIGHT}>votre performance</span></>}
        titleClassName="mt-3 text-2xl font-bold text-balance text-white sm:text-3xl xl:text-[1.9rem] xl:leading-[1.2]"
        description="Centre de Services Logistiques & Industrialisation IT."
        image="/images/offres/centre-logistique-dark.webp"
        imageSide="right"
        tint="#29304b"
        caption="Run"
        captionColor="green"
        badges={[
          { icon: <PackageIcon className="h-full w-full" tone="light" />, label: "Logistique" },
          { icon: <GearIcon className="h-full w-full" tone="light" />, label: "Industrialisation" },
          { icon: <HeadsetIcon className="h-full w-full" tone="light" />, label: "Fiabilité" },
        ]}
        cta={
          <Link
            href="#domaines"
            className="cta-primary cta-primary-light inline-block w-full rounded-md px-6 py-3 text-center text-sm font-bold sm:w-auto"
          >
            Découvrir nos services
          </Link>
        }
      >
        <div className="mt-6">
          <Breadcrumb
            items={["Apprendre", "Comprendre", <span key="e" className={`font-semibold ${GRADIENT_LIGHT}`}>Entreprendre</span>]}
          />
        </div>
      </PageHero>

      <section className="bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-lg leading-relaxed font-medium text-anthracite sm:text-xl">
            La réussite d&apos;un projet informatique ne repose pas uniquement sur les technologies. Elle dépend
            également de la capacité à préparer, intégrer, stocker, déployer, maintenir et renouveler les
            équipements avec efficacité, sécurité et réactivité.
          </p>
          <div className="mt-8 space-y-5 text-sm leading-relaxed text-anthracite-soft sm:text-base">
            <p>
              Pour répondre à ces enjeux, Cycle Consulting s&apos;appuie sur son propre Centre de Services
              Logistiques, une plateforme opérationnelle dédiée à l&apos;industrialisation des services IT et à la
              gestion du cycle de vie des équipements informatiques.
            </p>
            <p>
              Pensé comme un véritable hub technologique, notre centre de services permet d&apos;accompagner les
              entreprises dans leurs projets de déploiement, de renouvellement de parc et de transformation
              numérique, en garantissant des processus maîtrisés, une traçabilité complète et un niveau de qualité
              conforme aux exigences des environnements les plus critiques.
            </p>
          </div>
        </div>
      </section>

      <section id="domaines" className="mx-auto max-w-5xl scroll-mt-24 px-4 pt-8 pb-16 sm:pt-10 sm:px-6 lg:px-8">
        <h2 className="text-center text-xl font-bold text-anthracite sm:text-2xl lg:text-3xl">
          Une chaîne logistique <span className={`whitespace-nowrap ${GRADIENT_DARK}`}>industrialisée de bout en bout</span>
        </h2>

        <div className="mt-14 space-y-14 sm:space-y-16">
          {DOMAINES.map((domaine) => (
            <div key={domaine.title} className="flex gap-6 sm:gap-8">
              <span className="w-1.5 shrink-0 self-stretch rounded-full bg-gradient-to-b from-[#fa11f7] via-[#132bdd] to-[#0bceff]" />
              <div>
                <h3 className="text-lg font-bold text-anthracite sm:text-xl">{domaine.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-anthracite-soft">{domaine.intro}</p>
                <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                  {domaine.items.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-anthracite-soft">
                      <CheckMark />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm leading-relaxed text-anthracite-soft">{domaine.outro}</p>
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
            Une gestion responsable de <span className={GRADIENT_LIGHT}>la fin de vie de vos équipements</span>
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/80">
            <p>
              La gestion du cycle de vie des actifs informatiques ne s&apos;arrête pas à leur déploiement. Elle
              s&apos;étend également à leur retrait de service, dans le respect des exigences réglementaires,
              environnementales et de sécurité.
            </p>
            <p>
              Cycle Consulting s&apos;appuie sur un partenaire spécialisé dans la valorisation et le traitement des
              Déchets d&apos;Équipements Électriques et Électroniques (DEEE ou D3E), garantissant une prise en
              charge conforme aux réglementations en vigueur : collecte et rapatriement des équipements en fin de
              vie, tri et valorisation des matériels réemployables, recyclage selon les normes D3E, destruction
              sécurisée et traçabilité complète des opérations. À l&apos;issue de chaque opération, un certificat
              officiel de destruction est remis à nos clients.
            </p>
            <p>
              Cette démarche permet aux entreprises de répondre à leurs obligations réglementaires tout en
              intégrant la gestion de leurs actifs informatiques dans une politique de responsabilité sociétale et
              environnementale (RSE).
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl font-bold text-anthracite sm:text-3xl">
              Qualité, traçabilité et <span className={GRADIENT_LIGHT}>excellence opérationnelle</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-anthracite-soft">
              Chez Cycle Consulting, chaque équipement est suivi tout au long de son cycle de vie. Nos processus
              garantissent :
            </p>
            <p className="mt-4 text-sm leading-relaxed text-anthracite-soft">
              Cette exigence de qualité nous permet d&apos;offrir à nos clients une visibilité permanente sur leurs
              actifs et une parfaite maîtrise de leurs opérations logistiques.
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-3">
            {QUALITE.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 rounded-lg border border-border-subtle bg-surface px-4 py-3 text-sm font-medium text-anthracite-soft"
              >
                <CheckMark />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-callout-light">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-anthracite sm:text-3xl">
            L&apos;excellence industrielle <span className={GRADIENT_LIGHT}>au service de votre IT</span>
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-anthracite-soft">
            <p>
              En réunissant sous une même structure les compétences en logistique, intégration industrielle,
              support technique, maintenance et services managés, Cycle Consulting propose une approche globale
              capable d&apos;accompagner les entreprises sur l&apos;ensemble de la chaîne de valeur des services
              numériques. Notre Centre de Services Logistiques constitue un véritable accélérateur de performance,
              permettant aux organisations de simplifier leurs opérations, d&apos;optimiser leurs coûts et de
              sécuriser leurs projets de transformation.
            </p>
            <p>
              De la réception des matériels à leur intégration, de leur stockage à leur déploiement, de leur
              maintenance à leur renouvellement, Cycle Consulting garantit une prise en charge complète, fiable et
              performante de vos actifs informatiques.
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

      <RelatedExpertises currentSlug="centre-logistique" />
    </>
  );
}
