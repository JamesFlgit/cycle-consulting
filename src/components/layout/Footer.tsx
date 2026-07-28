import Link from "next/link";
import Image from "next/image";
import { polesNav, secondaryNav } from "@/data/nav";
import { entreprise } from "@/data/entreprise";

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-anthracite text-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <Image
            src="/cycle-consulting-logo-wordmark.svg"
            alt="Cycle Consulting"
            width={220}
            height={144}
            className="h-24 w-auto brightness-0 invert"
          />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
            {entreprise.slogan} — ESN française spécialisée en formations, service managé, infogérance,
            business &amp; stratégie, ingénierie IT et logistique.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Nos pôles</h3>
          <ul className="mt-4 space-y-2">
            {polesNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-white/60 transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Entreprise</h3>
          <ul className="mt-4 space-y-2">
            {secondaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-white/60 transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="text-sm text-white/60 transition-colors hover:text-white">
                Nous contacter
              </Link>
            </li>
          </ul>
          <div className="mt-6 space-y-1 text-sm text-white/60">
            <p>{entreprise.adresse}</p>
            <p>{entreprise.codePostalVille}</p>
            <p>{entreprise.telephone}</p>
            <p>{entreprise.email}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>&copy; {new Date().getFullYear()} Cycle Consulting. Tous droits réservés.</p>
          <p>SIRET {entreprise.siret}</p>
        </div>
      </div>
    </footer>
  );
}
