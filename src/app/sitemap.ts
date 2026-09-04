import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { poles } from "@/data/poles";
import { articles } from "@/data/articles";
import { casClients } from "@/data/cas-clients";

type Entry = MetadataRoute.Sitemap[number];

const abs = (path: string) => `${SITE_URL}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: Entry[] = [
    { url: abs("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: abs("/a-propos"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: abs("/ressources"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: abs("/cas-clients"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: abs("/evenements"), lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: abs("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: abs("/faq"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: abs("/rejoignez-nous"), lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: abs("/livre-or"), lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: abs("/mentions-legales"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: abs("/politique-de-confidentialite"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const poleEntries: Entry[] = poles
    .filter((p) => p.visible)
    .map((p) => ({ url: abs(p.href), lastModified: now, changeFrequency: "monthly", priority: 0.9 }));

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
    .map((c) => ({ url: abs(c.href), lastModified: now, changeFrequency: "yearly", priority: 0.6 }));

  return [...staticEntries, ...poleEntries, ...articleEntries, ...casClientEntries];
}
