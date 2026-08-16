export type CasClient = {
  slug: string;
  href: string;
  navLabel: string;
  secteur: string;
  tailleEntreprise?: string;
  visible: boolean;
  metaTitle?: string;
  metaDescription?: string;
  resume: string;
};

export const casClients: CasClient[] = [
  {
    slug: "grand-groupe-bancaire",
    href: "/cas-clients/grand-groupe-bancaire",
    navLabel: "Grand groupe bancaire",
    secteur: "Banque & Assurance",
    tailleEntreprise: "2 500+ collaborateurs",
    visible: true,
    metaTitle: "Grand groupe bancaire — Cas client Cycle Consulting",
    metaDescription: "Comment Cycle Consulting a accompagné un grand groupe bancaire sur la modernisation de son support IT.",
    resume: "Modernisation du support IT et industrialisation du poste de travail à l'échelle nationale.",
  },
  {
    slug: "assureur-mutualiste",
    href: "/cas-clients/assureur-mutualiste",
    navLabel: "Assureur mutualiste",
    secteur: "Banque & Assurance",
    tailleEntreprise: "1 500 collaborateurs",
    visible: true,
    metaTitle: "Assureur mutualiste — Cas client Cycle Consulting",
    metaDescription: "Comment Cycle Consulting a renforcé la gouvernance IT d'un assureur mutualiste régional.",
    resume: "Mise en place d'un centre de services et renforcement de la gouvernance IT.",
  },
  {
    slug: "acteur-industriel-national",
    href: "/cas-clients/acteur-industriel-national",
    navLabel: "Acteur industriel national",
    secteur: "Industrie",
    tailleEntreprise: "1 200 collaborateurs",
    visible: true,
    metaTitle: "Acteur industriel national — Cas client Cycle Consulting",
    metaDescription: "Comment Cycle Consulting a accompagné un acteur industriel dans sa transformation logistique IT.",
    resume: "Intégration et reconditionnement du parc informatique sur plusieurs sites de production.",
  },
  {
    slug: "groupe-hospitalier-regional",
    href: "/cas-clients/groupe-hospitalier-regional",
    navLabel: "Groupe hospitalier régional",
    secteur: "Santé",
    tailleEntreprise: "800+ collaborateurs",
    visible: true,
    metaTitle: "Groupe hospitalier régional — Cas client Cycle Consulting",
    metaDescription: "Comment Cycle Consulting a déployé un support de proximité pour un groupe hospitalier régional.",
    resume: "Déploiement d'un support de proximité et formation des équipes aux nouveaux outils métiers.",
  },
  {
    slug: "distributeur-retail-international",
    href: "/cas-clients/distributeur-retail-international",
    navLabel: "Distributeur retail international",
    secteur: "Distribution & Retail",
    tailleEntreprise: "5 000+ collaborateurs",
    visible: true,
    metaTitle: "Distributeur retail international — Cas client Cycle Consulting",
    metaDescription: "Comment Cycle Consulting a piloté le déploiement multi-pays d'un distributeur retail.",
    resume: "Pilotage de contrats et déploiement multi-pays des postes de travail en magasin.",
  },
  {
    slug: "operateur-telecom-national",
    href: "/cas-clients/operateur-telecom-national",
    navLabel: "Opérateur télécom national",
    secteur: "Télécoms",
    tailleEntreprise: "3 000+ collaborateurs",
    visible: true,
    metaTitle: "Opérateur télécom national — Cas client Cycle Consulting",
    metaDescription: "Comment Cycle Consulting a renforcé les équipes techniques d'un opérateur télécom national.",
    resume: "Renfort d'équipes techniques et pilotage ITSM sur un programme de transformation réseau.",
  },
];

export function getCasClientBySlug(slug: string): CasClient | undefined {
  return casClients.find((c) => c.slug === slug);
}
