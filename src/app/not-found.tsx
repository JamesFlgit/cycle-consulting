import type { Metadata } from "next";
import Link from "next/link";

// Brand gradient, dark variant — for accents on the light body.
const GRADIENT_DARK =
  "bg-gradient-to-r from-[#fa11f7] via-[#132bdd] to-[#0bceff] bg-clip-text text-transparent";

export const metadata: Metadata = {
  title: "Page introuvable | Cycle Consulting",
  description: "La page que vous recherchez n'existe pas ou a été déplacée.",
};

const RACCOURCIS = [
  { href: "/", label: "Accueil" },
  { href: "/business-strategie", label: "Business & Stratégie" },
  { href: "/service-manage", label: "Service Managé" },
  { href: "/ingenierie-it-support", label: "Ingénierie & IT Support" },
  { href: "/centre-logistique", label: "Centre Logistique" },
  { href: "/formations", label: "Formations" },
  { href: "/cas-clients", label: "Nos réalisations" },
  { href: "/contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
      <p className={`text-6xl font-extrabold tracking-tight sm:text-7xl ${GRADIENT_DARK}`}>404</p>
      <h1 className="mt-6 text-2xl font-bold text-anthracite sm:text-3xl">
        Cette page n&apos;existe pas
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-anthracite-mist sm:text-base">
        Le lien est peut-être erroné ou la page a été déplacée. Reprenez votre navigation à partir
        d&apos;un des points ci-dessous.
      </p>

      <div className="mt-8">
        <Link
          href="/"
          className="cta-primary cta-primary-on-light inline-block w-full rounded-md px-6 py-3 text-center text-sm font-bold sm:w-auto"
        >
          Retour à l&apos;accueil
        </Link>
      </div>

      <nav className="mt-12 w-full border-t border-border-subtle pt-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-anthracite-mist">
          Explorer <span className={GRADIENT_DARK}>le site</span>
        </p>
        <ul className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2.5 text-sm font-medium text-anthracite-soft">
          {RACCOURCIS.map((lien) => (
            <li key={lien.href}>
              <Link href={lien.href} className="underline-offset-4 hover:text-anthracite hover:underline">
                {lien.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
