export type Temoignage = {
  auteur: string;
  citation: string;
  logo?: string;
  logoScale?: number;
};

export const temoignages: Temoignage[] = [
  {
    auteur: "Burger King",
    citation: "[À COMPLÉTER : témoignage Burger King]",
    logo: "/logos-clients/burger-king.png",
  },
  {
    auteur: "Afro Délice",
    citation:
      "Rapide et efficace. Cycle Consulting a su nous conseiller et augmenter notre force de vente. Un grand merci !",
    logo: "/logos-clients/afro-delices.png",
  },
  {
    auteur: "Lemon Juice",
    citation: "Un soutien sans faille. Un grand merci à Cycle pour leur professionnalisme.",
  },
  {
    auteur: "HHMA",
    citation: "Très professionnel et disponible. Une équipe comme on aimerait en rencontrer plus souvent.",
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
    citation: "[À COMPLÉTER : témoignage GES 360]",
    logo: "/logos-clients/ges-360.jpg",
  },
  {
    auteur: "Kankou Traiteur",
    citation: "[À COMPLÉTER : témoignage Kankou Traiteur]",
    logo: "/logos-clients/kankou-traiteur.png",
  },
  {
    auteur: "Team Body",
    citation: "[À COMPLÉTER : témoignage Team Body]",
    logo: "/logos-clients/team-body.png",
    logoScale: 1.15,
  },
  {
    auteur: "Les Merveilles d'Alice",
    citation: "[À COMPLÉTER : témoignage Les Merveilles d'Alice]",
    logo: "/logos-clients/merveilles-alice.png",
  },
];
