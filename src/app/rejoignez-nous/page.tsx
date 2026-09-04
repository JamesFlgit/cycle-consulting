import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/ui/ContactForm";
import { pageMetadata } from "@/lib/site";
import { getEvenementsAVenir } from "@/data/evenements";

export const metadata: Metadata = pageMetadata({
  title: "Rejoignez-nous",
  description:
    "Consultants, techniciens et experts IT : Cycle Consulting recrute en permanence pour ses missions clients, quel que soit votre niveau d'expérience.",
  path: "/rejoignez-nous",
});

export default function RejoignezNousPage() {
  const today = new Date().toISOString().slice(0, 10);
  const salonsRecrutement = getEvenementsAVenir(today).filter((e) => e.recrutement);

  return (
    <>
      <PageHero
        eyebrow="Rejoignez-nous"
        title="Consultants, techniciens, experts IT : construisons la suite ensemble"
        description="Cycle Consulting recrute en permanence des profils IT pour renforcer ses équipes et ses missions chez ses clients, quel que soit votre niveau d'expérience."
      />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-4 text-sm leading-relaxed text-anthracite-soft">
          <p>
            Que vous soyez consultant confirmé, technicien de proximité, ou en reconversion vers les
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
    </>
  );
}
