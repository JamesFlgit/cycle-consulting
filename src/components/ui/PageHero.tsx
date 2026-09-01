import type { CSSProperties } from "react";
import Image from "next/image";

const DEFAULT_TITLE_CLASSNAME = "mt-3 max-w-3xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl xl:text-6xl";

export default function PageHero({
  eyebrow,
  title,
  titleClassName = DEFAULT_TITLE_CLASSNAME,
  description,
  children,
  image,
  imageAlt = "",
  imageSide,
  tint,
  caption,
  captionColor = "amber",
  badges,
  cta,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  /** Override the title's size/width — for a long title that wraps too many
   * lines at the default (large) sizing on wide screens. */
  titleClassName?: string;
  description?: React.ReactNode;
  children?: React.ReactNode;
  /** Optional background photo — replaces the default abstract gradient. */
  image?: string;
  /** Alt text for `image`. Leave empty for a purely decorative background. */
  imageAlt?: string;
  /** When set alongside `image`, the photo is docked to this side on desktop
   * (lg+) and shown whole, its inner edge dissolving into a light field that
   * carries the copy. Below lg the photo drops in-flow under the copy. */
  imageSide?: "left" | "right";
  /** Dominant background colour of `image` — the left-hand field is mixed
   * from it (light near the copy, full strength under the photo) so every
   * expertise hero's gradient is tuned to its own illustration. */
  tint?: string;
  /** Split hero only: a short label in neon at the photo's bottom-right —
   * echoes the "Build" / "Run" neon signs in the illustrations. */
  caption?: string;
  /** Colour of `caption` — amber ("Build") or green ("Run"). */
  captionColor?: "amber" | "green";
  /** Split hero only: a row of brand-icon chips under the copy. */
  badges?: { icon: React.ReactNode; label: string }[];
  /** Split hero only: primary CTA, placed under the copy (below the in-flow
   * photo on mobile). */
  cta?: React.ReactNode;
}) {
  const onPhoto = Boolean(image);
  const split = onPhoto && imageSide;

  const eyebrowClass = `text-xs font-semibold uppercase tracking-[0.2em] sm:text-sm ${
    split ? "text-anthracite-mist" : onPhoto ? "text-white" : "text-white/60"
  }`;
  const descriptionClass = split
    ? "mt-4 max-w-2xl text-base leading-relaxed text-white/70"
    : `mt-10 max-w-2xl text-base leading-relaxed sm:mt-5 sm:text-lg ${
        onPhoto ? "text-white" : "text-white/70"
      }`;

  const captionStyle =
    captionColor === "green"
      ? { color: "#5cf2ab", textShadow: "0 0 12px rgba(92, 242, 171, 0.6)" }
      : { color: "#f9ba5c", textShadow: "0 0 12px rgba(249, 186, 92, 0.6)" };

  const copy = (
    <>
      {eyebrow &&
        (split ? (
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] ring-1 ring-white/15 sm:text-[13px]">
            <span className="h-1.5 w-1.5 rounded-full bg-linear-to-r from-[#f77bf0] to-[#7ef0ff]" />
            {eyebrow}
          </span>
        ) : (
          <p className={eyebrowClass}>{eyebrow}</p>
        ))}
      <h1 className={titleClassName}>{title}</h1>
      {split && badges && badges.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {badges.map((badge) => (
            <li
              key={badge.label}
              className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 py-1 pr-3 pl-1.5 text-xs font-semibold text-white/80"
            >
              <span className="flex h-5 w-5 items-center justify-center">{badge.icon}</span>
              {badge.label}
            </li>
          ))}
        </ul>
      )}
      {description && <p className={descriptionClass}>{description}</p>}
      {children}
    </>
  );

  if (split) {
    return (
      <section
        className="bg-expertise-hero relative overflow-hidden xl:grid xl:min-h-96 xl:grid-cols-2"
        style={
          {
            ...(tint ? { "--hero-tint": tint } : {}),
            // From xl: the right half holds the 16:9 illustration, so the hero
            // height tracks the viewport width (half of it, at 16:9), clamped
            // so it never gets squat or too tall.
            "--hero-h": "clamp(24rem, 27vw, 40rem)",
          } as CSSProperties
        }
      >
        {/* Left half: the copy, aligned to the page's max-width gutter. */}
        <div className="flex flex-col justify-center px-6 py-12 sm:px-8 xl:min-h-(--hero-h) xl:py-9 xl:pr-10 xl:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          <div className="xl:max-w-lg">{copy}</div>

          {/* Below xl: the illustration full-bleed, before the CTA — no arc,
              top and bottom edges faded into the field. */}
          <div className="relative -mx-6 mt-8 sm:-mx-8 xl:hidden">
            <Image
              src={image!}
              alt={imageAlt}
              width={1678}
              height={937}
              priority
              sizes="100vw"
              className="hero-photo-fade-y h-auto w-full"
            />
            {caption && (
              <span
                className="absolute top-3 right-4 text-[10px] font-semibold uppercase tracking-[0.4em]"
                style={captionStyle}
                aria-hidden="true"
              >
                {caption}
              </span>
            )}
          </div>

          {cta && <div className="mt-8 xl:max-w-lg">{cta}</div>}
        </div>

        {/* Right half (xl+): the illustration in a 16:9 frame, centred in the
            half so it's always shown whole; left edge clipped to an arc that
            bows into the copy side, top/bottom edges faded into the field —
            no rectangular backdrop. */}
        <div className="relative hidden items-center xl:flex">
          <div className="hero-arc-photo relative aspect-video w-full">
            <Image
              src={image!}
              alt={imageAlt}
              fill
              priority
              sizes="50vw"
              className="hero-photo-fade-bottom object-cover object-right"
            />
            {caption && (
              <span
                className="absolute top-7 right-6 text-[11px] font-semibold uppercase tracking-[0.4em]"
                style={captionStyle}
                aria-hidden="true"
              >
                {caption}
              </span>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-page-hero bg-office-gradient relative overflow-hidden">
      {onPhoto && (
        <>
          <Image src={image!} alt={imageAlt} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-[#0a0e24]/78" />
        </>
      )}
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {copy}
      </div>
    </section>
  );
}
