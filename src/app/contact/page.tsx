import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/ui/ContactForm";
import Slogan from "@/components/ui/Slogan";
import { entreprise } from "@/data/entreprise";
import { EmailIcon } from "@/components/icons/card-icons";

export const metadata: Metadata = {
  title: "Infos & Réservation | Cycle Consulting",
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
        <div className="grid grid-cols-1 gap-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <Image
              src="/cycle-consulting-logo-wordmark.svg"
              alt="Cycle Consulting"
              width={241}
              height={164}
              className="h-20 w-auto"
            />
            <Slogan variant="dark" className="mt-4 text-lg font-semibold text-anthracite" />
            <a
              href={`mailto:${entreprise.email}`}
              className="mt-8 inline-flex items-center gap-2.5 rounded-md border border-border-subtle bg-surface-alt px-4 py-3 text-sm font-semibold text-anthracite transition-colors hover:border-anthracite"
            >
              <EmailIcon className="h-5 w-5 shrink-0 text-anthracite-mist" />
              {entreprise.email}
            </a>
          </div>

          <div className="md:col-span-3">
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
