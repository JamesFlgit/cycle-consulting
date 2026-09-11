export type Temoignage = {
  /** Référence interne. Les noms clients sont soumis à autorisation : elle ne
   *  sort du fichier que pour l'attribut alt du logo, donc uniquement pour les
   *  clients qui ont donné leur accord d'affichage (cf. `logo`). */
  ref: string;
  /** Secteur d'activité affiché à la place du nom du client. */
  secteur: string;
  citation: string;
  /** Logo client, réservé aux SEULS clients ayant donné leur accord d'affichage.
   *  Sans accord, pas de logo : la carte reste identifiée par son seul secteur. */
  logo?: string;
};

/** Un avis reellement redige (pas vide, pas un marqueur "[A COMPLETER ...]"). */
export function hasCitation(temoignage: Temoignage): boolean {
  return Boolean(temoignage.citation.trim()) && !temoignage.citation.includes("À COMPLÉTER");
}

/** Carte affichable : soit un avis rédigé, soit, à défaut, un logo autorisé
 *  (carte logo seul, pour un client qui accepte d'être cité sans témoignage). */
export function isDisplayable(temoignage: Temoignage): boolean {
  return hasCitation(temoignage) || Boolean(temoignage.logo);
}

export const temoignages: Temoignage[] = [
  {
    ref: "Burger King",
    secteur: "QSR Grand compte",
    citation: "Nous avons bénéficié des services de Cycle et nous sommes ravis de cette collaboration.",
  },
  {
    ref: "DS Immo Consulting",
    secteur: "Immobilier",
    citation:
      "Nous avons aimé travailler avec Cycle Consulting. Une équipe disponible, un service de proximité impeccable qui comprend nos enjeux et nos besoins.",
    logo: "/logos-clients/ds-immo-consulting.webp",
  },
  {
    ref: "Lemon Juice",
    secteur: "Communication & évènementiel",
    citation: "Un soutien sans faille. Un grand merci à Cycle pour leur professionnalisme.",
  },
  {
    // Accord d'affichage donné sans témoignage écrit : carte logo seul.
    ref: "Prix des Arts & de la Culture",
    secteur: "Culture & évènementiel",
    citation: "",
    logo: "/logos-clients/prix-des-arts-culture.webp",
  },
  {
    ref: "HHMA",
    secteur: "Architecture & construction",
    citation: "Cycle est devenu un partenaire incontournable pour nos besoins IT. Nous recommandons vivement.",
  },
  {
    ref: "Afro Délice",
    secteur: "QSR Grand compte",
    citation:
      "Nous avons travaillé avec Cycle pour la consolidation de notre site suite à une recommandation, c'était à la hauteur de la réputation ! On adore.",
  },
  {
    ref: "Equans",
    secteur: "Génie civil & multi-technique",
    citation: "[À COMPLÉTER : témoignage Equans]",
  },
  {
    ref: "DBV Technologies",
    secteur: "Santé & biotechnologies",
    citation: "[À COMPLÉTER : témoignage DBV Technologies]",
  },
  {
    ref: "GES 360",
    secteur: "Conseil en environnement",
    citation:
      "Cycle a su nous accompagner et proposer des services mieux adaptés à ceux qu'on pensait, sans augmenter notre facture ! Un service en toute transparence et confiance.",
  },
  {
    ref: "Kankou Traiteur",
    secteur: "Restauration & traiteur",
    citation: "[À COMPLÉTER : témoignage Kankou Traiteur]",
  },
  {
    ref: "Team Body",
    secteur: "Sport & bien-être",
    citation:
      "Cycle a automatisé mes rapports d'activité, je vois beaucoup plus clair dans ma gestion, ce qui facilite les prises de décision.",
  },
  {
    ref: "Les Merveilles d'Alice",
    secteur: "Santé",
    citation:
      "Cycle nous a aidés à consolider un outil interne de coordination de service et de formation de nos équipes médicales. Nous avons considérablement augmenté notre productivité depuis cette mise en place. Encore merci !",
    logo: "/logos-clients/merveilles-alice.webp",
  },
];
