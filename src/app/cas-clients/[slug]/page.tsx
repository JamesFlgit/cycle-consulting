import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import { casClients, getCasClientBySlug } from "@/data/cas-clients";

export function generateStaticParams() {
  return casClients.filter((c) => c.visible).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const casClient = getCasClientBySlug(slug);
  if (!casClient) return {};
  return {
    title: casClient.metaTitle ?? `${casClient.navLabel} — Cycle Consulting`,
    description: casClient.metaDescription ?? casClient.resume,
  };
}

export default async function CasClientPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const casClient = getCasClientBySlug(slug);
  if (!casClient || !casClient.visible) notFound();

  return (
    <>
      <PageHero
        eyebrow={casClient.secteur}
        title={casClient.navLabel}
        description={casClient.tailleEntreprise ? `Organisation de ${casClient.tailleEntreprise}.` : undefined}
      />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-10 text-sm leading-relaxed text-anthracite-soft">
          <div>
            <h2 className="text-lg font-semibold text-anthracite">Le contexte</h2>
            <p className="mt-3">
              {casClient.resume} Cette organisation faisait face à des enjeux de continuité de service,
              de maîtrise des coûts et de montée en compétence de ses équipes, dans un contexte de forte
              exigence opérationnelle propre au secteur {casClient.secteur.toLowerCase()}.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-anthracite">Notre accompagnement</h2>
            <p className="mt-3">
              Les Consultants Cycle Consulting sont intervenus aux côtés des équipes internes pour
              cadrer les besoins, déployer les ressources adaptées et piloter la montée en charge du
              dispositif, dans une logique de transfert de compétences et d&apos;amélioration continue.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-anthracite">Les résultats</h2>
            <p className="mt-3">
              Un dispositif stabilisé, une relation de confiance installée dans la durée, et une base
              solide pour accompagner les prochaines phases de transformation de l&apos;organisation.
            </p>
          </div>

          <p className="border-t border-border-subtle pt-6 text-xs text-anthracite-mist">
            Référence présentée de façon anonymisée, conformément à nos engagements de confidentialité
            contractuelle.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/contact" className="cta-primary cta-primary-on-light rounded-md px-6 py-3 text-sm font-bold">
            Nous contacter
          </Link>
          <Link
            href="/cas-clients"
            className="rounded-md border border-border-subtle px-6 py-3 text-sm font-bold text-anthracite transition-colors hover:bg-surface-alt"
          >
            Voir tous les cas clients
          </Link>
        </div>
      </section>
    </>
  );
}
