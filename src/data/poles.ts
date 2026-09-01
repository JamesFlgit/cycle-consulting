export type Pole = {
  slug: string;
  href: string;
  navLabel: string;
  category?: string;
  visible: boolean;
  teaser: { accroche: string; apartirde: string };
  metaTitle: string;
  metaDescription: string;
  /** Card header photo — see public/images/offres/. */
  image: string;
  /** Texte alternatif de `image`, pour l'accessibilite et le SEO. */
  imageAlt?: string;
};

export const poles: Pole[] = [
  {
    slug: "formations",
    image: "/images/offres/formations-dark.webp",
    imageAlt:
      "Formatrice en fauteuil roulant et formateur analysant ensemble des tableaux de bord de donnees",
    href: "/formations",
    navLabel: "Formations",
    category: "Formations & Certifications",
    visible: true,
    teaser: {
      accroche:
        "Montez en compétence et formez-vous sur les outils Microsoft et autres avec l'expertise des Consultants Cycle. Augmentez vos performances professionnelles et personnelles.",
      apartirde: "4h/pers.",
    },
    metaTitle: "Formations | Cycle Consulting",
    metaDescription:
      "Montez en compétence sur les outils Microsoft (Office, O365) et les processus Cycle Forms avec les Consultants Cycle Consulting.",
  },
  {
    slug: "service-manage",
    image: "/images/offres/service-manage-dark.webp",
    imageAlt: "Deux consultants supervisant un service IT gere sur des ecrans de pilotage",
    href: "/service-manage",
    navLabel: "Service Managé",
    category: "Pilotage & Support",
    visible: true,
    teaser: {
      accroche:
        "Du Technicien au Responsable de Production, Cycle Consulting vous accompagne quel que soit le niveau de service à intégrer et l'expertise à solliciter.",
      apartirde: "1 consultation",
    },
    metaTitle: "Service Managé | Cycle Consulting",
    metaDescription:
      "Service Delivery, infogérance et veille technologique : pilotez votre entreprise avec les meilleurs outils grâce aux Consultants Cycle Consulting.",
  },
  {
    slug: "business-strategie",
    image: "/images/offres/business-strategie-dark.webp",
    imageAlt:
      "Deux consultants Cycle Consulting analysant des indicateurs de croissance autour d'une table",
    href: "/business-strategie",
    navLabel: "Business & Stratégie",
    category: "Conseil & Stratégie",
    visible: true,
    teaser: {
      accroche:
        "Développez votre activité avec une meilleure connaissance de vos enjeux grâce à des Consultants expérimentés et disponibles pour vous accompagner à chaque étape avec Cycle Consulting.",
      apartirde: "1 consultation",
    },
    metaTitle: "Business & Stratégie | Cycle Consulting",
    metaDescription:
      "Web Services et Business Services : développez votre activité avec l'accompagnement des Consultants Cycle Consulting.",
  },
  {
    slug: "ingenierie-it-support",
    image: "/images/offres/ingenierie-it-support-dark.webp",
    imageAlt: "Ingenieure et technicien Cycle Consulting intervenant sur une baie de serveurs ouverte",
    href: "/ingenierie-it-support",
    navLabel: "Ingénierie & IT Support",
    category: "Ingénierie IT",
    visible: true,
    teaser: {
      accroche:
        "De l'opérateur au responsable de production, Cycle Consulting met à votre disposition des profils qualifiés pour vos infrastructures et votre support IT.",
      apartirde: "1 consultation",
    },
    metaTitle: "Ingénierie & IT Support | Cycle Consulting",
    metaDescription:
      "OSS, IT Support et Ingénierie IT : des consultants qualifiés pour renforcer vos équipes techniques et vos infrastructures.",
  },
  {
    slug: "centre-logistique",
    image: "/images/offres/centre-logistique-dark.webp",
    imageAlt: "Deux operateurs manipulant des colis devant un rayonnage de centre logistique IT",
    href: "/centre-logistique",
    navLabel: "Centre Logistique",
    category: "Logistique IT",
    visible: true,
    teaser: {
      accroche:
        "Stockage, livraison nationale et internationale, expertises métiers : Cycle Consulting sécurise l'ensemble de votre chaîne logistique IT.",
      apartirde: "1 journée",
    },
    metaTitle: "Centre Logistique | Cycle Consulting",
    metaDescription: "Stockage, livraison et expertises métiers : Cycle Consulting gère votre logistique IT de bout en bout.",
  },
];

export function getPoleBySlug(slug: string): Pole | undefined {
  return poles.find((p) => p.slug === slug);
}
