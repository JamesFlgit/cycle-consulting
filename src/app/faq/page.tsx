import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import FaqAccordion from "@/components/ui/FaqAccordion";
import Slogan from "@/components/ui/Slogan";
import JsonLd from "@/components/seo/JsonLd";
import { faqThemes } from "@/data/faq";
import { pageMetadata, faqPageJsonLd } from "@/lib/site";

// Toutes les questions de la page, a plat, pour le JSON-LD FAQPage.
const faqJsonLd = faqPageJsonLd(
  faqThemes.flatMap((theme) => theme.items).map(({ question, reponse }) => ({ question, reponse })),
);

// Brand gradient, light variant — for the eyebrow on the dark hero.
const GRADIENT_LIGHT = "bg-gradient-to-r from-[#f77bf0] via-[#6f8cf5] to-[#7ef0ff] bg-clip-text text-transparent";

export const metadata: Metadata = pageMetadata({
  title: "Questions fréquentes",
  description:
    "Nos missions, nos consultants, nos modèles de prestation, nos services managés, notre logistique IT : les réponses aux questions les plus fréquentes.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <PageHero
        breadcrumb={[{ name: "Accueil", href: "/" }, { name: "FAQ" }]}
        eyebrow={<span className={GRADIENT_LIGHT}>FAQ</span>}
        title="Questions fréquentes"
        description={
          <>
            <Slogan variant="light" className="block" />
            <span className="mt-2 block">
              Les réponses aux questions que l&apos;on nous pose le plus souvent.
            </span>
          </>
        }
        image="/images/faq/hero.webp"
        imageAlt="Une consultante Cycle Consulting répond aux questions d'un visiteur devant un panneau lumineux de questions fréquentes"
        imageSide="right"
        tint="#1e2082"
      />

      <section className="mx-auto max-w-4xl space-y-16 px-4 py-16 sm:px-6 lg:px-8">
        {faqThemes.map((theme) => (
          <div key={theme.theme}>
            <h2 className="text-2xl font-bold text-anthracite sm:text-3xl">{theme.theme}</h2>
            <div className="mt-6">
              <FaqAccordion theme={theme} />
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
