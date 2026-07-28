export type Offre = {
  titre: string;
  accroche: string;
  apartirde: string;
  href: string;
};

export const offres: Offre[] = [
  {
    titre: "Formations",
    accroche:
      "Montez en compétence et formez-vous sur les outils Microsoft et autres avec l'expertise des Consultants Cycle. Augmentez vos performances professionnelles et personnelles.",
    apartirde: "4h/pers.",
    href: "/formations",
  },
  {
    titre: "Service Delivery",
    accroche:
      "Optez pour des livrables de qualité et pilotez votre entreprise avec les meilleurs outils mis à votre disposition par nos Consultants référencés dans l'infrastructure.",
    apartirde: "1 consultation",
    href: "/service-manage",
  },
  {
    titre: "Business & Stratégie",
    accroche:
      "Développez votre activité avec une meilleure connaissance de vos Consultants expérimentés et disponibles pour vous accompagner à chaque étape avec Cycle Consulting.",
    apartirde: "1 consultation",
    href: "/business-strategie",
  },
  {
    titre: "Infogérance",
    accroche:
      "Du Technicien au Responsable de Production, Cycle Consulting vous accompagne quel que soit le niveau de service à intégrer et l'expertise à solliciter.",
    apartirde: "1 journée",
    href: "/service-manage",
  },
];
