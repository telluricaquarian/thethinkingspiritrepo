"use client";

// Static bento hero media block — no marquee, no animation.
// Left: one tall portrait card. Right: one video card + one research stat card.

export default function HeroReelCarousel() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[5fr_8fr] gap-3">

      {/* ── Left: tall portrait video ─────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl h-[380px] lg:h-[460px]">
        <video
          src="/images/beast.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Subtle bottom fade for label legibility only */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/55 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4 space-y-0.5">
          <p className="text-white text-sm font-semibold leading-tight">Andy Ruiz Jr.</p>
          <p className="text-[11px] leading-tight" style={{ color: "rgba(255,255,255,0.58)" }}>
            Professional Boxer
          </p>
        </div>
      </div>

      {/* ── Right column: video top + research card bottom ────────────── */}
      <div className="flex flex-col gap-3 h-[380px] lg:h-[460px]">

        {/* Top right: second video */}
        <div className="relative flex-1 overflow-hidden rounded-2xl">
          <video
            src="/images/21.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/55 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4 space-y-0.5">
            <p className="text-white text-sm font-semibold leading-tight">Andy Ruiz Jr.</p>
            <p className="text-[11px] leading-tight" style={{ color: "rgba(255,255,255,0.58)" }}>
              Professional Boxer
            </p>
          </div>
        </div>

        {/* Bottom right: hydrogen-rich water research stat card */}
        <div className="flex-1 flex flex-col justify-between rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
          <p className="text-[9px] font-semibold uppercase tracking-widest text-neutral-400">
            Peer-Reviewed Research
          </p>

          <div className="flex gap-6">
            <div>
              <p className="text-2xl font-bold tracking-tight text-black">
                93,400<span className="text-neutral-400 font-normal">+</span>
              </p>
              <p className="text-[10px] text-neutral-500 leading-snug mt-0.5">
                Google Scholar results<br />hydrogen-rich water
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-black">
                520<span className="text-neutral-400 font-normal">+</span>
              </p>
              <p className="text-[10px] text-neutral-500 leading-snug mt-0.5">
                PubMed indexed<br />studies
              </p>
            </div>
          </div>

          <p className="text-[9px] text-neutral-400 leading-relaxed max-w-xs">
            Ongoing literature across metabolism, oxidative stress,
            inflammation, aging, and radiotherapy support.
          </p>
        </div>

      </div>

    </div>
  );
}
