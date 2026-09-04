import type { Metadata } from "next";
import { entreprise } from "@/data/entreprise";

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

/** Donnees structurees Organization — communes a tout le site. */
export const organizationJsonLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: entreprise.nom,
  url: SITE_URL,
  logo: absoluteUrl("/cycle-consulting-logo-color.svg"),
  image: absoluteUrl(DEFAULT_OG_IMAGE),
  slogan: entreprise.slogan,
  email: entreprise.email,
  telephone: entreprise.telephone,
  address: {
    "@type": "PostalAddress",
    streetAddress: entreprise.adresse,
    postalCode: entreprise.codePostalVille.split(" ")[0],
    addressLocality: entreprise.codePostalVille.split(" ").slice(1).join(" "),
    addressCountry: "FR",
  },
};

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

/** Donnees structurees WebSite. */
export const websiteJsonLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: entreprise.nom,
  url: SITE_URL,
  inLanguage: "fr-FR",
};
