import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { poles } from "@/data/poles";
import { articles } from "@/data/articles";
import { casClients } from "@/data/cas-clients";
import { offresEmploi } from "@/data/offres-emploi";

type Entry = MetadataRoute.Sitemap[number];

const abs = (path: string) => `${SITE_URL}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  // `lastModified` stable : date du commit deploye (Vercel) ou date de build en
  // local. Evite un `lastmod` qui change a chaque crawl et dilue le signal.
  const lastBuild = new Date(process.env.VERCEL_GIT_COMMIT_DATE ?? Date.now());

  const staticEntries: Entry[] = [
    { url: abs("/"), lastModified: lastBuild, changeFrequency: "weekly", priority: 1 },
    { url: abs("/a-propos"), lastModified: lastBuild, changeFrequency: "monthly", priority: 0.8 },
    { url: abs("/ressources"), lastModified: lastBuild, changeFrequency: "weekly", priority: 0.8 },
    { url: abs("/cas-clients"), lastModified: lastBuild, changeFrequency: "monthly", priority: 0.7 },
    { url: abs("/evenements"), lastModified: lastBuild, changeFrequency: "weekly", priority: 0.6 },
    { url: abs("/contact"), lastModified: lastBuild, changeFrequency: "yearly", priority: 0.7 },
    { url: abs("/devis"), lastModified: lastBuild, changeFrequency: "yearly", priority: 0.8 },
    { url: abs("/faq"), lastModified: lastBuild, changeFrequency: "monthly", priority: 0.6 },
    { url: abs("/cycle-fondation"), lastModified: lastBuild, changeFrequency: "monthly", priority: 0.6 },
    { url: abs("/cycle-fondation/faire-un-don"), lastModified: lastBuild, changeFrequency: "monthly", priority: 0.6 },
    { url: abs("/cycle-fondation/contact"), lastModified: lastBuild, changeFrequency: "yearly", priority: 0.4 },
    { url: abs("/cycle-club"), lastModified: lastBuild, changeFrequency: "yearly", priority: 0.3 },
    { url: abs("/cycle-club/parrainage"), lastModified: lastBuild, changeFrequency: "yearly", priority: 0.2 },
    { url: abs("/cycle-club/connexion"), lastModified: lastBuild, changeFrequency: "yearly", priority: 0.2 },
    { url: abs("/rejoignez-nous"), lastModified: lastBuild, changeFrequency: "monthly", priority: 0.5 },
    { url: abs("/livre-or"), lastModified: lastBuild, changeFrequency: "monthly", priority: 0.4 },
    { url: abs("/mentions-legales"), lastModified: lastBuild, changeFrequency: "yearly", priority: 0.2 },
    { url: abs("/politique-de-confidentialite"), lastModified: lastBuild, changeFrequency: "yearly", priority: 0.2 },
  ];

  const poleEntries: Entry[] = poles
    .filter((p) => p.visible)
    .map((p) => ({ url: abs(p.href), lastModified: lastBuild, changeFrequency: "monthly", priority: 0.9 }));

  const articleEntries: Entry[] = articles
    .filter((a) => a.visible)
    .map((a) => ({
      url: abs(a.href),
      lastModified: new Date(a.dateISO),
      changeFrequency: "yearly",
      priority: 0.7,
    }));

  const casClientEntries: Entry[] = casClients
    .filter((c) => c.visible)
    .map((c) => ({ url: abs(c.href), lastModified: lastBuild, changeFrequency: "yearly", priority: 0.6 }));

  const offreEmploiEntries: Entry[] = offresEmploi
    .filter((o) => o.visible)
    .map((o) => ({
      url: abs(o.href),
      lastModified: new Date(o.datePublication),
      changeFrequency: "monthly",
      priority: 0.5,
    }));

  return [
    ...staticEntries,
    ...poleEntries,
    ...articleEntries,
    ...casClientEntries,
    ...offreEmploiEntries,
  ];
}
