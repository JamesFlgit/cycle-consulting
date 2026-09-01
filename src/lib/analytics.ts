/**
 * Mesure d'audience du site : Google Analytics 4 + conteneur Google Tag Manager,
 * conditionnes au consentement prealable de l'internaute (RGPD / recommandations CNIL).
 *
 * Implementation "Consent Mode v2 basique" : tant que le consentement n'est pas
 * accorde, AUCUN script Google n'est charge (voir `ConsentDefaults` pour les
 * valeurs par defaut "denied", et `Analytics` pour l'injection apres accord).
 *
 * Passage a un pilotage 100% GTM plus tard :
 *  - deplacer la balise GA4 (`gtag('config', ...)`) dans le conteneur GTM ;
 *  - retirer l'injection de `gtag/js` dans `Analytics` (ne garder que GTM) ;
 *  - garder le meme `dataLayer` et les memes evenements de consentement.
 * Tant que GA4 est configure ici (dans le code), NE PAS le dupliquer dans GTM
 * sous peine de double comptage.
 */

/** Identifiant de flux GA4. */
export const GA_MEASUREMENT_ID = "G-CLPVQ71TNN";

/** Identifiant du conteneur Google Tag Manager. */
export const GTM_CONTAINER_ID = "GTM-P73S7NPW";

/** Cle de stockage local du choix de l'internaute. */
export const CONSENT_STORAGE_KEY = "cc-consent";

/**
 * Duree de validite du choix avant de redemander (CNIL : 6 mois recommandes).
 * Passe ce delai, la banniere reapparait.
 */
export const CONSENT_MAX_AGE_DAYS = 180;

/** Evenement fenetre emis a chaque changement de choix (`granted` | `denied`). */
export const CONSENT_CHANGE_EVENT = "cc:consent-change";

/** Evenement fenetre pour rouvrir la banniere (lien "Gerer mes cookies"). */
export const CONSENT_OPEN_EVENT = "cc:consent-open";

export type ConsentChoice = "granted" | "denied";

type StoredConsent = { choice: ConsentChoice; at: number };

/** Lit le choix stocke, ou `null` si absent / expire / stockage indisponible. */
export function readConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    const ageDays = (Date.now() - parsed.at) / 86_400_000;
    if (ageDays > CONSENT_MAX_AGE_DAYS) return null;
    return parsed.choice === "granted" ? "granted" : "denied";
  } catch {
    return null;
  }
}

/** Enregistre le choix et previent le reste de l'app via un evenement fenetre. */
export function writeConsent(choice: ConsentChoice): void {
  try {
    const payload: StoredConsent = { choice, at: Date.now() };
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* navigation privee ou stockage bloque : le choix ne sera pas memorise */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: choice }));
}
