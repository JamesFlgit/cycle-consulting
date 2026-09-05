// Agenda des salons et événements où Cycle Consulting est présent. Source :
// tableau de suivi transmis par Eric le 05/09/2026. Deux entrées corrigées par
// rapport à la source brute (voir notes ci-dessous) — à faire valider par Eric.
//
// IMAGES (05/09/2026) : `image` reprend un visuel du site de l'évènement (ou du
// lieu), récupéré via Playwright et recadré en 16/9 webp dans
// public/images/evenements/ :
//   - La Mêlée Numérique  → photo du lieu (Espaces Vanel, Toulouse)
//   - Salon SME           → rendu officiel du salon (billboard tiers recadré hors champ)
//   - Salon Solutions     → visuel 2026 officiel (même visuel pour CRM&BI et Serveurs&Applications)
//   - Dîner Arts & Culture → visuel officiel (galerie des Glaces)
//   - Salon Lille         → photo de La Cité des Échanges (citedesechanges.com)
//   - Cycle Christmas     → visuel de marque fourni par Eric
// Tous les évènements ont désormais un visuel ; le cadre dégradé de marque (avec
// le symbole Cycle blanc) ne sert plus que de repli défensif. Usage "présence
// salon" des visuels d'organisateurs / de lieux à faire valider par Eric côté droits.

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
  /** Visuel 16/9 (webp, public/images/evenements/). Absent = cadre dégradé de marque. */
  image?: string;
  /** Texte alternatif de `image`. Vide si l'illustration est purement décorative. */
  imageAlt?: string;
  /** `object-position` du visuel dans son cadre (ex. "50% 70%"). Défaut : centre. */
  imagePosition?: string;
  /** Élargit la colonne image sur /evenements (visuel large à mettre en valeur, ex. Cycle Christmas). */
  imageWide?: boolean;
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
    image: "/images/evenements/melee-numerique-toulouse-2026.webp",
    imageAlt: "Les Espaces Vanel à Toulouse, lieu de La Mêlée du numérique",
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
    image: "/images/evenements/salon-sme-paris-2026.webp",
    imageAlt: "Vue du Salon SME, visuel officiel de l'évènement",
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
    image: "/images/evenements/salon-solutions-paris-2026.webp",
    imageAlt: "Visuel 2026 du salon Solutions (ERP, CRM, dématérialisation, IA & data)",
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
    image: "/images/evenements/salon-solutions-paris-2026.webp",
    imageAlt: "Visuel 2026 du salon Solutions (ERP, CRM, dématérialisation, IA & data)",
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
    image: "/images/evenements/diner-arts-culture-paris-2026.webp",
    imageAlt: "Galerie des Glaces, visuel du Dîner des Arts & de la Culture",
    imagePosition: "50% 72%",
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
    image: "/images/evenements/cycle-christmas-2026.webp",
    imageAlt: "Visuel Cycle Christmas : le logo Cycle Consulting en habit de fête",
    imageWide: true,
    imagePosition: "50% 30%",
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
    image: "/images/evenements/salon-metiers-numerique-lille-2027.webp",
    imageAlt: "La Cité des Échanges à Marcq-en-Barœul, lieu du salon",
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
