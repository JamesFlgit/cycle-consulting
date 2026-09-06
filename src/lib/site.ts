import type { Metadata } from "next";
import { entreprise, mentionsLegales } from "@/data/entreprise";

/** URL canonique de production. Sert de base a `metadataBase` et aux donnees structurees. */
export const SITE_URL = "https://www.cycle-consulting.fr";

/** Nom de marque — suffixe des titres et `siteName` Open Graph. */
export const SITE_NAME = "Cycle Consulting";

/**
 * Autorise l'indexation par les moteurs. `false` tant que le site n'est pas
 * officiellement en ligne (evite l'indexation de l'URL *.vercel.app).
 *
 * MISE EN LIGNE — passer a `true` ici, ET retirer le bloc `headers()` de
 * `next.config.ts` (en-tete X-Robots-Tag). Ce sont les deux seuls interrupteurs.
 */
export const SITE_INDEXABLE = false;

/** Image Open Graph par defaut (1200x630). */
export const DEFAULT_OG_IMAGE = "/og/cycle-consulting-og.png";

/**
 * Construit les metadonnees d'une page : titre (le gabarit du layout ajoute
 * " | Cycle Consulting"), description, URL canonique, Open Graph et Twitter.
 * `title` doit etre fourni SANS le suffixe de marque.
 */
export function pageMetadata(input: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  const branded = `${input.title} | ${SITE_NAME}`;
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: input.path },
    openGraph: {
      type: input.type ?? "website",
      siteName: SITE_NAME,
      title: branded,
      description: input.description,
      url: absoluteUrl(input.path),
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title: branded,
      description: input.description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

/** Rend une URL absolue a partir d'un chemin racine ("/x") ou d'une URL deja absolue. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

/**
 * Reseaux officiels de la marque (`sameAs` — desambiguisation d'entite).
 * A completer par Eric : URL LinkedIn / autres profils verifies. Tant que le
 * tableau est vide, la cle `sameAs` n'est pas emise.
 */
export const ORG_SAME_AS: string[] = [];

/** Donnees structurees Organization — communes a tout le site. */
export const organizationJsonLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: entreprise.nom,
  legalName: mentionsLegales.raisonSociale,
  url: SITE_URL,
  logo: absoluteUrl("/cycle-consulting-logo-color.svg"),
  image: absoluteUrl(DEFAULT_OG_IMAGE),
  slogan: entreprise.slogan,
  email: entreprise.email,
  telephone: entreprise.telephone,
  // Date d'immatriculation au RCS (extrait Kbis) — cf. data/entreprise.ts.
  foundingDate: "2026-08-04",
  vatID: mentionsLegales.numeroTva.replace(/\s+/g, ""),
  taxID: mentionsLegales.siret.replace(/\s+/g, ""),
  ...(ORG_SAME_AS.length > 0 ? { sameAs: ORG_SAME_AS } : {}),
  address: {
    "@type": "PostalAddress",
    streetAddress: entreprise.adresse,
    postalCode: entreprise.codePostalVille.split(" ")[0],
    addressLocality: entreprise.codePostalVille.split(" ").slice(1).join(" "),
    addressCountry: "FR",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: entreprise.email,
    telephone: entreprise.telephone,
    areaServed: "FR",
    availableLanguage: ["fr"],
  },
  areaServed: ["FR", "EU"],
};

/**
 * Donnees structurees BreadcrumbList. `items` du plus general au plus
 * specifique ; le dernier element = la page courante (sans `href`).
 */
export function breadcrumbJsonLd(items: { name: string; href?: string }[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  };
}

/**
 * Donnees structurees FAQPage a partir d'une liste question / reponse.
 * Le texte de `reponse` doit correspondre au texte visible sur la page.
 */
export function faqPageJsonLd(items: { question: string; reponse: string }[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.reponse },
    })),
  };
}

/** Donnees structurees Service — pour une page d'expertise. */
export function serviceJsonLd(input: {
  name: string;
  description: string;
  path: string;
  image: string;
  imageAlt?: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    image: absoluteUrl(input.image),
    provider: { "@type": "Organization", name: entreprise.nom, url: SITE_URL },
    areaServed: "FR",
  };
}

/**
 * Bloc `publisher` reutilisable pour les schemas `Article` (blog + cas clients).
 * `logo` en `ImageObject` (attendu par le schema Article).
 */
export const PUBLISHER_ORG: Record<string, unknown> = {
  "@type": "Organization",
  name: SITE_NAME,
  logo: { "@type": "ImageObject", url: absoluteUrl("/cycle-consulting-logo-color.svg") },
};

/** Bloc `author` reutilisable (redaction interne, non signee). */
export const AUTHOR_ORG: Record<string, unknown> = {
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
};

/** Donnees structurees WebSite. */
export const websiteJsonLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: entreprise.nom,
  url: SITE_URL,
  inLanguage: "fr-FR",
};
