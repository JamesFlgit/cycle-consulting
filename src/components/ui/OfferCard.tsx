import Link from "next/link";
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

export default function OfferCard({ pole }: { pole: Pole }) {
  const Icon = POLE_ICONS[pole.slug];
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border-subtle bg-surface shadow-sm transition-shadow hover:shadow-md">
      <div className="card-header-frame flex flex-col px-6 pb-16 pt-5">
        <div className="relative z-10 flex items-center gap-3 text-left">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/95 shadow-sm">
            {Icon && <Icon className="h-6 w-6" />}
          </span>
          <h3 className="text-lg font-semibold text-white drop-shadow-sm">{pole.navLabel}</h3>
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
            className="cta-primary cta-primary-on-light block w-full rounded-md px-4 py-2 text-center text-xs font-bold"
          >
            En savoir plus
          </Link>
        </div>
      </div>
    </div>
  );
}
