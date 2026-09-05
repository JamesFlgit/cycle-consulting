// Offres d'emploi ouvertes chez Cycle Consulting. Source : visuels "Mission à
// pourvoir" transmis par Eric (dossier "Offres d'emploi", 05/09/2026).
//
// Les visuels ne précisent ni type de contrat, ni rémunération, ni date de
// publication : `datePublication` est fixée au jour de la mise en ligne et
// `typeContrat` laissé optionnel. À faire compléter par Eric avant diffusion
// large (utile pour l'affichage Google "offres d'emploi").

export type BlocCompetences = {
  titre: string;
  points: string[];
};

export type OffreEmploi = {
  slug: string;
  href: string;
  /** Titre court, affiché en nav et sur les cartes ("Contract Manager"). */
  titre: string;
  /** Intitulé complet du poste, pour les données structurées JobPosting. */
  intitulePoste: string;
  /** Phrase d'accroche : ce que Cycle Consulting recherche et pourquoi. */
  accroche: string;
  /** Teaser court pour les cartes de la page Rejoignez-nous. */
  resume: string;
  /** Lieu de rattachement. */
  lieu: string;
  /** Type de contrat, si connu ("CDI"). Optionnel tant qu'Eric ne l'a pas confirmé. */
  typeContrat?: string;
  /** Date de publication, format ISO. */
  datePublication: string;
  metaTitle: string;
  metaDescription: string;
  profilRecherche: string[];
  competences: BlocCompetences[];
  /** Périmètre du poste, quand le visuel en précise un. */
  perimetre?: {
    description: string;
    tags: string[];
  };
  visible: boolean;
};

export const offresEmploi: OffreEmploi[] = [
  {
    slug: "contract-manager",
    href: "/rejoignez-nous/contract-manager",
    titre: "Contract Manager",
    intitulePoste: "Contract Manager",
    accroche:
      "Cycle Consulting recherche un(e) Contract Manager pour superviser les contrats liés au déploiement des équipements informatiques et assurer une gestion contractuelle optimale avec les fournisseurs.",
    resume:
      "Supervision des contrats fournisseurs liés au déploiement des équipements informatiques : suivi contractuel et budgétaire, pilotage de la performance et amélioration continue.",
    lieu: "Paris (75008)",
    datePublication: "2026-09-05",
    metaTitle: "Contract Manager (H/F) | Cycle Consulting",
    metaDescription:
      "Cycle Consulting recrute un Contract Manager pour piloter les contrats fournisseurs liés au déploiement des équipements informatiques : suivi contractuel, budgétaire et performance.",
    profilRecherche: [
      "Expérience confirmée en gestion de contrats fournisseurs dans un environnement IT",
      "Bonne connaissance des équipements informatiques (postes de travail, outils mobiles, etc.)",
      "Capacité à travailler avec des équipes achats, contrôle de gestion et métiers",
      "Excellent relationnel, sens de la communication et de la négociation",
      "Capacité d'analyse, de synthèse et de reporting",
      "Maîtrise des outils Office 365",
    ],
    competences: [
      {
        titre: "Suivi contractuel et budgétaire",
        points: [
          "Suivi et respect des échéances contractuelles",
          "Élaboration des prévisions budgétaires",
          "Bilan économique annuel et en fin de contrat",
        ],
      },
      {
        titre: "Pilotage et performance",
        points: [
          "Suivi des indicateurs de performance (SLA et KPI)",
          "Suivi des incidents et mise en place de plans d'action",
          "Animation des réunions fournisseurs",
        ],
      },
      {
        titre: "Relation fournisseurs et métiers",
        points: [
          "Interface entre l'entreprise et ses fournisseurs",
          "Coordination avec les équipes métiers",
          "Garantie de la bonne exécution contractuelle",
        ],
      },
      {
        titre: "Analyse et amélioration continue",
        points: [
          "Analyse des contrats et des risques",
          "Identification des opportunités d'amélioration",
          "Proposition de solutions concrètes et adaptées",
        ],
      },
    ],
    perimetre: {
      description:
        "Déploiement des équipements informatiques (postes de travail, outils mobiles, etc.), en interface avec l'ensemble des métiers.",
      tags: ["Tous métiers", "Relation fournisseurs", "Suivi contractuel", "Performance", "Budget"],
    },
    visible: true,
  },
  {
    slug: "pmo-chef-de-projet-it",
    href: "/rejoignez-nous/pmo-chef-de-projet-it",
    titre: "PMO / Chef de projet IT",
    intitulePoste: "PMO / Chef de projet IT",
    accroche:
      "Cycle Consulting recherche des profils PMO / Chef de projet IT pour accompagner ses clients dans le pilotage de leurs projets à fort impact.",
    resume:
      "Pilotage de portefeuilles de projets IT à fort impact : planning, budgets, risques et KPI, coordination des parties prenantes et conduite du changement.",
    lieu: "Paris (75008) et missions clients",
    datePublication: "2026-09-05",
    metaTitle: "PMO / Chef de projet IT (H/F) | Cycle Consulting",
    metaDescription:
      "Cycle Consulting recrute des PMO / Chefs de projet IT pour piloter des projets à fort impact chez ses clients : méthodologies Agile / Scrum / SAFe, planning, budgets, risques et KPI.",
    profilRecherche: [
      "Expérience confirmée en tant que PMO / Chef de projet IT",
      "Maîtrise des méthodologies Agile / Scrum / SAFe",
      "Pilotage de projets, suivi des plannings, budgets, risques et KPI",
      "Excellentes capacités de coordination et de communication",
      "Rigueur, sens de l'organisation et esprit d'analyse",
      "Force de proposition et orientation solutions",
    ],
    competences: [
      {
        titre: "Pilotage et suivi",
        points: [
          "Suivi d'un portefeuille de projets",
          "Planning, jalons, risques et actions",
          "Reporting, KPI et comités de pilotage",
          "Gestion des dépendances et des priorités",
        ],
      },
      {
        titre: "Coordination et communication",
        points: [
          "Interface entre les équipes métiers, l'IT et les prestataires",
          "Animation des parties prenantes",
          "Suivi des livrables et de la qualité",
          "Conduite du changement",
        ],
      },
      {
        titre: "Méthodes et outils",
        points: [
          "Agile, Scrum, SAFe",
          "Jira, Confluence, MS Project, Smartsheet",
          "Microsoft 365 : Excel avancé, PowerPoint",
        ],
      },
      {
        titre: "Environnements IT / SI",
        points: [
          "Transformation digitale",
          "Infrastructure et Cloud",
          "Bonnes pratiques de gestion de projet",
        ],
      },
    ],
    visible: true,
  },
];

export function getOffreEmploiBySlug(slug: string): OffreEmploi | undefined {
  return offresEmploi.find((o) => o.slug === slug);
}

/** Offres visibles, pour la page Rejoignez-nous et le plan du site. */
export function getOffresEmploiVisibles(): OffreEmploi[] {
  return offresEmploi.filter((o) => o.visible);
}
