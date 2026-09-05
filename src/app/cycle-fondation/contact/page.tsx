import type { Metadata } from "next";
import ContactForm from "@/components/ui/ContactForm";
import { pageMetadata } from "@/lib/site";
import { GOLD_ON_LIGHT, GOLD_TEXT_ON_LIGHT_BG, FoundationChildHero } from "../_shared";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Écoles, entreprises, professionnels de l'IT, associations ou particuliers : contactez CYCLE Foundation pour construire ensemble des dispositifs d'accompagnement des talents.",
  path: "/cycle-fondation/contact",
});

const ACTEURS = [
  {
    audience: "Vous êtes une école ?",
    reponse: "Construisons ensemble des dispositifs permettant d'identifier et d'accompagner les talents.",
  },
  {
    audience: "Vous êtes une entreprise ?",
    reponse: "Soutenez un parcours, développez un programme de mentorat ou contribuez au financement d'une formation.",
  },
  {
    audience: "Vous êtes un professionnel de l'IT ?",
    reponse: "Partagez votre expérience, accompagnez un étudiant et transmettez votre savoir.",
  },
  {
    audience: "Vous souhaitez soutenir notre action ?",
    reponse: "Votre contribution peut participer directement au financement de parcours éducatifs.",
  },
];

export default function CycleFondationContactPage() {
  return (
    <>
      <FoundationChildHero breadcrumbLabel="Contact" />

      <section className="bg-surface-alt">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">Contacter CYCLE Foundation</h1>
            <p className={`mt-4 text-base leading-relaxed ${GOLD_TEXT_ON_LIGHT_BG}`}>
              Le développement des talents est une responsabilité collective. Dites-nous comment vous
              souhaitez contribuer, nous revenons vers vous.
            </p>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-5 lg:gap-14">
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-neutral-900 sm:text-2xl">Comment contribuer</h2>
              <ul className="mt-5 space-y-4">
                {ACTEURS.map((acteur) => (
                  <li key={acteur.audience}>
                    <p className={`text-sm font-semibold ${GOLD_ON_LIGHT}`}>{acteur.audience}</p>
                    <p className={`mt-1 text-sm leading-relaxed ${GOLD_TEXT_ON_LIGHT_BG}`}>{acteur.reponse}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3">
              <ContactForm
                espace="foundation"
                sujet="Contact : CYCLE Foundation"
                sujetVisible={false}
                messagePlaceholder="Présentez votre structure ou votre démarche, et la façon dont vous souhaitez contribuer."
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
