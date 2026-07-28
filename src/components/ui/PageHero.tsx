export default function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="bg-page-hero bg-office-gradient">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">{eyebrow}</p>
        )}
        <h1 className="mt-3 max-w-3xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{title}</h1>
        {description && <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70">{description}</p>}
        {children}
      </div>
    </section>
  );
}
