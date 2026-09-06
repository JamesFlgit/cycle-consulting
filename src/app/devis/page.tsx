import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/ui/ContactForm";
import Slogan from "@/components/ui/Slogan";
import { entreprise } from "@/data/entreprise";
import { EmailIcon } from "@/components/icons/card-icons";
import { getPoleBySlug } from "@/data/poles";
import { pageMetadata } from "@/lib/site";

// Brand gradient, light variant — for the eyebrow on the dark hero.
const GRADIENT_LIGHT = "bg-gradient-to-r from-[#f77bf0] via-[#6f8cf5] to-[#7ef0ff] bg-clip-text text-transparent";

export const metadata: Metadata = pageMetadata({
  title: "Demander un devis",
  description:
    "Décrivez votre besoin IT à Cycle Consulting : conseil, service managé, ingénierie, logistique ou formation. Réponse rapide et proposition chiffrée.",
  path: "/devis",
});

const ETAPES = [
  "Vous décrivez votre contexte et votre besoin.",
  "Un consultant vous recontacte pour cadrer le périmètre.",
  "Vous recevez une proposition chiffrée adaptée.",
];

export default async function DevisPage({
  searchParams,
}: {
  // `?prestation=<slug de pôle>` : renseigné par les CTA « Demander un devis »
  // des pages d'expertise, pour préremplir l'objet de la demande.
  searchParams: Promise<{ prestation?: string | string[] }>;
}) {
  const { prestation } = await searchParams;
  const slug = Array.isArray(prestation) ? prestation[0] : prestation;
  const pole = slug ? getPoleBySlug(slug) : undefined;
  const sujet = pole ? `Demande de devis : ${pole.navLabel}` : "Demande de devis";

  return (
    <>
      <PageHero
        breadcrumb={[{ name: "Accueil", href: "/" }, { name: "Demander un devis" }]}
        eyebrow={<span className={GRADIENT_LIGHT}>Devis</span>}
        title="Demander un devis"
        description="Parlez-nous de votre projet IT : nous revenons vers vous rapidement avec une proposition adaptée à votre contexte."
        image="/images/contact/hero.webp"
        imageAlt="Une consultante Cycle Consulting avec un casque répond à la demande d'un visiteur devant un panneau lumineux"
        imageSide="right"
        tint="#1e2283"
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

            {pole && (
              <p className="mt-6 rounded-md bg-surface-alt px-3 py-2 text-sm text-anthracite">
                <span className="font-semibold">Prestation :</span>{" "}
                <Link href={pole.href} className="underline underline-offset-2">
                  {pole.navLabel}
                </Link>
              </p>
            )}

            <h2 className="mt-8 text-sm font-semibold uppercase tracking-wide text-anthracite-mist">
              Comment ça se passe
            </h2>
            <ol className="mt-4 space-y-3">
              {ETAPES.map((etape, index) => (
                <li key={etape} className="flex gap-3 text-sm leading-relaxed text-anthracite-soft">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-alt text-xs font-bold text-anthracite">
                    {index + 1}
                  </span>
                  <span>{etape}</span>
                </li>
              ))}
            </ol>

            <a
              href={`mailto:${entreprise.email}`}
              className="mt-8 inline-flex items-center gap-2.5 rounded-md border border-border-subtle bg-surface-alt px-4 py-3 text-sm font-semibold text-anthracite transition-colors hover:border-anthracite"
            >
              <EmailIcon className="h-5 w-5 shrink-0 text-anthracite-mist" />
              {entreprise.email}
            </a>
          </div>

          <div className="md:col-span-3">
            <h2 className="text-lg font-semibold text-anthracite">Votre demande de devis</h2>
            <p className="mt-2 text-sm text-anthracite-mist">
              Les champs marqués d&apos;un astérisque (*) sont obligatoires.
            </p>
            <div className="mt-6">
              <ContactForm
                sujet={sujet}
                sujetVisible={false}
                messagePlaceholder="Décrivez votre besoin : contexte, périmètre, volumétrie, échéance visée, et toute contrainte utile."
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
