import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/ui/ContactForm";

export const metadata: Metadata = {
  title: "Rejoignez-nous | Cycle Consulting",
  description: "Consultants, techniciens, experts IT : rejoignez les équipes de Cycle Consulting.",
};

export default function RejoignezNousPage() {
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

        <div className="mt-10">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
