export type Temoignage = {
  auteur: string;
  citation: string;
  logo?: string;
  logoScale?: number;
};

/** Un avis reellement redige (pas vide, pas un marqueur "[A COMPLETER ...]"). */
export function hasCitation(temoignage: Temoignage): boolean {
  return Boolean(temoignage.citation.trim()) && !temoignage.citation.includes("À COMPLÉTER");
}

export const temoignages: Temoignage[] = [
  {
    auteur: "Burger King",
    citation: "Nous avons bénéficié des services de Cycle et nous sommes ravis de cette collaboration.",
    logo: "/logos-clients/burger-king.webp",
  },
  {
    auteur: "Afro Délice",
    citation:
      "Nous avons travaillé avec Cycle pour la consolidation de notre site suite à une recommandation, c'était à la hauteur de la réputation ! On adore.",
    logo: "/logos-clients/afro-delices.webp",
  },
  {
    auteur: "DS Immo Consulting",
    citation:
      "Nous avons aimé travailler avec Cycle Consulting. Une équipe disponible, un service de proximité impeccable qui comprend nos enjeux et nos besoins.",
    logo: "/logos-clients/ds-immo-consulting.png",
  },
  {
    auteur: "Lemon Juice",
    citation: "Un soutien sans faille. Un grand merci à Cycle pour leur professionnalisme.",
  },
  {
    auteur: "HHMA",
    citation: "Cycle est devenu un partenaire incontournable pour nos besoins IT. Nous recommandons vivement.",
    logo: "/logos-clients/hhma.png",
  },
  {
    auteur: "Equans",
    citation: "[À COMPLÉTER : témoignage Equans]",
    logo: "/logos-clients/equans.jpg",
  },
  {
    auteur: "DBV Technologies",
    citation: "[À COMPLÉTER : témoignage DBV Technologies]",
    logo: "/logos-clients/dbv.png",
  },
  {
    auteur: "GES 360",
    citation:
      "Cycle a su nous accompagner et proposer des services mieux adaptés à ceux qu'on pensait, sans augmenter notre facture ! Un service en toute transparence et confiance.",
    logo: "/logos-clients/ges-360.jpg",
  },
  {
    auteur: "Kankou Traiteur",
    citation: "[À COMPLÉTER : témoignage Kankou Traiteur]",
    logo: "/logos-clients/kankou-traiteur.webp",
  },
  {
    auteur: "Team Body",
    citation:
      "Cycle a automatisé mes rapports d'activité, je vois beaucoup plus clair dans ma gestion, ce qui facilite les prises de décision.",
    logo: "/logos-clients/team-body.webp",
    logoScale: 1.15,
  },
  {
    auteur: "Les Merveilles d'Alice",
    citation:
      "Cycle nous a aidés à consolider un outil interne de coordination de service et de formation de nos équipes médicales. Nous avons considérablement augmenté notre productivité depuis cette mise en place. Encore merci !",
    logo: "/logos-clients/merveilles-alice.webp",
  },
];
