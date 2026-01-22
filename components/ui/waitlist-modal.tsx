"use client";

import * as React from "react";
import Image from "next/image";

type WaitlistModalProps = {
  open: boolean;

  /** Preferred (controlled modal style) */
  onOpenChange?: (open: boolean) => void;

  /** Back-compat with earlier page.tsx implementations */
  onClose?: () => void;
  onSubmit?: (payload: { name: string; email: string }) => void | Promise<void>;
};

export default function WaitlistModal({
  open,
  onOpenChange,
  onClose,
  onSubmit,
}: WaitlistModalProps) {
  if (!open) return null;

  const close = () => {
    onOpenChange?.(false);
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close waitlist modal"
        className="absolute inset-0 bg-black/70"
        onClick={close}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative mx-auto mt-14 w-[92%] max-w-[760px] rounded-[22px] border border-white/10 bg-[#0b0b0c]/95 p-6 shadow-2xl backdrop-blur-xl md:mt-20 md:p-7"
      >
        {/* Close */}
        <button
          type="button"
          aria-label="Close"
          onClick={close}
          className="absolute right-5 top-5 text-white/60 transition-colors hover:text-white md:right-6 md:top-6"
        >
          ✕
        </button>

        {/* Header row */}
        <div className="flex items-start gap-4">
          {/* Logo (no white stroke/ring) */}
          <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-transparent">
            <Image
              src="/images/ttsfav.png"
              alt="TTS"
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="min-w-0">
            <div className="text-sm font-medium text-white/70">
              Building and designing anew.
            </div>
            <div className="text-sm text-white/40">2026©</div>
          </div>
        </div>

        {/* Title + subtitle (smaller, especially on mobile) */}
        <h2 className="mt-7 text-[34px] font-semibold leading-[1.05] text-white md:mt-8 md:text-[40px]">
          Join Waitlist
        </h2>
        <p className="mt-2 text-sm text-white/55 md:text-base">
          Get a free prototype / MVP built by Llewellyn.
        </p>

        {/* Form */}
        <form
          className="mt-7 space-y-5 md:mt-8"
          onSubmit={async (e) => {
            e.preventDefault();

            const form = e.currentTarget;
            const fd = new FormData(form);
            const name = String(fd.get("name") ?? "").trim();
            const email = String(fd.get("email") ?? "").trim();

            if (onSubmit) {
              await onSubmit({ name, email });
            }

            // UI-first behavior: close after submit
            close();
          }}
        >
          <input
            required
            name="name"
            placeholder="Name *"
            className="h-14 w-full rounded-2xl bg-white/10 px-6 text-base text-white placeholder:text-white/35 ring-1 ring-white/10 outline-none focus:ring-2 focus:ring-white/25 md:text-lg"
          />

          <input
            required
            type="email"
            name="email"
            placeholder="Email *"
            className="h-14 w-full rounded-2xl bg-white/10 px-6 text-base text-white placeholder:text-white/35 ring-1 ring-white/10 outline-none focus:ring-2 focus:ring-white/25 md:text-lg"
          />

          {/* Stroke-only button (white stroke), subtle hover gradient + mobile tap pulse */}
          <button
            type="submit"
            className="
              mt-1 h-14 w-full rounded-2xl
              border border-white/55 bg-transparent
              text-base font-medium text-[#FF751F]
              transition-all
              hover:border-white/80 hover:bg-gradient-to-r hover:from-white/0 hover:via-white/10 hover:to-white/0
              active:bg-white/10 active:scale-[0.99]
              focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30
              md:text-lg
            "
          >
            Join Waitlist
          </button>
        </form>
      </div>
    </div>
  );
}
