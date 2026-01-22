"use client";

import * as React from "react";
import Image from "next/image";

type WaitlistModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function WaitlistModal({ open, onOpenChange }: WaitlistModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close waitlist modal"
        className="absolute inset-0 bg-black/70"
        onClick={() => onOpenChange(false)}
      />

      {/* Modal */}
      <div className="relative mx-auto mt-20 w-[92%] max-w-[820px] rounded-[24px] border border-white/10 bg-[#0b0b0c]/95 p-8 shadow-2xl backdrop-blur-xl">
        {/* Close */}
        <button
          type="button"
          aria-label="Close"
          onClick={() => onOpenChange(false)}
          className="absolute right-6 top-6 text-white/60 hover:text-white"
        >
          ✕
        </button>

        {/* Header row */}
        <div className="flex items-start gap-4">
          <div className="relative h-10 w-10 overflow-hidden rounded-xl ring-1 ring-white/10 bg-black/40">
            <Image
              src="/images/ttsfav.png"
              alt="TTS"
              fill
              className="object-contain p-1"
              priority
            />
          </div>

          <div className="min-w-0">
            <div className="text-sm font-medium text-white/70">Building and designing anew.</div>
            <div className="text-sm text-white/40">2026©</div>
          </div>
        </div>

        {/* Title + subtitle */}
        <h2 className="mt-8 text-4xl font-semibold text-white">Join Waitlist</h2>
        <p className="mt-2 text-base text-white/55">
          Get a free prototype / MVP built by Llewellyn.
        </p>

        {/* Form */}
        <form
          className="mt-8 space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            // UI first — we’ll wire webhook after
            onOpenChange(false);
          }}
        >
          <input
            required
            name="name"
            placeholder="Name *"
            className="h-14 w-full rounded-2xl bg-white/10 px-6 text-lg text-white placeholder:text-white/35 ring-1 ring-white/10 outline-none focus:ring-2 focus:ring-orange-400/40"
          />
          <input
            required
            type="email"
            name="email"
            placeholder="Email *"
            className="h-14 w-full rounded-2xl bg-white/10 px-6 text-lg text-white placeholder:text-white/35 ring-1 ring-white/10 outline-none focus:ring-2 focus:ring-orange-400/40"
          />

          <button
            type="submit"
            className="mt-2 h-14 w-full rounded-2xl bg-[#a35a00] text-lg font-semibold text-white/80 hover:text-white"
          >
            Join Waitlist
          </button>
        </form>
      </div>
    </div>
  );
}
