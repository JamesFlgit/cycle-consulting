"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CONSENT_OPEN_EVENT, readConsent, writeConsent } from "@/lib/analytics";

/**
 * Bannière de consentement (mesure d'audience). Conforme aux recommandations
 * CNIL : refuser est aussi simple qu'accepter, aucun dépôt avant choix, choix
 * modifiable à tout moment via le lien "Gérer mes cookies" du pied de page
 * (évènement `CONSENT_OPEN_EVENT`).
 */
export default function ConsentBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Premiere visite (ou choix expire) : on demande. `setTimeout` pour ne pas
    // appeler setState en synchrone dans l'effet (et eviter un ecart d'hydratation).
    const id =
      readConsent() === null ? window.setTimeout(() => setOpen(true), 0) : undefined;

    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => {
      if (id) window.clearTimeout(id);
      window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
    };
  }, []);

  const choose = useCallback((choice: "granted" | "denied") => {
    writeConsent(choice);
    setOpen(false);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="false"
          aria-label="Consentement aux cookies de mesure d'audience"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-0 z-70 px-4 pb-4 sm:px-6"
        >
          <div className="mx-auto max-w-3xl rounded-2xl border border-border-subtle bg-surface p-5 shadow-2xl sm:p-6">
            <p className="text-sm font-bold text-anthracite">Cookies et mesure d&apos;audience</p>
            <p className="mt-2 text-sm leading-relaxed text-anthracite-soft">
              Nous utilisons Google Analytics pour mesurer la fréquentation du site et en améliorer le
              contenu. Ces cookies ne sont déposés qu&apos;avec votre accord et vous pouvez revenir sur
              votre choix à tout moment. Détails dans notre{" "}
              <Link
                href="/politique-de-confidentialite"
                className="font-semibold underline underline-offset-2"
              >
                politique de confidentialité
              </Link>
              .
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => choose("denied")}
                className="w-full rounded-lg border border-anthracite-soft px-4 py-2.5 text-sm font-semibold text-anthracite transition-colors hover:bg-surface-alt sm:w-auto"
              >
                Tout refuser
              </button>
              <button
                type="button"
                onClick={() => choose("granted")}
                className="w-full rounded-lg bg-anthracite px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-anthracite-soft sm:w-auto"
              >
                Tout accepter
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
