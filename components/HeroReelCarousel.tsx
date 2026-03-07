"use client";

const REELS = [
  {
    src: "/images/21.mp4",
    name: "Andrew Ruiz",
    profession: "Professional Boxer",
  },
  {
    src: "/images/beast.mp4",
    name: "Andrew Ruiz",
    profession: "Professional Boxer",
  },
];

// Enough copies to fill any viewport width for a seamless marquee.
// Each card is ~252px (240 + 12px gap). 8 copies × 2 videos = 16 cards ≈ 4032px per half.
const LOOP_ITEMS = Array.from({ length: 8 }, () => REELS).flat();

export default function HeroReelCarousel() {
  return (
    <>
      <style>{`
        @keyframes reel-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .reel-track {
          animation: reel-marquee 28s linear infinite;
          will-change: transform;
        }
        .reel-section:hover .reel-track {
          animation-play-state: paused;
        }
      `}</style>

      <section className="reel-section overflow-hidden w-full">
        <div
          className="reel-track flex gap-3"
          style={{ width: "max-content" }}
        >
          {LOOP_ITEMS.map((reel, idx) => (
            <div
              key={idx}
              className="relative shrink-0 overflow-hidden rounded-2xl"
              style={{ width: "240px", aspectRatio: "9 / 16" }}
            >
              {/* Video */}
              <video
                src={reel.src}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.15) 45%, transparent 65%)",
                }}
              />

              {/* Bottom-left label */}
              <div className="absolute bottom-0 left-0 p-4 space-y-0.5">
                <p className="text-white text-sm font-semibold leading-tight">
                  {reel.name}
                </p>
                <p
                  className="text-xs leading-tight"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  {reel.profession}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
