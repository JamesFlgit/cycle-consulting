import Image from "next/image";

const DEFAULT_TITLE_CLASSNAME = "mt-3 max-w-3xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl xl:text-6xl";

export default function PageHero({
  eyebrow,
  title,
  titleClassName = DEFAULT_TITLE_CLASSNAME,
  description,
  children,
  image,
}: {
  eyebrow?: React.ReactNode;
  title: string;
  /** Override the title's size/width — for a long title that wraps too many
   * lines at the default (large) sizing on wide screens. */
  titleClassName?: string;
  description?: React.ReactNode;
  children?: React.ReactNode;
  /** Optional background photo — replaces the default abstract gradient. */
  image?: string;
}) {
  return (
    <section className={`relative overflow-hidden ${image ? "" : "bg-page-hero bg-office-gradient"}`}>
      {image && (
        <>
          <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-black/55 sm:hidden" />
          <div className="absolute inset-0 hidden bg-gradient-to-r from-black/70 via-black/35 to-transparent sm:block" />
        </>
      )}
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {eyebrow && (
          <p
            className={`text-xs font-semibold uppercase tracking-[0.2em] sm:text-sm ${image ? "text-white" : "text-white/60"}`}
          >
            {eyebrow}
          </p>
        )}
        <h1 className={titleClassName}>{title}</h1>
        {description && (
          <p
            className={`mt-10 max-w-2xl text-base leading-relaxed sm:mt-5 sm:text-lg ${image ? "text-white" : "text-white/70"}`}
          >
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
