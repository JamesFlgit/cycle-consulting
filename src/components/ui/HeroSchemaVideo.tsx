"use client";

export default function HeroSchemaVideo({ className }: { className?: string }) {
  // No hardcoded `w-full`/position here — every caller passes its own width
  // and position classes (mobile: w-full in-flow; desktop: w-[44vw] absolute).
  // A hardcoded width or position utility here would fight the caller's for
  // the same CSS property, and which one wins is decided by Tailwind's
  // internal utility ordering (not by className string order), which isn't
  // guaranteed stable across dev-server rebuilds — see the earlier
  // relative/absolute bug this same component had.
  return (
    <div className={`aspect-square ${className ?? ""}`}>
      {/* Inner positioning context for the captions — the outer element's
          position utility belongs to the caller (see note above), so it
          can't be `relative` itself. */}
      <div className="relative h-full w-full">
        {/* "Build" / "Run" captions, coloured to echo the yellow ("Build")
            and green ("Run") neon signs inside the video. */}
        <span
          className="pointer-events-none absolute inset-x-0 top-[3%] text-center text-[9px] font-semibold uppercase tracking-[0.35em] sm:text-[11px] lg:text-xs"
          style={{ color: "#f9ba5c", textShadow: "0 0 12px rgba(249, 186, 92, 0.55)" }}
          aria-hidden="true"
        >
          Build
        </span>
        <span
          className="pointer-events-none absolute inset-x-0 bottom-[3%] text-center text-[9px] font-semibold uppercase tracking-[0.35em] sm:text-[11px] lg:text-xs"
          style={{ color: "#5cf2ab", textShadow: "0 0 12px rgba(92, 242, 171, 0.55)" }}
          aria-hidden="true"
        >
          Run
        </span>
        <video
          className="h-full w-full object-contain"
          style={{
            // A circular background glow can never exactly line up with this
            // video's square edges — sized to the corner it clears too late
            // on the flat sides, sized to the side it eats the corners. Two
            // independent linear fades (one per axis), intersected, erode
            // only a thin margin along each flat edge, leaving the corners —
            // where the 4 outer platforms sit — untouched.
            maskImage:
              "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
            maskComposite: "intersect",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
            WebkitMaskComposite: "source-in, source-in",
          }}
          src="/videos/hero-schema.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
