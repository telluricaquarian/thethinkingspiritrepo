"use client";

// Hero media marquee — slow right-to-left loop with white edge fades.
// One group = [tall portrait | landscape | research card].
// Group is duplicated for seamless looping via translateX(-50%).

const CARD_H = 360; // px — explicit card height guarantees video render

// One group of cards. Duplicated below for seamless marquee loop.
function CardGroup() {
  return (
    <>
      {/* ── Andy Ruiz Jr. — tall 9:16 portrait ── */}
      <div
        className="relative shrink-0 overflow-hidden rounded-2xl"
        style={{ width: "200px", height: `${CARD_H}px` }}
      >
        <video
          src="/images/21.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "90px",
          background: "linear-gradient(to top, rgba(0,0,0,0.58), transparent)"
        }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, padding: "14px" }}>
          <p style={{ color: "#fff", fontSize: "13px", fontWeight: 600, lineHeight: 1.3, margin: 0 }}>Andy Ruiz Jr.</p>
          <p style={{ color: "rgba(255,255,255,0.56)", fontSize: "11px", lineHeight: 1.3, margin: 0 }}>Professional Boxer</p>
        </div>
      </div>

      {/* ── Eddie Hall — landscape card ── */}
      <div
        className="relative shrink-0 overflow-hidden rounded-2xl"
        style={{ width: "480px", height: `${CARD_H}px` }}
      >
        <video
          src="/images/beast.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "90px",
          background: "linear-gradient(to top, rgba(0,0,0,0.58), transparent)"
        }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, padding: "14px" }}>
          <p style={{ color: "#fff", fontSize: "13px", fontWeight: 600, lineHeight: 1.3, margin: 0 }}>Eddie Hall</p>
          <p style={{ color: "rgba(255,255,255,0.56)", fontSize: "11px", lineHeight: 1.3, margin: 0 }}>Strongman / Powerlifter</p>
        </div>
      </div>

      {/* ── Research authority card ── */}
      <div
        className="shrink-0 rounded-2xl border border-neutral-200 bg-neutral-50 flex flex-col justify-between"
        style={{ width: "280px", height: `${CARD_H}px`, padding: "20px" }}
      >
        <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9ca3af", margin: 0 }}>
          Peer-Reviewed Research
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <p style={{ fontSize: "32px", fontWeight: 700, letterSpacing: "-0.03em", color: "#111827", lineHeight: 1, margin: 0 }}>
              93,400<span style={{ color: "#d1d5db", fontWeight: 300 }}>+</span>
            </p>
            <p style={{ fontSize: "10px", color: "#6b7280", lineHeight: 1.4, marginTop: "4px" }}>
              Google Scholar results<br />hydrogen-rich water
            </p>
          </div>
          <div>
            <p style={{ fontSize: "32px", fontWeight: 700, letterSpacing: "-0.03em", color: "#111827", lineHeight: 1, margin: 0 }}>
              520<span style={{ color: "#d1d5db", fontWeight: 300 }}>+</span>
            </p>
            <p style={{ fontSize: "10px", color: "#6b7280", lineHeight: 1.4, marginTop: "4px" }}>
              PubMed indexed studies
            </p>
          </div>
        </div>

        <p style={{ fontSize: "9px", color: "#9ca3af", lineHeight: 1.55, margin: 0 }}>
          Research spans metabolism, oxidative stress, inflammation, aging, and related health markers.
        </p>
      </div>
    </>
  );
}

export default function HeroReelCarousel() {
  return (
    <>
      <style>{`
        @keyframes hreel-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .hreel-track {
          animation: hreel-scroll 36s linear infinite;
          will-change: transform;
        }
        .hreel-root:hover .hreel-track {
          animation-play-state: paused;
        }
      `}</style>

      {/* Section wrapper — overflow-hidden clips the marquee, position-relative anchors the fades */}
      <div className="hreel-root relative overflow-hidden" style={{ paddingBlock: "3px" }}>

        {/* Marquee track — two identical groups for seamless looping */}
        <div
          className="hreel-track flex"
          style={{ width: "max-content", gap: "12px" }}
          aria-hidden="true"
        >
          <CardGroup />
          <CardGroup />
        </div>

        {/* Left white edge fade */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0"
          style={{
            width: "120px",
            background: "linear-gradient(to right, #ffffff 10%, transparent 100%)",
          }}
        />

        {/* Right white edge fade */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0"
          style={{
            width: "120px",
            background: "linear-gradient(to left, #ffffff 10%, transparent 100%)",
          }}
        />
      </div>
    </>
  );
}
