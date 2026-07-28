import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/ui/ContactForm";
import { entreprise } from "@/data/entreprise";

export const metadata: Metadata = {
  title: "Infos & Réservation — Cycle Consulting",
  description: "Contactez les Consultants Cycle Consulting pour vos projets IT, formations et stratégie.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Infos & Réservation"
        description="Une question, un projet, une demande de devis ? Notre équipe vous répond rapidement."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Image
              src="/cycle-consulting-logo-wordmark.svg"
              alt="Cycle Consulting"
              width={220}
              height={144}
              className="h-20 w-auto"
            />
            <div className="mt-8 space-y-4 text-sm text-anthracite-soft">
              <div>
                <p className="font-semibold text-anthracite">Adresse</p>
                <p>{entreprise.adresse}</p>
                <p>{entreprise.codePostalVille}</p>
              </div>
              <div>
                <p className="font-semibold text-anthracite">Téléphone</p>
                <p>{entreprise.telephone}</p>
              </div>
              <div>
                <p className="font-semibold text-anthracite">E-mail</p>
                <p>{entreprise.email}</p>
              </div>
              <div>
                <p className="font-semibold text-anthracite">Horaires</p>
                <p>{entreprise.horaires}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-lg font-semibold text-anthracite">Nous contacter</h2>
            <p className="mt-2 text-sm text-anthracite-mist">
              Les champs marqués d&apos;un astérisque (*) sont obligatoires.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
