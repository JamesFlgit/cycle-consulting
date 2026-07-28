import type { Colonne } from "@/data/formations";

export default function ServiceColumns({
  colonnes,
  withBrochure = false,
}: {
  colonnes: Colonne[];
  withBrochure?: boolean;
}) {
  const gridCols = colonnes.length >= 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2";

  return (
    <div className={`grid grid-cols-1 gap-6 ${gridCols}`}>
      {colonnes.map((colonne) => (
        <div key={colonne.titre} className="rounded-xl border border-border-subtle bg-surface p-6 shadow-sm">
          <h2 className="text-base font-semibold text-anthracite">{colonne.titre}</h2>
          <ul className="mt-4 space-y-3">
            {colonne.items.map((item) => (
              <li
                key={item}
                className="flex items-center justify-between gap-3 border-b border-border-subtle pb-3 last:border-0 last:pb-0"
              >
                <span className="text-sm text-anthracite-soft">{item}</span>
                {withBrochure && (
                  <a
                    href="#"
                    className="shrink-0 text-xs font-semibold text-anthracite-mist underline-offset-2 hover:text-anthracite hover:underline"
                  >
                    Voir brochure
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
