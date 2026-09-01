import Link from "next/link";
import Image from "next/image";
import type { Pole } from "@/data/poles";
import {
  GraduationCapIcon,
  UsersThreeIcon,
  GearIcon,
  HeadsetIcon,
  PackageIcon,
} from "@/components/icons/card-icons";

const POLE_ICONS: Record<string, (props: { className?: string }) => React.JSX.Element> = {
  formations: GraduationCapIcon,
  "business-strategie": UsersThreeIcon,
  "service-manage": GearIcon,
  "ingenierie-it-support": HeadsetIcon,
  "centre-logistique": PackageIcon,
};

export default function OfferCard({ pole, active = true }: { pole: Pole; active?: boolean }) {
  const Icon = POLE_ICONS[pole.slug];
  return (
    <div
      className={`rounded-xl p-px shadow-sm transition-colors ${
        active ? "bg-gradient-to-r from-[#fa11f7] via-[#132bdd] to-[#0bceff]" : "bg-border-subtle"
      }`}
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(0.75rem-1px)] bg-surface transition-shadow hover:shadow-md">
        <div className="relative aspect-video">
          <Image
            src={pole.image}
            alt={pole.imageAlt ?? ""}
            fill
            sizes="(min-width:1024px) 300px, (min-width:640px) 45vw, 90vw"
            className="object-cover"
          />
          {/* Scrim for the icon/title's legibility — confined to the bottom band they sit
              in; the rest of the photo stays fully clear, not tinted. */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.85) 12%, transparent 55%)" }}
          />
          <div className="absolute inset-x-0 bottom-0 flex items-center gap-2.5 p-4 text-left">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/95 shadow-sm">
              {Icon && <Icon className="h-5 w-5" />}
            </span>
            <h3 className="text-sm font-semibold text-white drop-shadow-sm">{pole.navLabel}</h3>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <p className="flex-1 text-xs leading-relaxed text-anthracite-mist">{pole.teaser.accroche}</p>
          <div className="mt-6 border-t border-border-subtle pt-4">
            <div className="mb-4">
              <p className="text-[11px] uppercase tracking-wide text-anthracite-mist">À partir de</p>
              <p className="text-xs font-semibold text-anthracite">{pole.teaser.apartirde}</p>
            </div>
            <Link
              href={pole.href}
              tabIndex={active ? 0 : -1}
              aria-disabled={!active}
              onClick={(event) => {
                if (!active) event.preventDefault();
              }}
              className={`cta-primary cta-primary-on-light block w-full rounded-md px-4 py-2 text-center text-xs font-bold ${
                active ? "" : "pointer-events-none"
              }`}
            >
              En savoir plus
            </Link>
          </div>
        </div>

        {/* Whitening wash — self-contained inside the card (never touches the
            card's own opacity), so side cards read as faded-out without ever
            revealing the page or neighboring cards behind them. */}
        {!active && <div className="pointer-events-none absolute inset-0 bg-white/60" />}
      </div>
    </div>
  );
}
