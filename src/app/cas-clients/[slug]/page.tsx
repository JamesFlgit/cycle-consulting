import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import CasClientCard from "@/components/ui/CasClientCard";
import BrochureCtaButton from "@/components/ui/BrochureCtaButton";
import {
  casClients,
  getAutresCasClients,
  getCasClientBySlug,
  type CasClient,
  type CasClientSection,
} from "@/data/cas-clients";

// Brand gradient, dark variant — for the "Apprendre / Comprendre / Entreprendre /
// Résultats" section eyebrows on this page's light background.
const GRADIENT_DARK = "bg-gradient-to-r from-[#fa11f7] via-[#132bdd] to-[#0bceff] bg-clip-text text-transparent";
// Brand gradient, light variant — for the citation attribution on this
// section's dark background.
const GRADIENT_LIGHT = "bg-gradient-to-r from-[#f77bf0] via-[#6f8cf5] to-[#7ef0ff] bg-clip-text text-transparent";

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
  const title = casClient.metaTitle ?? `${casClient.navLabel} | Cycle Consulting`;
  const description = casClient.metaDescription ?? casClient.resume;
  const images = casClient.image
    ? [{ url: casClient.image, alt: casClient.imageAlt ?? casClient.navLabel }]
    : undefined;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: casClient.href },
    openGraph: { type: "article", siteName: "Cycle Consulting", title, description, url: casClient.href, images },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CasClientPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const casClient = getCasClientBySlug(slug);
  if (!casClient || !casClient.visible) notFound();

  const autresCas = getAutresCasClients(casClient.slug, 3);
  const resultatsLabel = casClient.actions ? "Résultats" : "Entreprendre";

  return (
    <>
      <PageHero
        eyebrow={<span className={GRADIENT_LIGHT}>{casClient.secteur}</span>}
        title={casClient.navLabel}
        titleClassName="mt-3 text-2xl font-bold text-balance text-white sm:text-3xl xl:text-[1.9rem] xl:leading-[1.2]"
        description={casClient.resume}
        image={casClient.image}
        imageAlt={casClient.imageAlt ?? ""}
        imageSide="right"
        tint="#0a1228"
        mobileFullBleedPhoto
      >
        {(casClient.environnement || casClient.expertise || casClient.profilMobilise) && (
          <dl className="mt-8 grid grid-cols-1 gap-6 border-t border-white/15 pt-6 sm:grid-cols-3">
            {casClient.environnement && <MetaItem label="Environnement" value={casClient.environnement} />}
            {casClient.expertise && <MetaItem label="Expertise mobilisée" value={casClient.expertise} />}
            {casClient.profilMobilise && <MetaItem label="Profil mobilisé" value={casClient.profilMobilise} />}
          </dl>
        )}

        {casClient.enjeuxTags && (
          <div className="mt-6 flex flex-wrap gap-2">
            {casClient.enjeuxTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/80"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-6 inline-flex items-start gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-xs leading-relaxed text-white/80 sm:text-sm">
          <LockIcon className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            Cas client anonymisé : les enjeux et résultats présentés sont réels, seul le nom du client n&apos;est
            pas communiqué, pour des raisons de confidentialité contractuelle.
          </span>
        </div>
      </PageHero>

      {casClient.chiffresCles && casClient.chiffresCles.length > 0 && (
        <section className="bg-anthracite py-10">
          <div className="mx-auto flex max-w-4xl flex-wrap justify-start gap-10 px-4 sm:px-6 lg:px-8">
            {casClient.chiffresCles.map((chiffre) => (
              <div key={chiffre.libelle} className="text-left">
                <p className={`text-4xl font-bold sm:text-5xl ${GRADIENT_LIGHT}`}>{chiffre.valeur}</p>
                <p className="mt-2 max-w-[16rem] text-xs font-medium uppercase tracking-wide text-white/70 sm:text-sm">
                  {chiffre.libelle}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:max-w-7xl lg:px-8">
        <div className="md:grid md:grid-cols-5 md:gap-12">
          <div className="space-y-16 md:col-span-3">
            <div className="md:hidden">
              <ConversionCard casClient={casClient} />
            </div>

            <div>
              <SectionEyebrow label="Apprendre" />
              <h2 className="mt-3 text-2xl font-bold text-anthracite sm:text-3xl">Le contexte</h2>
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-anthracite-soft sm:text-base">
                {casClient.contexte.map((paragraphe, index) => (
                  <p key={index}>{paragraphe}</p>
                ))}
              </div>

              {casClient.enjeux && (
                <div className="mt-8 rounded-xl border border-border-subtle bg-surface-alt p-6">
                  <p className="text-sm font-semibold text-anthracite">Les enjeux</p>
                  <ul className="mt-4 space-y-2.5">
                    {casClient.enjeux.map((enjeu) => (
                      <li key={enjeu} className="flex items-start gap-2.5 text-sm text-anthracite-soft">
                        <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-anthracite" />
                        <span>{enjeu}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div>
              <SectionEyebrow label="Comprendre" />
              <h2 className="mt-3 text-2xl font-bold text-anthracite sm:text-3xl">Notre intervention</h2>
              <div className="mt-6 space-y-6">
                {casClient.intervention.map((item) => (
                  <BarItem key={item.titre} item={item} />
                ))}
              </div>
            </div>

            {casClient.actions && (
              <div>
                <SectionEyebrow label="Entreprendre" />
                <h2 className="mt-3 text-2xl font-bold text-anthracite sm:text-3xl">Notre mise en œuvre</h2>
                <div className="mt-6 space-y-6">
                  {casClient.actions.map((item) => (
                    <BarItem key={item.titre} item={item} />
                  ))}
                </div>
              </div>
            )}

            <div>
              <SectionEyebrow label={resultatsLabel} />
              <h2 className="mt-3 text-2xl font-bold text-anthracite sm:text-3xl">Les résultats</h2>
              {casClient.resultatsIntro && (
                <p className="mt-5 text-sm leading-relaxed text-anthracite-soft sm:text-base">{casClient.resultatsIntro}</p>
              )}
              <div className="mt-6 space-y-6">
                {casClient.resultats.map((item) => (
                  <BarItem key={item.titre} item={item} checked />
                ))}
              </div>
            </div>

            {casClient.citation && (
              <blockquote className="rounded-xl bg-anthracite p-8 sm:p-10">
                <p className="text-lg font-medium italic leading-relaxed text-white sm:text-xl">
                  &laquo;&nbsp;{casClient.citation.texte}&nbsp;&raquo;
                </p>
                <footer className={`mt-4 text-sm font-semibold ${GRADIENT_LIGHT}`}>
                  {casClient.citation.attribution ?? "Cycle Consulting"}
                </footer>
              </blockquote>
            )}

            {casClient.conclusion && (
              <p className="text-sm leading-relaxed text-anthracite-soft sm:text-base">{casClient.conclusion}</p>
            )}

            <p className="border-t border-border-subtle pt-6 text-xs text-anthracite-mist">
              Ce cas client est présenté de façon anonymisée, conformément à nos engagements de confidentialité
              contractuelle. Les enjeux, l&apos;intervention et les résultats décrits sont réels ; seul le nom du
              client n&apos;est pas communiqué, à sa demande.
            </p>
          </div>

          <aside className="hidden md:col-span-2 md:block">
            <div className="sticky top-24">
              <ConversionCard casClient={casClient} />
            </div>
          </aside>
        </div>

        <div className="bg-callout-light mt-16 rounded-xl p-8 text-center sm:p-10">
          <h3 className="text-xl font-bold text-anthracite sm:text-2xl">Envie d&apos;aller plus loin ?</h3>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-anthracite-mist">
            Téléchargez notre brochure pour découvrir l&apos;ensemble de nos offres, ou parcourez nos autres
            cas clients.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <BrochureCtaButton className="cta-primary cta-primary-on-light rounded-md px-6 py-3 text-sm font-bold" />
            <Link
              href="/cas-clients"
              className="rounded-md px-6 py-3 text-sm font-bold text-anthracite underline-offset-4 hover:underline"
            >
              Voir tous les cas clients
            </Link>
          </div>
        </div>
      </section>

      {autresCas.length > 0 && (
        <section className="bg-surface-alt py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="À découvrir aussi" title="Nos autres réalisations" center />
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {autresCas.map((autre) => (
                <CasClientCard key={autre.slug} casClient={autre} imageHeader />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-white/50">{label}</dt>
      <dd className="mt-1 text-sm text-white/90">{value}</dd>
    </div>
  );
}

function SectionEyebrow({ label }: { label: string }) {
  return <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${GRADIENT_DARK}`}>{label}</p>;
}

/** Vertical gradient-bar row — see the Expertises pages for the same pattern. */
function BarItem({ item, checked = false }: { item: CasClientSection; checked?: boolean }) {
  return (
    <div className="flex gap-4 sm:gap-5">
      <span className="w-1.5 shrink-0 self-stretch rounded-full bg-gradient-to-b from-[#fa11f7] via-[#132bdd] to-[#0bceff]" />
      <div className="flex-1">
        <h3 className="flex items-start gap-2 text-sm font-semibold text-anthracite sm:text-base">
          {checked && <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#132bdd]" />}
          {item.titre}
        </h3>
        {item.description && <p className="mt-1.5 text-sm leading-relaxed text-anthracite-mist">{item.description}</p>}
      </div>
    </div>
  );
}

/** Persistent conversion CTA — sticky in the right rail on desktop, inline (non-sticky) on mobile. */
function ConversionCard({ casClient }: { casClient: CasClient }) {
  return (
    <div className="rounded-xl bg-gradient-to-r from-[#fa11f7] via-[#132bdd] to-[#0bceff] p-[1.5px] shadow-sm">
      <div className="rounded-[calc(0.75rem-1.5px)] bg-gradient-to-br from-bleu-nuit to-[#16305e] p-8">
        {(casClient.resumeDefi || casClient.resumeSolution) && (
          <div className="space-y-4">
            {casClient.resumeDefi && (
              <div>
                <div className="flex items-center gap-2">
                  <ChallengeIcon className="h-6 w-6 shrink-0 text-[#b878f0]" />
                  <p className="text-xl font-bold text-[#b878f0]">Le défi</p>
                </div>
                <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-white">{casClient.resumeDefi}</p>
              </div>
            )}
            {casClient.resumeSolution && (
              <div>
                <div className="flex items-center gap-2">
                  <SolutionIcon className="h-6 w-6 shrink-0 text-[#7ef0ff]" />
                  <p className="text-xl font-bold text-[#7ef0ff]">Notre solution</p>
                </div>
                <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-white">{casClient.resumeSolution}</p>
              </div>
            )}
          </div>
        )}

        {casClient.chiffresCles && casClient.chiffresCles.length > 0 && (
          <div className={`space-y-3 ${casClient.resumeDefi || casClient.resumeSolution ? "mt-5" : ""}`}>
            {casClient.chiffresCles.map((chiffre) => (
              <div key={chiffre.libelle} className="rounded-lg bg-surface p-4">
                <p className="text-3xl font-bold text-anthracite">{chiffre.valeur}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-anthracite-mist">{chiffre.libelle}</p>
              </div>
            ))}
          </div>
        )}

        <div
          className={
            casClient.resumeDefi || casClient.resumeSolution || (casClient.chiffresCles && casClient.chiffresCles.length > 0)
              ? "mt-6 border-t border-white/15 pt-6"
              : ""
          }
        >
          <h3 className="text-lg font-bold text-white">Un enjeu similaire dans votre organisation ?</h3>
          <p className="mt-3 text-sm leading-relaxed text-white">
            Échangez avec un consultant Cycle sur votre contexte et vos enjeux.
          </p>
          <Link
            href="/contact"
            className="cta-primary cta-primary-light mt-4 block w-full rounded-md px-4 py-2.5 text-center text-sm font-bold uppercase tracking-wide"
          >
            Discuter de mon projet
          </Link>
        </div>
      </div>
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}

function ChallengeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function SolutionIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.5.4.8 1 .8 1.6v.5h5.4v-.5c0-.6.3-1.2.8-1.6A6 6 0 0 0 12 3Z" />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}
