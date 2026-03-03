"use client";

import * as React from "react";

type VideoModalProps = {
  open: boolean;
  onClose: () => void;
  src: string;
  title?: string;
};

export default function VideoModal({ open, onClose, src, title }: VideoModalProps) {
  // Lock body scroll while open
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
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      aria-modal="true"
      role="dialog"
      aria-label={title ?? "Video"}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Container */}
      <div
        className="relative w-[90vw] max-w-5xl aspect-video rounded-lg border border-neutral-200 overflow-hidden bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute top-3 right-3 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-neutral-200 bg-white/90 text-neutral-700 hover:bg-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
            <path d="M2.22 2.22a.75.75 0 0 1 1.06 0L8 6.94l4.72-4.72a.75.75 0 1 1 1.06 1.06L9.06 8l4.72 4.72a.75.75 0 1 1-1.06 1.06L8 9.06l-4.72 4.72a.75.75 0 0 1-1.06-1.06L6.94 8 2.22 3.28a.75.75 0 0 1 0-1.06Z" />
          </svg>
        </button>

        {/* Video */}
        <video
          src={src}
          className="h-full w-full object-contain"
          autoPlay
          controls
          playsInline
          preload="metadata"
          title={title}
        />
      </div>
    </div>
  );
}
