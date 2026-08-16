import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Blog & Ressources — Cycle Consulting",
  description: "Actualités, guides et ressources IT à venir de la part de Cycle Consulting.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Ressources"
        title="Blog & Ressources"
        description="Nos articles, guides et ressources sur les métiers de l'IT arrivent bientôt."
      />

      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="text-sm leading-relaxed text-anthracite-soft">
          Cette rubrique est en préparation. En attendant, nos consultants restent disponibles pour
          répondre directement à vos questions.
        </p>
        <div className="mt-8">
          <Link href="/contact" className="cta-primary cta-primary-on-light rounded-md px-6 py-3 text-sm font-bold">
            Nous contacter
          </Link>
        </div>
      </section>
    </>
  );
}
