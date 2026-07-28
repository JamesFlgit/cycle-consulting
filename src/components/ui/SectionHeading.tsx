export default function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-anthracite-mist">{eyebrow}</p>
      )}
      <h2 className="mt-2 text-2xl font-bold text-anthracite sm:text-3xl">{title}</h2>
      {description && <p className="mt-3 text-base leading-relaxed text-anthracite-mist">{description}</p>}
    </div>
  );
}
