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
  );
}
