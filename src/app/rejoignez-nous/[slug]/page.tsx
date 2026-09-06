import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/ui/ContactForm";
import OffreEmploiCard from "@/components/ui/OffreEmploiCard";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL, absoluteUrl } from "@/lib/site";
import { entreprise } from "@/data/entreprise";
import {
  offresEmploi,
  getOffreEmploiBySlug,
  getOffresEmploiVisibles,
} from "@/data/offres-emploi";

// Brand gradient, light variant — for the eyebrow on the dark hero.
const GRADIENT_LIGHT = "bg-gradient-to-r from-[#f77bf0] via-[#6f8cf5] to-[#7ef0ff] bg-clip-text text-transparent";
// Brand gradient, dark variant — for accents on the light body.
const GRADIENT_DARK = "bg-gradient-to-r from-[#fa11f7] via-[#132bdd] to-[#0bceff] bg-clip-text text-transparent";

export function generateStaticParams() {
  return offresEmploi.filter((o) => o.visible).map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const offre = getOffreEmploiBySlug(slug);
  if (!offre) return {};
  return {
    title: { absolute: offre.metaTitle },
    description: offre.metaDescription,
    alternates: { canonical: offre.href },
    openGraph: {
      type: "article",
      siteName: "Cycle Consulting",
      title: offre.metaTitle,
      description: offre.metaDescription,
      url: offre.href,
    },
    twitter: { card: "summary_large_image", title: offre.metaTitle, description: offre.metaDescription },
  };
}

export default async function OffreEmploiPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const offre = getOffreEmploiBySlug(slug);
  if (!offre || !offre.visible) notFound();

  const autresOffres = getOffresEmploiVisibles().filter((o) => o.slug !== offre.slug);
  // Objet de l'e-mail envoyé à contact@cycle-consulting.fr, dérivé de l'offre.
  const objetCandidature = `Candidature : ${offre.intitulePoste}`;
  const mailtoCandidature = `mailto:${entreprise.email}?subject=${encodeURIComponent(objetCandidature)}`;

  // Description JobPosting : accroche + profil recherché + compétences clés, en
  // HTML léger (le format attendu par les données structurées Google).
  const descriptionHtml = [
    `<p>${offre.accroche}</p>`,
    "<p><strong>Profil recherché</strong></p><ul>",
    ...offre.profilRecherche.map((p) => `<li>${p}</li>`),
    "</ul>",
    ...offre.competences.flatMap((bloc) => [
      `<p><strong>${bloc.titre}</strong></p><ul>`,
      ...bloc.points.map((point) => `<li>${point}</li>`),
      "</ul>",
    ]),
  ].join("");

  const jobPostingJsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: offre.intitulePoste,
    description: descriptionHtml,
    datePosted: offre.datePublication,
    ...(offre.typeContrat === "CDI" && { employmentType: "FULL_TIME" }),
    directApply: true,
    hiringOrganization: {
      "@type": "Organization",
      name: entreprise.nom,
      sameAs: SITE_URL,
      logo: absoluteUrl("/cycle-consulting-logo-color.svg"),
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: entreprise.adresse,
        postalCode: entreprise.codePostalVille.split(" ")[0],
        addressLocality: entreprise.codePostalVille.split(" ").slice(1).join(" "),
        addressCountry: "FR",
      },
    },
    applicantLocationRequirements: { "@type": "Country", name: "France" },
    url: `${SITE_URL}${offre.href}`,
    mainEntityOfPage: `${SITE_URL}${offre.href}`,
  };

  return (
    <>
      <JsonLd data={jobPostingJsonLd} />
      <PageHero
        breadcrumb={[
          { name: "Accueil", href: "/" },
          { name: "Rejoignez-nous", href: "/rejoignez-nous" },
          { name: offre.titre },
        ]}
        eyebrow={<span className={GRADIENT_LIGHT}>Mission à pourvoir</span>}
        title={offre.intitulePoste}
        titleClassName="mt-3 max-w-4xl text-2xl font-bold text-white sm:text-3xl lg:text-4xl"
        description={offre.accroche}
      >
        <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 border-t border-white/15 pt-6 text-xs text-white/70 sm:text-sm">
          <span>{offre.lieu}</span>
          {offre.typeContrat && (
            <>
              <span aria-hidden="true">·</span>
              <span>{offre.typeContrat}</span>
            </>
          )}
          <span aria-hidden="true">·</span>
          <span>Cycle Consulting recrute</span>
        </div>
      </PageHero>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:max-w-7xl lg:px-8">
        <div className="md:grid md:grid-cols-5 md:gap-12">
          <div className="space-y-14 md:col-span-3">
            <div className="md:hidden">
              <CandidatureCard offre={offre} mailto={mailtoCandidature} />
            </div>

            <div>
              <SectionEyebrow label="Profil recherché" />
              <h2 className="mt-3 text-2xl font-bold text-anthracite sm:text-3xl">
                Le profil que nous cherchons
              </h2>
              <ul className="mt-6 space-y-3">
                {offre.profilRecherche.map((point) => (
                  <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-anthracite-soft sm:text-base">
                    <CheckMark />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <SectionEyebrow label="Compétences clés" />
              <h2 className="mt-3 text-2xl font-bold text-anthracite sm:text-3xl">Ce que vous piloterez</h2>
              <div className="mt-6 space-y-6">
                {offre.competences.map((bloc) => (
                  <div key={bloc.titre} className="flex gap-4 sm:gap-5">
                    <span className="w-1.5 shrink-0 self-stretch rounded-full bg-gradient-to-b from-[#fa11f7] via-[#132bdd] to-[#0bceff]" />
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-anthracite sm:text-base">{bloc.titre}</h3>
                      <ul className="mt-2 space-y-2">
                        {bloc.points.map((point) => (
                          <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-anthracite-mist">
                            <CheckMark />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {offre.perimetre && (
              <div className="rounded-xl border border-border-subtle bg-surface-alt p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-anthracite-mist">Périmètre du poste</p>
                <p className="mt-2 text-sm leading-relaxed text-anthracite-soft">{offre.perimetre.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {offre.perimetre.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border-subtle bg-surface px-3 py-1 text-xs font-medium text-anthracite-mist"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <p className="border-t border-border-subtle pt-6 text-xs text-anthracite-mist">
              Cycle Consulting étudie chaque candidature quel que soit le niveau d&apos;expérience. Les postes
              sont ouverts aux personnes en situation de handicap.
            </p>
          </div>

          <aside className="hidden md:col-span-2 md:block">
            <div className="sticky top-24">
              <CandidatureCard offre={offre} mailto={mailtoCandidature} />
            </div>
          </aside>
        </div>
      </section>

      <section id="candidature" className="scroll-mt-24 bg-surface-alt">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Candidater"
            title={`Postuler : ${offre.titre}`}
            description="Renseignez le formulaire ci-dessous et joignez vos coordonnées. Votre candidature est transmise directement à l'équipe Cycle Consulting."
          />
          <p className="mt-4 text-sm text-anthracite-mist">
            Vous préférez l&apos;e-mail ? Écrivez-nous à{" "}
            <a href={mailtoCandidature} className="font-semibold text-[#132bdd] underline-offset-4 hover:underline">
              {entreprise.email}
            </a>{" "}
            en précisant l&apos;intitulé du poste.
          </p>
          <div className="mt-8">
            <ContactForm
              sujet={objetCandidature}
              messagePlaceholder="Présentez-vous en quelques lignes : votre parcours, vos disponibilités, et joignez un lien vers votre CV ou profil."
            />
          </div>
        </div>
      </section>

      {autresOffres.length > 0 && (
        <section className="bg-surface-alt py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Autres opportunités" title="Nos autres offres" />
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {autresOffres.map((autre) => (
                <OffreEmploiCard key={autre.slug} offre={autre} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-callout-light">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-anthracite sm:text-3xl">
            Ce poste ne vous correspond pas <span className={GRADIENT_DARK}>tout à fait</span> ?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-anthracite-soft">
            Cycle Consulting recrute en permanence des profils IT pour ses missions clients. Envoyez-nous une
            candidature spontanée : un consultant reviendra vers vous.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/rejoignez-nous#candidature"
              className="cta-primary cta-primary-on-light rounded-md px-6 py-3 text-center text-sm font-bold"
            >
              Candidature spontanée
            </Link>
            <Link
              href="/rejoignez-nous"
              className="rounded-md border border-border-subtle px-6 py-3 text-center text-sm font-bold text-anthracite hover:bg-surface-alt"
            >
              Toutes nos offres
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function CandidatureCard({ offre, mailto }: { offre: { intitulePoste: string }; mailto: string }) {
  return (
    <div className="rounded-xl bg-gradient-to-r from-[#fa11f7] via-[#132bdd] to-[#0bceff] p-[1.5px] shadow-sm">
      <div className="rounded-[calc(0.75rem-1.5px)] bg-gradient-to-br from-bleu-nuit to-[#16305e] p-8">
        <h3 className="text-lg font-bold text-white">Candidatez</h3>
        <p className="mt-3 text-sm leading-relaxed text-white">
          Postulez au poste «&nbsp;{offre.intitulePoste}&nbsp;» via le formulaire : votre candidature est
          envoyée directement à l&apos;équipe Cycle Consulting.
        </p>
        <a
          href="#candidature"
          className="cta-primary cta-primary-light mt-4 block w-full rounded-md px-4 py-2.5 text-center text-sm font-bold uppercase tracking-wide"
        >
          Envoyer ma candidature
        </a>
        <a
          href={mailto}
          className="mt-3 block text-center text-sm font-semibold text-white underline-offset-4 hover:underline"
        >
          ou nous écrire par e-mail
        </a>
      </div>
    </div>
  );
}

function SectionEyebrow({ label }: { label: string }) {
  return <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${GRADIENT_DARK}`}>{label}</p>;
}

function CheckMark() {
  return (
    <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-[#132bdd]" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="currentColor" opacity={0.12} />
      <path
        d="m6 10.2 2.6 2.6L14.2 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
