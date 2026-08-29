"use client";

export default function HeroSchemaVideo({ className }: { className?: string }) {
  return (
    <div className={`aspect-square w-full ${className ?? ""}`}>
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
