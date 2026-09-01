import type { Metadata } from "next";
import Link from "next/link";
import LegalDocument, { LegalSection } from "@/components/ui/LegalDocument";
import { entreprise, mentionsLegales as m, hebergeur } from "@/data/entreprise";

export const metadata: Metadata = {
  title: "Mentions légales | Cycle Consulting",
  description:
    "Mentions légales du site cycle-consulting.fr : éditeur, hébergeur, propriété intellectuelle et responsabilité.",
  alternates: { canonical: "/mentions-legales" },
};

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-1 border-b border-border-subtle py-3 last:border-0 sm:grid-cols-[12rem_1fr] sm:gap-4">
      <dt className="text-sm font-semibold text-anthracite">{label}</dt>
      <dd className="text-sm leading-relaxed text-anthracite-soft">{children}</dd>
    </div>
  );
}

export default function MentionsLegalesPage() {
  return (
    <LegalDocument
      title="Mentions légales"
      description="Informations relatives à l'éditeur et à l'hébergeur du site cycle-consulting.fr."
      updatedOn="1er septembre 2026"
    >
      <LegalSection title="1. Éditeur du site">
        <p>
          Le site <strong>{entreprise.siteWeb}</strong> est édité par :
        </p>
        <dl className="mt-2">
          <Row label="Raison sociale">{m.raisonSociale}</Row>
          <Row label="Forme juridique">{m.formeJuridique}</Row>
          <Row label="Capital social">{m.capitalSocial}</Row>
          <Row label="Siège social">{m.siege}</Row>
          <Row label="Immatriculation">
            {m.rcs} — immatriculée le {m.immatriculationDate}
          </Row>
          <Row label="SIREN">{m.siren}</Row>
          <Row label="SIRET (siège)">{m.siret}</Row>
          <Row label="N° de TVA intracommunautaire">{m.numeroTva}</Row>
          <Row label="Code APE / NAF">{m.codeApe}</Row>
          <Row label="Domiciliation">{m.domiciliation}</Row>
          <Row label="Téléphone">{entreprise.telephone}</Row>
          <Row label="E-mail">
            <a href={`mailto:${entreprise.email}`} className="underline underline-offset-2">
              {entreprise.email}
            </a>
          </Row>
          <Row label="Directeur de la publication">{m.directeurPublication}</Row>
        </dl>
      </LegalSection>

      <LegalSection title="2. Hébergeur">
        <p>Le site est hébergé par :</p>
        <dl className="mt-2">
          <Row label="Hébergeur">{hebergeur.nom}</Row>
          <Row label="Adresse">{hebergeur.adresse}</Row>
          <Row label="Site web">
            <a href={hebergeur.siteWeb} className="underline underline-offset-2" target="_blank" rel="noreferrer">
              {hebergeur.siteWeb}
            </a>
          </Row>
        </dl>
        <p>
          Le nom de domaine et le service de messagerie associés à {entreprise.siteWeb} sont gérés par
          Hostinger International Ltd (61 Lordou Vironos Street, 6023 Larnaca, Chypre).
        </p>
      </LegalSection>

      <LegalSection title="3. Propriété intellectuelle">
        <p>
          L&apos;ensemble des contenus du site (structure, textes, éléments graphiques, logo, illustrations,
          iconographie) est la propriété de {m.raisonSociale} ou de ses partenaires, et est protégé par le
          droit de la propriété intellectuelle.
        </p>
        <p>
          Toute reproduction, représentation, modification, publication ou adaptation, totale ou partielle,
          de ces éléments, par quelque procédé que ce soit, est interdite sans l&apos;autorisation écrite
          préalable de {m.raisonSociale}, sauf exceptions prévues par la loi. Toute exploitation non
          autorisée est susceptible de constituer une contrefaçon.
        </p>
        <p>
          Les marques et logos des partenaires et clients cités sur le site restent la propriété de leurs
          titulaires respectifs.
        </p>
      </LegalSection>

      <LegalSection title="4. Responsabilité">
        <p>
          {m.raisonSociale} s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des informations
          diffusées sur le site, mais ne peut en garantir l&apos;exhaustivité ni l&apos;absence totale
          d&apos;erreur. Les informations sont fournies à titre indicatif et sont susceptibles d&apos;évoluer.
        </p>
        <p>
          {m.raisonSociale} ne saurait être tenue responsable des dommages directs ou indirects résultant de
          l&apos;accès au site ou de son utilisation, ni d&apos;une éventuelle indisponibilité du service.
        </p>
        <p>
          Les cas clients présentés sur le site sont anonymisés : les enjeux, interventions et résultats
          décrits sont réels, seul le nom du client n&apos;est pas communiqué, pour des raisons de
          confidentialité contractuelle.
        </p>
      </LegalSection>

      <LegalSection title="5. Liens hypertextes">
        <p>
          Le site peut contenir des liens vers des sites tiers. {m.raisonSociale} n&apos;exerce aucun contrôle
          sur ces sites et décline toute responsabilité quant à leur contenu ou à l&apos;usage qui pourrait en
          être fait.
        </p>
        <p>
          La création d&apos;un lien vers {entreprise.siteWeb} est libre pour un usage licite et non
          trompeur. {m.raisonSociale} se réserve le droit de demander la suppression d&apos;un lien jugé
          contraire à ses intérêts.
        </p>
      </LegalSection>

      <LegalSection title="6. Données personnelles et cookies">
        <p>
          Les traitements de données personnelles réalisés via le site (formulaires de contact et de
          candidature, demande de brochure) sont décrits dans la{" "}
          <Link href="/politique-de-confidentialite" className="font-semibold underline underline-offset-2">
            politique de confidentialité
          </Link>
          .
        </p>
        <p>
          Le site n&apos;utilise aucun cookie ni traceur publicitaire ou de mesure d&apos;audience. Aucun
          consentement n&apos;est donc requis à ce titre.
        </p>
      </LegalSection>

      <LegalSection title="7. Droit applicable">
        <p>
          Les présentes mentions légales sont régies par le droit français. En cas de litige et à défaut de
          résolution amiable, compétence est attribuée aux tribunaux français compétents.
        </p>
        <p>
          Les prestations de {m.raisonSociale} s&apos;adressent à des clients professionnels. Un client
          consommateur peut recourir gratuitement à un médiateur de la consommation ; les coordonnées du
          médiateur seront communiquées le cas échéant.
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
