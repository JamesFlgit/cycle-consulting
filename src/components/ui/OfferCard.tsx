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
    <div className="flex h-full flex-col rounded-xl border border-border-subtle bg-surface p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center gap-3">
        {Icon && <Icon className="h-8 w-8 shrink-0" />}
        <h3 className="text-lg font-semibold text-anthracite">{pole.navLabel}</h3>
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-anthracite-mist">{pole.teaser.accroche}</p>
      <div className="mt-6 border-t border-border-subtle pt-4">
        <div className="mb-4">
          <p className="text-xs uppercase tracking-wide text-anthracite-mist">À partir de</p>
          <p className="text-sm font-semibold text-anthracite">{pole.teaser.apartirde}</p>
        </div>
        <Link
          href={pole.href}
          className="cta-primary cta-primary-on-light block w-full rounded-md px-4 py-2 text-center text-sm font-bold"
        >
          En savoir plus
        </Link>
      </div>
    </div>
  );
}
