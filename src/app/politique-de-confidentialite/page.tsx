import type { Metadata } from "next";
import Link from "next/link";
import LegalDocument, { LegalSection, LegalList } from "@/components/ui/LegalDocument";
import { entreprise, mentionsLegales as m, sousTraitants } from "@/data/entreprise";

export const metadata: Metadata = {
  title: "Politique de confidentialité | Cycle Consulting",
  description:
    "Comment Cycle Consulting collecte et traite vos données personnelles via le site cycle-consulting.fr : finalités, durées de conservation, destinataires et droits RGPD.",
  alternates: { canonical: "/politique-de-confidentialite" },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <LegalDocument
      title="Politique de confidentialité"
      description="Cette politique décrit comment Cycle Consulting traite les données personnelles collectées via le site cycle-consulting.fr, conformément au RGPD et à la loi Informatique et Libertés."
      updatedOn="1er septembre 2026"
    >
      <LegalSection title="1. Responsable du traitement">
        <p>
          Le responsable des traitements de données personnelles réalisés via le site est{" "}
          <strong>{m.raisonSociale}</strong> ({m.formeJuridique}), dont le siège social est situé{" "}
          {m.siege}, {m.rcs}.
        </p>
        <p>
          Pour toute question relative à vos données, vous pouvez écrire à{" "}
          <a href={`mailto:${entreprise.email}`} className="font-semibold underline underline-offset-2">
            {entreprise.email}
          </a>{" "}
          ou par courrier à l&apos;adresse du siège, à l&apos;attention du responsable de la protection des
          données.
        </p>
      </LegalSection>

      <LegalSection title="2. Données collectées, finalités et bases légales">
        <p>Nous ne collectons que les données que vous nous transmettez volontairement via le site.</p>

        <p className="font-semibold text-anthracite">a. Formulaire de contact et formulaire de candidature</p>
        <LegalList
          items={[
            "Données : prénom, nom, société, adresse e-mail, numéro de téléphone et contenu de votre message.",
            "Finalité : traiter votre demande, y répondre et assurer le suivi de la relation (commerciale ou de recrutement).",
            "Base légale : mesures précontractuelles prises à votre demande et intérêt légitime de Cycle Consulting à répondre à ses prospects et candidats.",
            "Votre demande est transmise par e-mail à la boîte contact de Cycle Consulting ; elle n'est pas enregistrée dans une base de données commerciale.",
          ]}
        />

        <p className="font-semibold text-anthracite">b. Demande de brochure</p>
        <LegalList
          items={[
            "Données : prénom et adresse e-mail.",
            "Finalité : vous adresser la brochure puis vous recontacter au sujet des offres de Cycle Consulting.",
            "Base légale : votre consentement, recueilli par une case à cocher au moment de la demande.",
            "Votre e-mail est ajouté à une liste de diffusion gérée via Brevo. Vous pouvez retirer votre consentement à tout moment (lien de désinscription dans chaque e-mail, ou demande à l'adresse ci-dessus).",
          ]}
        />

        <p className="font-semibold text-anthracite">c. Données techniques</p>
        <LegalList
          items={[
            "Lors de votre visite, l'hébergeur enregistre des journaux techniques (adresse IP, date et heure de la requête, pages consultées, type de navigateur) à des fins de sécurité et de bon fonctionnement du service.",
            "Base légale : intérêt légitime de Cycle Consulting à sécuriser le site.",
            "Les formulaires utilisent un dispositif anti-spam interne (champ piège et jeton horodaté signé). Aucun service tiers de type captcha n'est sollicité.",
          ]}
        />
      </LegalSection>

      <LegalSection title="3. Cookies et traceurs">
        <p>
          Le site <strong>n&apos;utilise aucun cookie</strong> de mesure d&apos;audience, de publicité ou de
          suivi. Il n&apos;y a donc pas de bandeau de consentement.
        </p>
        <p>
          Un espace de stockage technique du navigateur (<em>sessionStorage</em>) est utilisé uniquement pour
          ne pas rejouer l&apos;animation d&apos;accueil à chaque page pendant votre visite. Cette information
          reste sur votre appareil, n&apos;est pas un cookie et n&apos;est jamais transmise à Cycle Consulting.
        </p>
      </LegalSection>

      <LegalSection title="4. Destinataires et sous-traitants">
        <p>
          Vos données sont destinées aux équipes de Cycle Consulting habilitées (commerce, recrutement,
          direction). Elles ne sont ni vendues, ni louées, ni cédées à des tiers à des fins commerciales.
        </p>
        <p>
          Pour fournir le service, Cycle Consulting fait appel aux prestataires suivants, qui agissent comme
          sous-traitants au sens du RGPD :
        </p>
        <div className="overflow-x-auto">
          <table className="mt-2 w-full min-w-[36rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border-subtle text-left">
                <th className="py-2 pr-4 font-semibold text-anthracite">Prestataire</th>
                <th className="py-2 pr-4 font-semibold text-anthracite">Rôle</th>
                <th className="py-2 pr-4 font-semibold text-anthracite">Lieu</th>
                <th className="py-2 font-semibold text-anthracite">Encadrement</th>
              </tr>
            </thead>
            <tbody>
              {sousTraitants.map((st) => (
                <tr key={st.nom} className="border-b border-border-subtle align-top text-anthracite-soft">
                  <td className="py-2 pr-4">{st.nom}</td>
                  <td className="py-2 pr-4">{st.role}</td>
                  <td className="py-2 pr-4">{st.lieu}</td>
                  <td className="py-2">{st.garanties}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Lorsqu&apos;un transfert de données a lieu hors de l&apos;Union européenne (hébergement), il est
          encadré par les clauses contractuelles types de la Commission européenne.
        </p>
      </LegalSection>

      <LegalSection title="5. Durées de conservation">
        <LegalList
          items={[
            "Demandes de contact et candidatures : jusqu'à 3 ans après le dernier échange, sauf relation contractuelle établie (les données sont alors conservées pour la durée de la relation puis selon les obligations légales).",
            "Liste « brochure » : jusqu'au retrait de votre consentement ou, à défaut d'interaction, 3 ans après le dernier contact.",
            "Journaux techniques de l'hébergeur : environ 12 mois.",
          ]}
        />
      </LegalSection>

      <LegalSection title="6. Sécurité">
        <p>
          Cycle Consulting met en œuvre des mesures techniques et organisationnelles appropriées pour
          protéger les données contre la perte, l&apos;altération ou l&apos;accès non autorisé : connexions
          chiffrées (HTTPS), accès restreint à la boîte de réception, prestataires présentant des garanties
          conformes au RGPD.
        </p>
      </LegalSection>

      <LegalSection title="7. Vos droits">
        <p>
          Conformément au RGPD, vous disposez des droits suivants sur vos données : droit d&apos;accès, de
          rectification, d&apos;effacement, de limitation, d&apos;opposition, de portabilité, et le droit de
          retirer votre consentement à tout moment lorsque le traitement repose sur celui-ci.
        </p>
        <p>
          Pour exercer ces droits, écrivez à{" "}
          <a href={`mailto:${entreprise.email}`} className="font-semibold underline underline-offset-2">
            {entreprise.email}
          </a>
          . Une preuve d&apos;identité peut être demandée en cas de doute raisonnable. Nous répondons dans un
          délai d&apos;un mois.
        </p>
        <p>
          Si vous estimez que le traitement de vos données n&apos;est pas conforme, vous pouvez introduire une
          réclamation auprès de la CNIL —{" "}
          <a href="https://www.cnil.fr" className="underline underline-offset-2" target="_blank" rel="noreferrer">
            www.cnil.fr
          </a>{" "}
          — 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07.
        </p>
      </LegalSection>

      <LegalSection title="8. Modification de la politique">
        <p>
          Cette politique peut être mise à jour pour tenir compte d&apos;évolutions légales ou du site. La
          version applicable est celle publiée sur cette page, dont la date de dernière mise à jour figure en
          haut.
        </p>
        <p>
          Voir aussi les{" "}
          <Link href="/mentions-legales" className="font-semibold underline underline-offset-2">
            mentions légales
          </Link>
          .
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
