import CasClientCard from "@/components/ui/CasClientCard";
import type { CasClient } from "@/data/cas-clients";

// Brand gradient, dark variant — matches the eyebrow used across the expertise pages.
const GRADIENT_DARK = "bg-gradient-to-r from-[#fa11f7] via-[#132bdd] to-[#0bceff] bg-clip-text text-transparent";

/**
 * Teaser linking an expertise page to its most relevant cas client. No
 * section wrapper of its own — dropped in as the second column of the
 * "Pourquoi choisir" grid (checklist on the left, proof on the right on
 * desktop) so both columns stay balanced instead of leaving an empty area.
 */
export default function ExpertiseCasClientTeaser({
  casClient,
  intro,
}: {
  casClient: CasClient;
  /** Phrase reliant l'expertise de la page au cas client mis en avant. */
  intro: string;
}) {
  return (
    <div>
      <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${GRADIENT_DARK}`}>Nos réalisations</p>
      <p className="mt-3 text-sm leading-relaxed text-anthracite-soft">{intro}</p>
      <div className="mt-5">
        <CasClientCard casClient={casClient} />
      </div>
    </div>
  );
}
