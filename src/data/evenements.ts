// Agenda des salons et événements où Cycle Consulting est présent. Source :
// tableau de suivi transmis par Eric le 05/09/2026. Deux entrées corrigées par
// rapport à la source brute (voir notes ci-dessous) — à faire valider par Eric.

export type Evenement = {
  slug: string;
  nom: string;
  /** Date de l'évènement, format ISO ("2026-09-28"). */
  dateISO: string;
  /** Libellé affiché, ex. "28 septembre 2026". */
  dateLabel: string;
  organisateur?: string;
  ville: string;
  lieu?: string;
  adresse?: string;
  /** Lien officiel de l'évènement. Volontairement réduit au domaine quand la
   * source contenait un lien de tracking personnalisé (voir SALON_SME). */
  siteUrl?: string;
  /** Nature de la présence Cycle Consulting sur place. */
  presta: string;
  categorie: "salon" | "reception";
  /** Public étudiant / recrutement — sert à faire remonter l'évènement depuis /rejoignez-nous. */
  recrutement?: boolean;
  description: string;
  visible: boolean;
};

export const evenements: Evenement[] = [
  {
    slug: "melee-numerique-toulouse-2026",
    nom: "La Mêlée du numérique",
    dateISO: "2026-09-28",
    dateLabel: "28 septembre 2026",
    organisateur: "Mêlée Numérique",
    ville: "Toulouse",
    siteUrl: "https://www.meleenumerique.com/",
    presta: "Stand",
    categorie: "salon",
    description:
      "Cycle Consulting tient un stand à Toulouse à l'occasion de cet évènement dédié à l'écosystème numérique organisé par l'association Mêlée Numérique.",
    visible: true,
  },
  {
    slug: "salon-sme-paris-2026",
    nom: "Salon SME",
    dateISO: "2026-10-13",
    dateLabel: "13 octobre 2026",
    ville: "Paris",
    lieu: "Palais des Congrès",
    // Lien source tronqué : l'URL fournie contenait un identifiant de tracking
    // personnalisé et l'adresse e-mail d'Eric en clair (gclid/gbraid + email=...).
    // Ne jamais publier ce lien tel quel : redirige vers le domaine seul.
    siteUrl: "https://www.salon-smeonline.com/",
    presta: "Présence",
    categorie: "salon",
    description: "Cycle Consulting assiste au Salon SME, au Palais des Congrès de Paris.",
    visible: true,
  },
  {
    slug: "salon-solutions-crm-bi-paris-2026",
    nom: "Salon Solutions CRM & BI",
    dateISO: "2026-10-14",
    dateLabel: "14 octobre 2026",
    organisateur: "Tech Solution",
    ville: "Paris",
    lieu: "Paris Expo Porte de Versailles",
    siteUrl: "https://salons-solutions.fr/",
    presta: "Stand",
    categorie: "salon",
    description:
      "Cycle Consulting tient un stand sur l'espace CRM & BI du salon Solutions, à Paris Expo Porte de Versailles.",
    visible: true,
  },
  {
    slug: "salon-serveurs-applications-paris-2026",
    nom: "Salon Serveurs & Applications",
    dateISO: "2026-10-14",
    dateLabel: "14 octobre 2026",
    organisateur: "Tech Solution",
    ville: "Paris",
    lieu: "Paris Expo Porte de Versailles",
    siteUrl: "https://salons-solutions.fr/",
    presta: "Présence",
    categorie: "salon",
    description:
      "Cycle Consulting est présent sur l'espace Serveurs & Applications du salon Solutions, à Paris Expo Porte de Versailles.",
    visible: true,
  },
  {
    slug: "diner-arts-culture-paris-2026",
    nom: "Dîner des Arts & de la Culture",
    dateISO: "2026-11-26",
    dateLabel: "26 novembre 2026",
    organisateur: "HHMA / One Vision",
    ville: "Paris",
    lieu: "UNESCO",
    siteUrl: "https://diner-arts-culture.fr/",
    presta: "Présence & stand",
    categorie: "salon",
    description: "Cycle Consulting participe à cette soirée organisée au siège de l'UNESCO à Paris.",
    visible: true,
  },
  {
    slug: "cycle-christmas-2026",
    nom: "Cycle Christmas",
    dateISO: "2026-12-16",
    dateLabel: "16 décembre 2026",
    organisateur: "Cycle Consulting",
    ville: "Paris",
    presta: "Réception privée",
    categorie: "reception",
    description:
      "Réception de fin d'année organisée par Cycle Consulting pour ses clients et partenaires, sur invitation.",
    visible: true,
  },
  {
    slug: "salon-metiers-numerique-lille-2027",
    nom: "Salon des métiers du numérique de Lille",
    dateISO: "2027-02-13",
    dateLabel: "13 février 2027",
    // Source : colonne "ORGA" indique "L'Étudiant", l'URL fournie pointe vers
    // Studyrama. Les deux organisent des salons étudiants à Lille : à confirmer
    // avec Eric avant publication.
    organisateur: "L'Étudiant / Studyrama",
    ville: "Lille",
    lieu: "Entreprises et Cités",
    adresse: "40 rue Eugène Jacquet, 59700 Marcq-en-Barœul",
    siteUrl:
      "https://www.studyrama.com/salons/salon-studyrama-des-formations-du-numerique-de-lille-230",
    presta: "Stand",
    categorie: "salon",
    recrutement: true,
    description:
      "Cycle Consulting tient un stand à ce salon étudiant dédié aux formations et métiers du numérique, à Marcq-en-Barœul (métropole lilloise).",
    visible: true,
  },
];

export function getEvenementsTries(): Evenement[] {
  return [...evenements].filter((e) => e.visible).sort((a, b) => a.dateISO.localeCompare(b.dateISO));
}

export function getEvenementsAVenir(referenceISO: string): Evenement[] {
  return getEvenementsTries().filter((e) => e.dateISO >= referenceISO);
}

export function getEvenementsPasses(referenceISO: string): Evenement[] {
  return getEvenementsTries()
    .filter((e) => e.dateISO < referenceISO)
    .reverse();
}
