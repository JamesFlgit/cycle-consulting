import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF d'abord (navigateurs recents), WebP en repli. Gain ~40-50% vs WebP seul.
    formats: ["image/avif", "image/webp"],
    // Requis depuis Next 16. 82 pour les heros plein ecran, 75 par defaut ailleurs.
    qualities: [75, 82],
    // Les images marketing ne changent pas apres publication : cache 31 jours.
    minimumCacheTTL: 2678400,
  },
  // MISE EN LIGNE : retirer ce bloc `headers()` le jour du lancement (et passer
  // SITE_INDEXABLE a true dans src/lib/site.ts). Il empeche toute indexation du
  // deploiement de preprod, y compris l'URL *.vercel.app.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noimageindex, nosnippet" }],
      },
    ];
  },
};

export default nextConfig;
