export default function Breadcrumb({ items }: { items: string[] }) {
  return (
    <nav aria-label="Fil d'ariane" className="text-sm">
      <ol className="flex flex-wrap items-center gap-2 text-white/60">
        {items.map((item, i) => (
          <li key={item} className="flex items-center gap-2">
            <span className={i === items.length - 1 ? "font-semibold text-white" : ""}>{item}</span>
            {i < items.length - 1 && <span aria-hidden="true">›</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
