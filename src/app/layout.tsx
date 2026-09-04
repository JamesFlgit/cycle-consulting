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
import { SITE_URL, DEFAULT_OG_IMAGE, SITE_INDEXABLE, organizationJsonLd, websiteJsonLd } from "@/lib/site";

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
  "ESN française : conseil, services managés, infogérance, ingénierie IT, logistique et formations. Des consultants experts au service de votre performance IT.";

const homeTitle = "Cycle Consulting | ESN conseil, services managés et formation IT";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: homeTitle,
    template: "%s | Cycle Consulting",
  },
  description,
  alternates: { canonical: "/" },
  applicationName: "Cycle Consulting",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Cycle Consulting",
    url: SITE_URL,
    title: homeTitle,
    description,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: "Cycle Consulting" }],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: SITE_INDEXABLE
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      }
    : {
        index: false,
        follow: false,
        nocache: true,
        googleBot: { index: false, follow: false, noimageindex: true },
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
