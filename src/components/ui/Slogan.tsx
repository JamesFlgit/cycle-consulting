import { entreprise } from "@/data/entreprise";

// Brand gradient, dark variant — for the slogan on light backgrounds.
const GRADIENT_DARK = "bg-gradient-to-r from-[#fa11f7] via-[#132bdd] to-[#0bceff] bg-clip-text text-transparent";
// Brand gradient, light variant — for the slogan on dark backgrounds.
const GRADIENT_LIGHT = "bg-gradient-to-r from-[#f77bf0] via-[#6f8cf5] to-[#7ef0ff] bg-clip-text text-transparent";

export default function Slogan({
  variant = "dark",
  className,
  highlightFirst = false,
  gradientClassName,
}: {
  /** Use "light" when the slogan sits on a dark background, "dark" on a light background. */
  variant?: "dark" | "light";
  className?: string;
  /** Render the first word ("Apprendre") in bold with the light brand gradient. */
  highlightFirst?: boolean;
  /** Override the chevrons'/highlighted word's gradient (defaults to the
   * pink/cyan brand gradient for `variant`) — for a page with its own accent
   * colour. */
  gradientClassName?: string;
}) {
  const words = entreprise.slogan.split(", ");
  const gradient = gradientClassName ?? (variant === "light" ? GRADIENT_LIGHT : GRADIENT_DARK);

  return (
    <span className={className}>
      {words.map((word, index) => (
        <span key={word}>
          {index > 0 && <span className={`mx-1 font-bold sm:mx-2 ${gradient}`}>&gt;</span>}
          {index === 0 && highlightFirst ? (
            <span className={`font-bold ${gradient}`}>{word}</span>
          ) : (
            word
          )}
        </span>
      ))}
    </span>
  );
}
