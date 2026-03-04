"use client";

import * as React from "react";

const DEFAULT_VIDEO_URL = "https://www.youtube.com/embed/BNDTtW-d6E0?si=bKgDXW9bLhOB8tS7";

type HeroEnquireModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoSrc?: string;
  title?: string;
};

export default function HeroEnquireModal({
  open,
  onOpenChange,
  videoSrc,
  title = "The Level uk K8\u00ae water ioniser/water electrolyzer from enagic\u00ae",
}: HeroEnquireModalProps) {
  // Body scroll lock
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // ESC closes
  React.useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center p-6"
      aria-modal="true"
      role="dialog"
      aria-label={title}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />

      {/* Modal container */}
      <div
        className="relative w-full max-w-6xl rounded-2xl border border-neutral-200 bg-white shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 hover:text-neutral-800 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
            <path d="M2.22 2.22a.75.75 0 0 1 1.06 0L8 6.94l4.72-4.72a.75.75 0 1 1 1.06 1.06L9.06 8l4.72 4.72a.75.75 0 1 1-1.06 1.06L8 9.06l-4.72 4.72a.75.75 0 0 1-1.06-1.06L6.94 8 2.22 3.28a.75.75 0 0 1 0-1.06Z" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr]">
          {/* LEFT: video player — controls only, no extra click handler */}
          <div className="relative aspect-video bg-black overflow-hidden rounded-tl-2xl rounded-bl-2xl">
            {/* Pill overlay */}
            <div className="pointer-events-none absolute top-3 left-3 md:top-4 md:left-4 z-10">
              <span className="inline-flex items-center rounded-full border border-white/30 bg-white/20 px-3 py-1 text-[10px] md:text-xs text-white shadow-sm backdrop-blur-sm">
                Dive into a whole new understanding of water
              </span>
            </div>
            <iframe
              src={videoSrc ?? DEFAULT_VIDEO_URL}
              title="Level uk K8 Water Ioniser"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>

          {/* RIGHT: copy + form */}
          <div className="flex flex-col gap-5 p-8">
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-wide text-blue-600 font-medium">
                Level uk K8 | Water Ioniser / Electrolyzer
              </p>
              <h2 className="text-base font-medium leading-snug text-black">{title}</h2>
            </div>

            <p className="text-xs text-neutral-500 leading-relaxed">
              What the right information and technology can do is cataclysmic and shifts paradigms
              so exponentially, so much so, that the shift itself just simply seems too good to be
              true, misinterpreted and or specious.
            </p>

            {/* Form fields */}
            <div className="space-y-3">
              <input
                type="text"
                placeholder="First Name"
                className="w-full rounded border border-neutral-200 px-3 py-2 text-sm text-black placeholder:text-neutral-400 outline-none focus:border-blue-400 transition-colors"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded border border-neutral-200 px-3 py-2 text-sm text-black placeholder:text-neutral-400 outline-none focus:border-blue-400 transition-colors"
              />
              <input
                type="text"
                placeholder="Social Media"
                className="w-full rounded border border-neutral-200 px-3 py-2 text-sm text-black placeholder:text-neutral-400 outline-none focus:border-blue-400 transition-colors"
              />
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-2 self-start rounded bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 transition-colors"
            >
              Enquire Now
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
