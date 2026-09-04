import type { MetadataRoute } from "next";
import { SITE_URL, SITE_INDEXABLE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Tant que le site n'est pas en ligne : on bloque tout (voir SITE_INDEXABLE).
  if (!SITE_INDEXABLE) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
