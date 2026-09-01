"use client";

import { CONSENT_OPEN_EVENT } from "@/lib/analytics";

/** Rouvre la bannière de consentement. À placer dans le pied de page. */
export default function ManageConsentButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}
      className={className}
    >
      Gérer mes cookies
    </button>
  );
}
