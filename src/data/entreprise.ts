export const entreprise = {
  nom: "Cycle Consulting",
  slogan: "Apprendre, Comprendre, Entreprendre",
  contact: "Eric Zacarias",
  adresse: "50 avenue des Champs-Élysées",
  codePostalVille: "75008 Paris",
  telephone: "07 66 44 40 51",
  email: "contact@cycle-consulting.fr",
  siteWeb: "www.cycle-consulting.fr",
  siren: "108 393 810",
};

/**
 * Identité légale de l'éditeur (mentions légales).
 * Source : extrait Kbis (RCS Paris 2026B39281) + fiche societe.com du 01/09/2026
 * (SIRET, TVA, code APE relevés sur societe.com/societe/cycle-consulting-108393810.html).
 * numeroTva confirmé par Eric le 01/09/2026 : société assujettie à la TVA.
 */
export const mentionsLegales = {
  raisonSociale: "CYCLE CONSULTING",
  formeJuridique: "Société par actions simplifiée à associé unique (SASU)",
  capitalSocial: "30 €",
  rcs: "R.C.S. Paris 108 393 810",
  siren: "108 393 810",
  siret: "108 393 810 00016",
  numeroTva: "FR 00 108 393 810",
  codeApe: "6201Z : Programmation informatique",
  siege: "50 avenue des Champs-Élysées, 75008 Paris",
  domiciliation: "Société domiciliée chez Kandbaz (R.C.S. Paris 497 933 408)",
  immatriculationDate: "4 août 2026",
  directeurPublication: "Éric-Zola Zacarias, en sa qualité de Président",
};

/** Hébergeur du site (déploiement Vercel ; DNS et messagerie chez Hostinger). */
export const hebergeur = {
  nom: "Vercel Inc.",
  adresse: "340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis",
  siteWeb: "https://vercel.com",
  contact: "privacy@vercel.com",
};

/**
 * Destinataires / sous-traitants qui traitent des données pour le compte de
 * Cycle Consulting (politique de confidentialité).
 */
export const sousTraitants = [
  {
    nom: "Vercel Inc.",
    role: "Hébergement du site et journaux techniques",
    lieu: "États-Unis",
    garanties: "Clauses contractuelles types de la Commission européenne",
  },
  {
    nom: "Hostinger International Ltd",
    role: "Service de messagerie : réception des demandes envoyées via les formulaires",
    lieu: "Chypre (Union européenne)",
    garanties: "Traitement au sein de l'UE",
  },
  {
    nom: "Brevo (Sendinblue SAS)",
    role: "Envoi d'e-mails et gestion de la liste de diffusion « brochure »",
    lieu: "France (Union européenne)",
    garanties: "Traitement au sein de l'UE",
  },
  {
    nom: "Google Ireland Limited (Google Analytics 4, Google Tag Manager)",
    role: "Mesure d'audience du site, uniquement après consentement",
    lieu: "Irlande (Union européenne), avec transferts vers Google LLC aux États-Unis",
    garanties:
      "Clauses contractuelles types de la Commission européenne et adhésion de Google LLC au Data Privacy Framework UE / États-Unis",
  },
];

/**
 * Cookies déposés par la mesure d'audience (Google Analytics 4), uniquement
 * après consentement via la bannière. Utilisé par la politique de confidentialité.
 */
export const cookiesMesureAudience = [
  {
    nom: "_ga",
    finalite: "Distinguer les visiteurs (identifiant anonyme)",
    duree: "13 mois",
  },
  {
    nom: "_ga_CLPVQ71TNN",
    finalite: "Maintenir l'état de la session pour Google Analytics 4",
    duree: "13 mois",
  },
];

/**
 * Choix de consentement mémorisé côté navigateur (pas un cookie : stockage local).
 * Décrit dans la politique de confidentialité.
 */
export const stockageConsentement = {
  cle: "cc-consent",
  finalite: "Mémoriser votre choix d'accepter ou de refuser la mesure d'audience",
  duree: "6 mois",
};

export const indicatifsPays = [
  { code: "+33", pays: "France" },
  { code: "+32", pays: "Belgique" },
  { code: "+41", pays: "Suisse" },
  { code: "+352", pays: "Luxembourg" },
  { code: "+212", pays: "Maroc" },
  { code: "+213", pays: "Algérie" },
  { code: "+216", pays: "Tunisie" },
  { code: "+1", pays: "Canada / États-Unis" },
];
