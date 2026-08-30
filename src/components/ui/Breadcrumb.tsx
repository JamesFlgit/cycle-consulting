export default function Breadcrumb({
  items,
  /** "onDark" (default) for light text on a dark hero; "onLight" for dark
   * text on a light hero (the expertise pages). */
  tone = "onDark",
}: {
  items: string[];
  tone?: "onDark" | "onLight";
}) {
  const onLight = tone === "onLight";
  return (
    <nav aria-label="Fil d'ariane" className="text-sm">
      <ol className={`flex flex-wrap items-center gap-2 ${onLight ? "text-anthracite-mist" : "text-white/60"}`}>
        {items.map((item, i) => (
          <li key={item} className="flex items-center gap-2">
            <span
              className={
                i === items.length - 1 ? `font-semibold ${onLight ? "text-anthracite" : "text-white"}` : ""
              }
            >
              {item}
            </span>
            {i < items.length - 1 && <span aria-hidden="true">›</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
