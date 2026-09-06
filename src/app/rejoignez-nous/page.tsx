import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/ui/ContactForm";
import OffreEmploiCard from "@/components/ui/OffreEmploiCard";
import { pageMetadata } from "@/lib/site";
import { getEvenementsAVenir } from "@/data/evenements";
import { getOffresEmploiVisibles } from "@/data/offres-emploi";

// Brand gradient, light variant — for the eyebrow on the dark hero.
const GRADIENT_LIGHT = "bg-gradient-to-r from-[#f77bf0] via-[#6f8cf5] to-[#7ef0ff] bg-clip-text text-transparent";

export const metadata: Metadata = pageMetadata({
  title: "Rejoignez-nous",
  description:
    "Consultants, techniciens et experts IT : Cycle Consulting recrute en permanence pour ses missions clients, quel que soit votre niveau d'expérience.",
  path: "/rejoignez-nous",
});

export default function RejoignezNousPage() {
  const today = new Date().toISOString().slice(0, 10);
  const salonsRecrutement = getEvenementsAVenir(today).filter((e) => e.recrutement);
  const offres = getOffresEmploiVisibles();

  return (
    <>
      <PageHero
        eyebrow={<span className={GRADIENT_LIGHT}>Rejoignez-nous</span>}
        title="Consultants, techniciens, experts IT : construisons la suite ensemble"
        titleClassName="mt-3 text-2xl font-bold text-balance text-white sm:text-3xl xl:text-[2rem] xl:leading-[1.2]"
        description="Cycle Consulting recrute en permanence des profils IT pour renforcer ses équipes et ses missions chez ses clients, quel que soit votre niveau d'expérience."
        image="/images/rejoignez-nous/hero.webp"
        imageAlt="Un consultant Cycle Consulting et une nouvelle recrue se serrent la main devant un tableau de profils lumineux"
        imageSide="right"
        tint="#3133a0"
      />

      <section id="candidature" className="mx-auto max-w-4xl px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Candidature spontanée"
          title="Envoyez-nous votre candidature"
          description="Nous recrutons en continu, sur l'ensemble de nos pôles d'expertise et quel que soit votre niveau d'expérience."
        />

        <div className="mt-8 space-y-4 text-sm leading-relaxed text-anthracite-soft">
          <p>
            Que vous soyez consultant confirmé, technicien de proximité ou en reconversion vers les
            métiers de l&apos;IT, Cycle Consulting vous accompagne dans vos missions et votre montée en
            compétence, sur l&apos;ensemble de ses pôles d&apos;expertise.
          </p>
          <p>
            Envoyez-nous votre candidature via le formulaire ci-dessous. Un consultant Cycle vous
            recontactera pour échanger sur vos disponibilités et les missions en cours.
          </p>
        </div>

        {salonsRecrutement.length > 0 && (
          <div className="mt-8 rounded-xl border border-border-subtle bg-surface-alt p-6">
            <p className="text-sm font-semibold text-anthracite">Retrouvez-nous aussi en salon étudiant</p>
            {salonsRecrutement.map((salon) => (
              <p key={salon.slug} className="mt-2 text-sm leading-relaxed text-anthracite-soft">
                {salon.nom}, le {salon.dateLabel} à {salon.ville}.
              </p>
            ))}
            <Link
              href="/evenements"
              className="mt-3 inline-block text-sm font-semibold text-[#132bdd] hover:underline"
            >
              Voir tous nos salons et évènements →
            </Link>
          </div>
        )}

        <div className="mt-10">
          <ContactForm />
        </div>
      </section>

      {offres.length > 0 && (
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Nos offres"
              title="Les postes à pourvoir"
              description="Une mission précise vous intéresse ? Chaque offre détaille le profil recherché, les compétences clés et la marche à suivre pour candidater."
            />
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {offres.map((offre) => (
                <OffreEmploiCard key={offre.slug} offre={offre} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
