"use client";

// Hero media marquee — slow right-to-left loop with white edge fades.
// One group: portrait cards, landscape video cards, research info cards.
// Group is duplicated for seamless looping via translateX(-50%).

// 9:16 portrait at 320px height → 180px wide; 16:9 landscape → 568px wide
const CARD_H = 320;    // within 260–340 target range
const PORTRAIT_W = 180; // 9/16 × CARD_H
const LANDSCAPE_W = 568; // 16/9 × CARD_H
const RESEARCH_W = 280;

// ── Portrait video card ──────────────────────────────────────────────────────
function PortraitCard({ src, name, role }: { src: string; name?: string; role?: string }) {
  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-2xl"
      style={{ width: `${PORTRAIT_W}px`, height: `${CARD_H}px`, minHeight: "260px", maxHeight: "340px", aspectRatio: "9 / 16" }}
    >
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
      {name && (
        <>
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "90px",
            background: "linear-gradient(to top, rgba(0,0,0,0.58), transparent)",
          }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, padding: "14px" }}>
            <p style={{ color: "#fff", fontSize: "13px", fontWeight: 600, lineHeight: 1.3, margin: 0 }}>{name}</p>
            {role && <p style={{ color: "rgba(255,255,255,0.56)", fontSize: "11px", lineHeight: 1.3, margin: 0 }}>{role}</p>}
          </div>
        </>
      )}
    </div>
  );
}

// Small blue verification badge — inline SVG, no external deps
function VerifiedBadge() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      aria-label="Verified"
      style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}
    >
      <circle cx="6.5" cy="6.5" r="6.5" fill="#2563eb" />
      <path
        d="M3.8 6.5l1.8 1.8 3.6-3.6"
        stroke="#fff"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Landscape video card ─────────────────────────────────────────────────────
function LandscapeCard({
  src,
  name,
  nameVerified,
  role,
  roleVerified,
}: {
  src: string;
  name?: string;
  nameVerified?: boolean;
  role?: string;
  roleVerified?: boolean;
}) {
  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-2xl"
      style={{ width: `${LANDSCAPE_W}px`, height: `${CARD_H}px`, minHeight: "260px", maxHeight: "340px", aspectRatio: "16 / 9" }}
    >
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
      {name && (
        <>
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "96px",
            background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)",
          }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, padding: "14px", display: "flex", flexDirection: "column", gap: "3px" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
              <p style={{ color: "#fff", fontSize: "13px", fontWeight: 600, lineHeight: 1.3, margin: 0 }}>{name}</p>
              {nameVerified && <VerifiedBadge />}
            </span>
            {role && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                <p style={{ color: "rgba(255,255,255,0.56)", fontSize: "11px", lineHeight: 1.3, margin: 0 }}>{role}</p>
                {roleVerified && <VerifiedBadge />}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// ── Research info card ───────────────────────────────────────────────────────
function ResearchCard({
  topic,
  scholarCount,
  pubmedCount,
  copy,
}: {
  topic: string;
  scholarCount: string;
  pubmedCount: string;
  copy: string;
}) {
  return (
    <div
      className="shrink-0 rounded-2xl border border-neutral-200 bg-neutral-50 flex flex-col justify-between"
      style={{ width: `${RESEARCH_W}px`, height: `${CARD_H}px`, padding: "20px" }}
    >
      <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9ca3af", margin: 0 }}>
        Peer-Reviewed Research
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div>
          <p style={{ fontSize: "32px", fontWeight: 700, letterSpacing: "-0.03em", color: "#111827", lineHeight: 1, margin: 0 }}>
            {scholarCount}<span style={{ color: "#d1d5db", fontWeight: 300 }}>+</span>
          </p>
          <p style={{ fontSize: "10px", color: "#6b7280", lineHeight: 1.4, marginTop: "4px" }}>
            Google Scholar results<br />{topic}
          </p>
        </div>
        <div>
          <p style={{ fontSize: "32px", fontWeight: 700, letterSpacing: "-0.03em", color: "#111827", lineHeight: 1, margin: 0 }}>
            {pubmedCount}<span style={{ color: "#d1d5db", fontWeight: 300 }}>+</span>
          </p>
          <p style={{ fontSize: "10px", color: "#6b7280", lineHeight: 1.4, marginTop: "4px" }}>
            PubMed indexed studies
          </p>
        </div>
      </div>

      <p style={{ fontSize: "9px", color: "#9ca3af", lineHeight: 1.55, margin: 0 }}>
        {copy}
      </p>
    </div>
  );
}

// ── One full card group — duplicated for seamless loop ───────────────────────
function CardGroup() {
  return (
    <>
      {/* Portrait — Andy Ruiz Jr. */}
      <PortraitCard src="/images/21.mp4" name="Andy Ruiz Jr." role="Professional Boxer" />

      {/* Research card — Hydrogen-rich water */}
      <ResearchCard
        topic="hydrogen-rich water"
        scholarCount="93,400"
        pubmedCount="520"
        copy="Research spans metabolism, oxidative stress, inflammation, aging, and related health markers."
      />

      {/* Landscape — info20264 — Big Sean / Men's Health */}
      <LandscapeCard
        src="/images/info20264.mp4"
        name="Big Sean"
        nameVerified
        role="Men's Health interview"
        roleVerified
      />

      {/* Portrait — Eddie Hall */}
      <PortraitCard src="/images/beast.mp4" name="Eddie Hall" role="Strongman / Powerlifter" />

      {/* Research card — Deuterium-depleted water */}
      <ResearchCard
        topic="deuterium depleted water"
        scholarCount="76,800"
        pubmedCount="261"
        copy="Research includes isotope regulation, cancer-related investigations, metabolic adaptation, and broader biological effects."
      />

      {/* Landscape — info20265 */}
      <LandscapeCard src="/images/info20265.mp4" />

      {/* Portrait — info20261 */}
      <PortraitCard src="/images/info20261.mp4" />

      {/* Portrait — info20263 (between 261 and 262) */}
      <PortraitCard src="/images/info20263.mp4" />

      {/* Portrait — info20262 */}
      <PortraitCard src="/images/info20262.mp4" />
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
          animation: hreel-scroll 72s linear infinite;
          will-change: transform;
        }
        .hreel-root:hover .hreel-track {
          animation-play-state: paused;
        }
      `}</style>

      {/* Section wrapper — overflow-hidden clips the marquee, position-relative anchors the fades */}
      <div className="hreel-root relative overflow-hidden" style={{ paddingBlock: "3px", maxWidth: "1400px", margin: "0 auto" }}>

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
