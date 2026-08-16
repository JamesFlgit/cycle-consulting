export type Pole = {
  slug: string;
  href: string;
  navLabel: string;
  category?: string;
  visible: boolean;
  teaser: { accroche: string; apartirde: string };
  metaTitle: string;
  metaDescription: string;
};

export const poles: Pole[] = [
  {
    slug: "formations",
    href: "/formations",
    navLabel: "Formations",
    category: "Formations & Certifications",
    visible: true,
    teaser: {
      accroche:
        "Montez en compétence et formez-vous sur les outils Microsoft et autres avec l'expertise des Consultants Cycle. Augmentez vos performances professionnelles et personnelles.",
      apartirde: "4h/pers.",
    },
    metaTitle: "Formations — Cycle Consulting",
    metaDescription:
      "Montez en compétence sur les outils Microsoft (Office, O365) et les processus Cycle Forms avec les Consultants Cycle Consulting.",
  },
  {
    slug: "service-manage",
    href: "/service-manage",
    navLabel: "Service Managé",
    category: "Pilotage & Support",
    visible: true,
    teaser: {
      accroche:
        "Du Technicien au Responsable de Production, Cycle Consulting vous accompagne quel que soit le niveau de service à intégrer et l'expertise à solliciter.",
      apartirde: "1 consultation",
    },
    metaTitle: "Service Managé — Cycle Consulting",
    metaDescription:
      "Service Delivery, infogérance et veille technologique : pilotez votre entreprise avec les meilleurs outils grâce aux Consultants Cycle Consulting.",
  },
  {
    slug: "business-strategie",
    href: "/business-strategie",
    navLabel: "Business & Stratégie",
    category: "Conseil & Stratégie",
    visible: true,
    teaser: {
      accroche:
        "Développez votre activité avec une meilleure connaissance de vos enjeux grâce à des Consultants expérimentés et disponibles pour vous accompagner à chaque étape avec Cycle Consulting.",
      apartirde: "1 consultation",
    },
    metaTitle: "Business & Stratégie — Cycle Consulting",
    metaDescription:
      "Web Services et Business Services : développez votre activité avec l'accompagnement des Consultants Cycle Consulting.",
  },
  {
    slug: "ingenierie-it-support",
    href: "/ingenierie-it-support",
    navLabel: "Ingénierie & IT Support",
    category: "Ingénierie IT",
    visible: true,
    teaser: {
      accroche:
        "De l'opérateur au responsable de production, Cycle Consulting met à votre disposition des profils qualifiés pour vos infrastructures et votre support IT.",
      apartirde: "1 consultation",
    },
    metaTitle: "Ingénierie & IT Support — Cycle Consulting",
    metaDescription:
      "OSS, IT Support et Ingénierie IT : des consultants qualifiés pour renforcer vos équipes techniques et vos infrastructures.",
  },
  {
    slug: "centre-logistique",
    href: "/centre-logistique",
    navLabel: "Centre Logistique",
    category: "Logistique IT",
    visible: true,
    teaser: {
      accroche:
        "Stockage, livraison nationale et internationale, expertises métiers : Cycle Consulting sécurise l'ensemble de votre chaîne logistique IT.",
      apartirde: "1 journée",
    },
    metaTitle: "Centre Logistique — Cycle Consulting",
    metaDescription: "Stockage, livraison et expertises métiers : Cycle Consulting gère votre logistique IT de bout en bout.",
  },
];
