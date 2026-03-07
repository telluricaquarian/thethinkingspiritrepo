"use client";

// Bento media block — one tall portrait card left, two landscape cards stacked right.
// Replaces the previous horizontal marquee approach.

export default function HeroReelCarousel() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-3 lg:items-stretch">

      {/* ── Left: tall 9:16 portrait card ─────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl aspect-[9/16]">
        <video
          src="/images/beast.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 p-5 space-y-0.5">
          <p className="text-white text-sm font-semibold leading-tight">Andrew Ruiz</p>
          <p className="text-xs leading-tight" style={{ color: "rgba(255,255,255,0.62)" }}>
            Professional Boxer
          </p>
        </div>
      </div>

      {/* ── Right: two stacked landscape cards ────────────────────────── */}
      <div className="flex flex-col gap-3 lg:h-full">

        <div className="relative overflow-hidden rounded-2xl aspect-[16/9] lg:flex-1 lg:aspect-auto">
          <video
            src="/images/21.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 p-5 space-y-0.5">
            <p className="text-white text-sm font-semibold leading-tight">Andrew Ruiz</p>
            <p className="text-xs leading-tight" style={{ color: "rgba(255,255,255,0.62)" }}>
              Professional Boxer
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl aspect-[16/9] lg:flex-1 lg:aspect-auto">
          <video
            src="/images/beast.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 p-5 space-y-0.5">
            <p className="text-white text-sm font-semibold leading-tight">Andrew Ruiz</p>
            <p className="text-xs leading-tight" style={{ color: "rgba(255,255,255,0.62)" }}>
              Professional Boxer
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
