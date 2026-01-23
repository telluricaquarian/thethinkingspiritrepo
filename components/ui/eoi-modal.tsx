"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import Image from "next/image";

type EoiModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function EoiModal({ open, onOpenChange }: EoiModalProps) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [social, setSocial] = React.useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    // TODO: wire this to Sheets/Resend/etc. later
    // For now: close modal on submit
    onOpenChange(false);

    // Optional: clear fields
    setName("");
    setEmail("");
    setSocial("");
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />

        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-black/90 p-6 text-white shadow-2xl">
          {/* Brand strip (top-left), matching the services/orange card pattern */}
          <div className="mb-4 flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-md ring-1 ring-white/10 bg-white/5">
              <Image
                src="/images/ttsbw.png"
                alt="TTS"
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="min-w-0">
              <p className="text-sm text-white/60">Building and designing anew.</p>
              <p className="text-sm text-white">2026©</p>
            </div>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <Dialog.Title className="text-lg font-semibold">
                Expression of Interest
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-white/60">
                Drop your details and I’ll reach out with procurement + next steps.
              </Dialog.Description>
            </div>

            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close"
                className="rounded-lg p-2 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </div>

          <form onSubmit={onSubmit} className="mt-5 space-y-4">
            <div className="space-y-2">
              <label className="text-xs text-white/60">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs text-white/60">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                type="email"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs text-white/60">
                Social (optional)
              </label>
              <input
                value={social}
                onChange={(e) => setSocial(e.target.value)}
                placeholder="@handle or link"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="rounded-xl border border-white/15 bg-transparent px-5 py-2.5 text-sm text-white/80 hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
              </Dialog.Close>

              <button
                type="submit"
                className="rounded-xl border border-green-600 bg-transparent px-5 py-2.5 text-sm font-medium text-green-500 hover:bg-green-600/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/60 transition-colors"
              >
                Submit
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
