import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ui/ContactForm";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Demander un parrainage",
  description:
    "Un membre du Cycle Club peut proposer votre candidature. Transmettez vos coordonnées, nous revenons vers vous.",
  path: "/cycle-club/parrainage",
});

export default function CycleClubParrainagePage() {
  return (
    <section className="bg-[#0c0b13]">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Link href="/cycle-club" className="text-sm text-white/60 transition-colors hover:text-white">
          &larr; Cycle Club
        </Link>

        <h1 className="mt-6 text-3xl font-bold text-white sm:text-4xl">Demander un parrainage</h1>
        <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
          L&apos;accès au Cycle Club se fait sur recommandation. Si un membre du club souhaite vous
          parrainer, transmettez-nous vos coordonnées et le nom de votre parrain : nous revenons vers
          vous pour la suite.
        </p>

        <div className="mt-10">
          <ContactForm
            espace="club"
            sujet="Cycle Club - Demande de parrainage"
            sujetVisible={false}
            messagePlaceholder="Présentez-vous en quelques mots et indiquez le nom du membre du Cycle Club qui vous parraine."
          />
        </div>
      </div>
    </section>
  );
}
