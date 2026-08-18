"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Challenge = { a: number; b: number; issuedAt: number; token: string };
type Status = "idle" | "loading" | "success" | "error";

const PDF_URL = "/brochure-cycle-consulting.pdf";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function BrochureModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-anthracite/60 px-4 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="brochure-modal-title"
            className="relative w-full max-w-md rounded-xl bg-surface p-6 shadow-lg sm:p-8"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-start justify-between gap-4">
              <h3 id="brochure-modal-title" className="text-lg font-semibold text-anthracite">
                Recevoir la brochure
              </h3>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fermer"
                className="rounded-md p-1 text-anthracite-mist transition-colors hover:bg-surface-alt hover:text-anthracite"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <BrochureForm onClose={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Mounted fresh each time the modal opens, so all its state starts clean without resetting in an effect. */
function BrochureForm({ onClose }: { onClose: () => void }) {
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [societe, setSociete] = useState(""); // honeypot — must stay empty
  const [answer, setAnswer] = useState("");
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function fetchChallenge() {
    fetch("/api/captcha")
      .then((res) => res.json())
      .then(setChallenge)
      .catch(() => setChallenge(null));
  }

  useEffect(() => {
    fetchChallenge();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!challenge) return;

    if (!EMAIL_REGEX.test(email)) {
      setErrorMessage("Merci de renseigner une adresse e-mail valide.");
      return;
    }
    if (!consent) {
      setErrorMessage("Merci d'accepter d'être recontacté pour poursuivre.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/brochure-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prenom,
          email,
          consent,
          societe,
          a: challenge.a,
          b: challenge.b,
          issuedAt: challenge.issuedAt,
          token: challenge.token,
          answer: Number(answer),
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMessage("La vérification anti-spam a échoué. Merci de réessayer.");
        setAnswer("");
        fetchChallenge();
        return;
      }

      setStatus("success");
      window.open(PDF_URL, "_blank", "noopener,noreferrer");
    } catch {
      setStatus("error");
      setErrorMessage("Une erreur est survenue. Merci de réessayer.");
    }
  }

  if (status === "success") {
    return (
      <div className="mt-6 text-center">
        <p className="text-sm font-semibold text-anthracite">Merci{prenom ? ` ${prenom}` : ""} !</p>
        <p className="mt-2 text-sm text-anthracite-mist">
          Le téléchargement a démarré dans un nouvel onglet. Si rien ne se passe,{" "}
          <a href={PDF_URL} target="_blank" rel="noreferrer" className="font-semibold text-anthracite underline">
            cliquez ici
          </a>
          .
        </p>
        <button
          type="button"
          onClick={onClose}
          className="cta-primary cta-primary-on-light mt-6 rounded-md px-4 py-2 text-sm font-bold"
        >
          Fermer
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <p className="text-sm text-anthracite-mist">
        Renseignez vos coordonnées pour recevoir instantanément notre brochure complète.
      </p>

      {/* Honeypot: invisible to real visitors, off-screen and unreachable by tab — bots fill it, humans never do. */}
      <div className="absolute left-[-9999px] top-auto" aria-hidden="true">
        <label htmlFor="brochure-societe">Société</label>
        <input
          id="brochure-societe"
          name="societe"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={societe}
          onChange={(e) => setSociete(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="brochure-prenom" className="block text-sm font-medium text-anthracite">
          Prénom <span className="text-red-600">*</span>
        </label>
        <input
          id="brochure-prenom"
          type="text"
          required
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          className="mt-1.5 block w-full rounded-md border border-border-subtle bg-white px-3 py-2 text-sm text-anthracite outline-none focus:border-anthracite focus:ring-1 focus:ring-anthracite"
        />
      </div>

      <div>
        <label htmlFor="brochure-email" className="block text-sm font-medium text-anthracite">
          E-mail <span className="text-red-600">*</span>
        </label>
        <input
          id="brochure-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1.5 block w-full rounded-md border border-border-subtle bg-white px-3 py-2 text-sm text-anthracite outline-none focus:border-anthracite focus:ring-1 focus:ring-anthracite"
        />
      </div>

      <div>
        <label htmlFor="brochure-captcha" className="block text-sm font-medium text-anthracite">
          Question de sécurité : combien font {challenge ? `${challenge.a} + ${challenge.b}` : "…"} ?{" "}
          <span className="text-red-600">*</span>
        </label>
        <input
          id="brochure-captcha"
          type="number"
          required
          disabled={!challenge}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="mt-1.5 block w-full rounded-md border border-border-subtle bg-white px-3 py-2 text-sm text-anthracite outline-none focus:border-anthracite focus:ring-1 focus:ring-anthracite disabled:opacity-60"
        />
      </div>

      <label className="flex items-start gap-2 text-xs text-anthracite-mist">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5"
        />
        <span>
          J&apos;accepte que Cycle Consulting conserve mon e-mail pour me recontacter au sujet de ses offres.{" "}
          <span className="text-red-600">*</span>
        </span>
      </label>

      {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

      <button
        type="submit"
        disabled={status === "loading" || !challenge || !consent}
        className="cta-primary cta-primary-on-light w-full rounded-md px-4 py-2.5 text-sm font-bold disabled:opacity-60"
      >
        {status === "loading" ? "Envoi…" : "Recevoir la brochure"}
      </button>
    </form>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
