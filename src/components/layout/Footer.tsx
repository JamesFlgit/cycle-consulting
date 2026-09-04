"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { poles } from "@/data/poles";
import { entrepriseNavItems } from "@/data/entreprise-nav";
import { entreprise } from "@/data/entreprise";
import FooterLogoReveal from "@/components/layout/FooterLogoReveal";
import ManageConsentButton from "@/components/analytics/ManageConsentButton";
import Slogan from "@/components/ui/Slogan";
import { EmailIcon, GlobeIcon, MapPinIcon } from "@/components/icons/card-icons";

// Brand gradient (light variant, for use on dark backgrounds) — matches the business card artwork.
const GRADIENT_TEXT_BRAND = "bg-gradient-to-r from-[#f77bf0] via-[#6f8cf5] to-[#7ef0ff] bg-clip-text text-transparent";
// CYCLE Foundation has its own or/noir identity — no blue anywhere on its page, footer included.
const GRADIENT_TEXT_GOLD = "bg-gradient-to-r from-[#f8e3a3] via-[#d4af37] to-[#9c7a2c] bg-clip-text text-transparent";

export default function Footer() {
  const pathname = usePathname();
  const isFondation = pathname?.startsWith("/cycle-fondation") ?? false;
  const GRADIENT_TEXT = isFondation ? GRADIENT_TEXT_GOLD : GRADIENT_TEXT_BRAND;

  return (
    <footer
      className={`border-t text-white ${isFondation ? "border-[#d4af37]/20 bg-black" : "border-[#16305e] bg-bleu-nuit"}`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-6 lg:px-8">
        <div className="md:col-span-2">
          <FooterLogoReveal className="h-24 w-auto" tone={isFondation ? "white" : "brand"} />
          <Slogan
            variant="light"
            className="mt-4 text-base font-semibold text-white"
            gradientClassName={isFondation ? GRADIENT_TEXT_GOLD : undefined}
          />
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white">
            ESN française spécialisée en formations, service managé, infogérance, business &amp; stratégie,
            ingénierie IT et logistique.
          </p>
        </div>

        <div>
          <h3 className={`text-sm font-semibold uppercase tracking-wide ${GRADIENT_TEXT}`}>Nos pôles</h3>
          <ul className="mt-4 space-y-2">
            {poles
              .filter((item) => item.visible)
              .map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white transition-colors hover:underline">
                    {item.navLabel}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        <div>
          <h3 className={`text-sm font-semibold uppercase tracking-wide ${GRADIENT_TEXT}`}>Entreprise</h3>
          <ul className="mt-4 space-y-2">
            {entrepriseNavItems
              .filter((item) => item.visible)
              .map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white transition-colors hover:underline">
                    {item.navLabel}
                  </Link>
                </li>
              ))}
            <li>
              <Link href="/contact" className="text-sm text-white transition-colors hover:underline">
                Nous contacter
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className={`text-sm font-semibold uppercase tracking-wide ${GRADIENT_TEXT}`}>Coordonnées</h3>
          <div className="mt-4 space-y-2 text-sm text-white">
            <div className="flex items-start gap-2">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0" />
              <p>
                {entreprise.adresse}
                <br />
                {entreprise.codePostalVille}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <EmailIcon className="h-4 w-4 shrink-0" />
              <p className="whitespace-nowrap">{entreprise.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <GlobeIcon className="h-4 w-4 shrink-0" />
              <p className="whitespace-nowrap">{entreprise.siteWeb}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-x-3 gap-y-2 px-4 py-6 text-center text-xs text-white sm:flex-row sm:flex-wrap sm:justify-center sm:px-6 lg:px-8">
          <p>&copy; {new Date().getFullYear()} Cycle Consulting. Tous droits réservés.</p>
          <span className="hidden sm:inline">·</span>
          <p>SIREN {entreprise.siren}</p>
          <span className="hidden sm:inline">·</span>
          <Link href="/mentions-legales" className="transition-colors hover:underline">
            Mentions légales
          </Link>
          <span className="hidden sm:inline">·</span>
          <Link href="/politique-de-confidentialite" className="transition-colors hover:underline">
            Politique de confidentialité
          </Link>
          <span className="hidden sm:inline">·</span>
          <ManageConsentButton className="text-white transition-colors hover:underline" />
        </div>
      </div>
    </footer>
  );
}
