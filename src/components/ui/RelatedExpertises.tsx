import Link from "next/link";
import Image from "next/image";
import { poles } from "@/data/poles";
import {
  GraduationCapIcon,
  UsersThreeIcon,
  GearIcon,
  HeadsetIcon,
  PackageIcon,
} from "@/components/icons/card-icons";

const GRADIENT_DARK =
  "bg-gradient-to-r from-[#fa11f7] via-[#132bdd] to-[#0bceff] bg-clip-text text-transparent";

const POLE_ICONS: Record<string, (props: { className?: string }) => React.JSX.Element> = {
  formations: GraduationCapIcon,
  "business-strategie": UsersThreeIcon,
  "service-manage": GearIcon,
  "ingenierie-it-support": HeadsetIcon,
  "centre-logistique": PackageIcon,
};

/** Maillage interne : renvoie vers les autres expertises depuis chaque page
 * d'expertise, juste avant le footer. Cartes reprenant le visuel de la homepage
 * (photo + bandeau icone/titre). */
export default function RelatedExpertises({ currentSlug }: { currentSlug: string }) {
  const others = poles.filter((pole) => pole.slug !== currentSlug && pole.visible);
  if (others.length === 0) return null;

  return (
    <section className="bg-surface-alt">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center text-xl font-bold text-anthracite sm:text-2xl lg:text-3xl">
          Explorer nos <span className={`whitespace-nowrap ${GRADIENT_DARK}`}>autres expertises</span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-anthracite-mist sm:text-base">
          Nos pôles se combinent pour couvrir l&apos;ensemble de votre chaîne de valeur, du conseil
          au support opérationnel.
        </p>

        <ul className="mx-auto mt-10 grid max-w-md grid-cols-1 gap-6 sm:max-w-3xl sm:grid-cols-2 lg:max-w-none lg:grid-cols-4">
          {others.map((pole) => {
            const Icon = POLE_ICONS[pole.slug];
            return (
              <li key={pole.slug}>
                <Link
                  href={pole.href}
                  className="group block h-full rounded-xl bg-gradient-to-r from-[#fa11f7] via-[#132bdd] to-[#0bceff] p-px shadow-sm"
                >
                  <div className="flex h-full flex-col overflow-hidden rounded-[calc(0.75rem-1px)] bg-surface transition-shadow group-hover:shadow-md">
                    <div className="relative aspect-video">
                      <Image
                        src={pole.image}
                        alt={pole.imageAlt ?? ""}
                        fill
                        sizes="(min-width:1024px) 300px, (min-width:640px) 45vw, 90vw"
                        className="object-cover"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.85) 12%, transparent 55%)",
                        }}
                      />
                      <div className="absolute inset-x-0 bottom-0 flex items-center gap-2.5 p-4 text-left">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/95 shadow-sm">
                          {Icon && <Icon className="h-5 w-5" />}
                        </span>
                        <h3 className="text-sm font-semibold text-white drop-shadow-sm">{pole.navLabel}</h3>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="flex-1 text-xs leading-relaxed text-anthracite-mist">
                        {pole.teaser.accroche}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#132bdd]">
                        En savoir plus
                        <svg
                          viewBox="0 0 20 20"
                          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M4 10h12M11 5l5 5-5 5" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="cta-primary cta-primary-on-light inline-block w-full rounded-md px-6 py-3 text-center text-sm font-bold sm:w-auto"
          >
            Demander un devis
          </Link>
        </div>
      </div>
    </section>
  );
}
