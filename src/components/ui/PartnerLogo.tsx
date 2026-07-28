export default function PartnerLogo({ nom }: { nom: string }) {
  return (
    <div className="flex h-24 items-center justify-center rounded-xl border border-border-subtle bg-surface px-6 shadow-sm">
      <span className="text-lg font-semibold tracking-wide text-anthracite-mist">{nom}</span>
    </div>
  );
}
