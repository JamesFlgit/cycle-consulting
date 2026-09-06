/**
 * Chemin decoratif « Apprendre › Comprendre › Entreprendre » : la signature de
 * marque, affichee sur les heros. Purement decoratif — ce n'est PAS un fil
 * d'Ariane (le vrai fil d'Ariane navigable est `Breadcrumb.tsx`).
 */
export default function SloganPath({
  items,
  /** "onDark" (default) for light text on a dark hero; "onLight" for dark
   * text on a light hero. */
  tone = "onDark",
}: {
  items: React.ReactNode[];
  tone?: "onDark" | "onLight";
}) {
  const onLight = tone === "onLight";
  return (
    <p
      className={`flex flex-wrap items-center gap-2 text-sm ${onLight ? "text-anthracite-mist" : "text-white/60"}`}
    >
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          <span>{item}</span>
          {i < items.length - 1 && <span aria-hidden="true">&rsaquo;</span>}
        </span>
      ))}
    </p>
  );
}
