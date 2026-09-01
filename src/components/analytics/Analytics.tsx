"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  CONSENT_CHANGE_EVENT,
  GA_MEASUREMENT_ID,
  GTM_CONTAINER_ID,
  readConsent,
  type ConsentChoice,
} from "@/lib/analytics";

let tagsLoaded = false;

/** Injecte GA4 (gtag.js) puis le conteneur GTM. Idempotent. */
function loadTags() {
  if (tagsLoaded) return;
  tagsLoaded = true;

  // GA4 : configure ICI, pas dans le conteneur GTM (evite le double comptage).
  // send_page_view: false -> on envoie chaque page vue nous-memes, y compris la
  // premiere, pour couvrir la navigation SPA sans doublon.
  // GA4 n'enregistre pas l'adresse IP : pas de parametre d'anonymisation a passer.
  const ga = document.createElement("script");
  ga.async = true;
  ga.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(ga);
  window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });

  // GTM : conteneur pour les futures balises, charge seulement apres consentement.
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  const gtm = document.createElement("script");
  gtm.async = true;
  gtm.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`;
  document.head.appendChild(gtm);
}

/** Supprime les cookies `_ga*` / `_gid` deposes par GA4 (retrait du consentement). */
function clearGaCookies() {
  const host = window.location.hostname;
  const domains = [host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0].trim();
    if (!/^_ga/.test(name) && name !== "_gid") continue;
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`;
    }
  }
}

function sendPageView(path: string) {
  if (!tagsLoaded || typeof window.gtag !== "function") return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

/**
 * @param emitCurrentPage envoie une page vue pour l'URL courante juste apres
 *   l'accord. Utile quand le consentement est donne en cours de visite (l'effet
 *   par URL a deja tourne) ; inutile au montage ou cet effet s'en charge.
 */
function applyConsent(choice: ConsentChoice, emitCurrentPage = false) {
  if (typeof window.gtag !== "function") return;
  if (choice === "granted") {
    window.gtag("consent", "update", { analytics_storage: "granted" });
    loadTags();
    if (emitCurrentPage) sendPageView(window.location.pathname + window.location.search);
  } else {
    window.gtag("consent", "update", { analytics_storage: "denied" });
    clearGaCookies();
  }
}

function AnalyticsInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Au montage : rejoue le choix deja fait, puis ecoute les changements.
  useEffect(() => {
    const stored = readConsent();
    if (stored) applyConsent(stored);

    const onChange = (event: Event) => {
      applyConsent((event as CustomEvent<ConsentChoice>).detail, true);
    };
    window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
  }, []);

  // Une page vue par URL (chargement initial + navigations SPA).
  useEffect(() => {
    const query = searchParams.toString();
    sendPageView(query ? `${pathname}?${query}` : pathname);
  }, [pathname, searchParams]);

  return null;
}

export default function Analytics() {
  return (
    <Suspense fallback={null}>
      <AnalyticsInner />
    </Suspense>
  );
}
