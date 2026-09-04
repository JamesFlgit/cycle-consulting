import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import FaqAccordion from "@/components/ui/FaqAccordion";
import Slogan from "@/components/ui/Slogan";
import { faqThemes } from "@/data/faq";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Questions fréquentes",
  description:
    "Nos missions, nos consultants, nos modèles de prestation, nos services managés et notre logistique IT : les réponses aux questions que l'on nous pose le plus.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Questions fréquentes"
        description={
          <>
            <Slogan variant="light" />. Les réponses aux questions que l&apos;on nous pose le plus souvent.
          </>
        }
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
