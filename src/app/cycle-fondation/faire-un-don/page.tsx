import type { Metadata } from "next";
import ContactForm from "@/components/ui/ContactForm";
import { pageMetadata } from "@/lib/site";
import { GOLD_ON_LIGHT, GOLD_TEXT_ON_LIGHT_BG, FoundationChildHero } from "../_shared";

export const metadata: Metadata = pageMetadata({
  title: "Faire un don",
  description:
    "Soutenez CYCLE Foundation : votre don finance des parcours d'études, du mentorat et l'accès aux métiers de l'IT pour de jeunes talents, en France et à l'international.",
  path: "/cycle-fondation/faire-un-don",
});

const CE_QUE_FINANCE = [
  "Le financement de parcours d'études dans les métiers de l'IT",
  "L'accompagnement et le mentorat par des professionnels",
  "L'accès au matériel et aux ressources pédagogiques",
  "Des partenariats éducatifs en République démocratique du Congo, à Abidjan et au Sénégal",
];

export default function FaireUnDonPage() {
  return (
    <>
      <FoundationChildHero breadcrumbLabel="Faire un don" />

      <section className="bg-surface-alt">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">Faire un don à CYCLE Foundation</h1>
            <p className={`mt-4 text-base leading-relaxed ${GOLD_TEXT_ON_LIGHT_BG}`}>
              Chaque contribution participe directement au financement de parcours éducatifs et à
              l&apos;émergence de nouvelles compétences dans les métiers de l&apos;IT.
            </p>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-5 lg:gap-14">
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-neutral-900 sm:text-2xl">Ce que votre don finance</h2>
              <ul className="mt-5 space-y-3">
                {CE_QUE_FINANCE.map((item) => (
                  <li key={item} className={`flex gap-2.5 text-sm leading-relaxed ${GOLD_TEXT_ON_LIGHT_BG}`}>
                    <span aria-hidden="true" className={`font-bold ${GOLD_ON_LIGHT}`}>
                      ›
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs leading-relaxed text-anthracite-mist">
                Les modalités de don (virement, et le cas échéant reçu fiscal) vous sont communiquées en
                réponse à votre message. CYCLE Foundation précisera prochainement un dispositif de don en
                ligne.
              </p>
            </div>

            <div className="lg:col-span-3">
              <ContactForm
                espace="foundation"
                sujet="Faire un don : CYCLE Foundation"
                sujetVisible={false}
                messagePlaceholder="Indiquez le montant ou la nature du don envisagé, et vos éventuelles questions sur les modalités."
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
