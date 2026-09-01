import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import IntroLogoReveal from "@/components/layout/IntroLogoReveal";
import JsonLd from "@/components/seo/JsonLd";
import ConsentDefaults from "@/components/analytics/ConsentDefaults";
import Analytics from "@/components/analytics/Analytics";
import ConsentBanner from "@/components/analytics/ConsentBanner";
import { SITE_URL, DEFAULT_OG_IMAGE, organizationJsonLd, websiteJsonLd } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const description =
  "Cycle Consulting, ESN française : formations, service managé, infogérance, business & stratégie, ingénierie IT et logistique. Des consultants experts au service de votre performance.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Cycle Consulting | Apprendre, Comprendre, Entreprendre",
  description,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Cycle Consulting",
    title: "Cycle Consulting | Apprendre, Comprendre, Entreprendre",
    description,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: "Cycle Consulting" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cycle Consulting | Apprendre, Comprendre, Entreprendre",
    description,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${sora.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ConsentDefaults />
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <IntroLogoReveal />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <ConsentBanner />
      </body>
    </html>
  );
}
