"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { X } from "lucide-react";

type WaitlistModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function WaitlistModal({
  open,
  onOpenChange,
}: WaitlistModalProps) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  function reset() {
    setName("");
    setEmail("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // UI-only for now (hook into webhook later)
    // eslint-disable-next-line no-alert
    alert("Joined waitlist — thank you.");
    onOpenChange(false);
    reset();
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-[2px]" />

        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-[#0b0b0b] p-6 shadow-2xl outline-none">
          {/* Close */}
          <Dialog.Close asChild>
            <button
              type="button"
              aria-label="Close"
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </Dialog.Close>

          {/* Header */}
          <div className="flex items-start gap-3">
            {/* Logo (slightly rounded, matching TTSBW treatment) */}
            <div className="relative h-9 w-9 overflow-hidden rounded-md ring-1 ring-white/10 bg-white/5">
              <Image
                src="/images/ttsorange.png"
                alt="TTS"
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="min-w-0">
              <div className="text-xs font-medium text-white/70">
                Building and designing anew.
              </div>
              <div className="text-xs text-white/40">2026©</div>
            </div>
          </div>

          <h2 className="mt-6 text-[26px] leading-tight font-semibold text-white md:text-[28px]">
            Join Waitlist
          </h2>

          <p className="mt-2 text-[13px] leading-relaxed text-white/55 md:text-sm">
            Get a free prototype / MVP built by Llewellyn.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-white/60">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your name"
                className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-white/20 focus:bg-white/7"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-white/60">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                placeholder="you@domain.com"
                className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-white/20 focus:bg-white/7"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => {
                  onOpenChange(false);
                  reset();
                }}
                className="rounded-xl border border-white/10 bg-transparent px-4 py-2 text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white"
              >
                Cancel
              </button>

              {/* ORANGE-stroke submit */}
              <button
                type="submit"
                className="rounded-xl border border-[#FF751F] bg-transparent px-5 py-2 text-sm font-medium text-[#FF751F] transition hover:bg-[#FF751F]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF751F]/60"
              >
                Join Waitlist
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
