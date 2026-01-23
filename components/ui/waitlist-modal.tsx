"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

type EoiModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function EoiModal({ open, onOpenChange }: EoiModalProps) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [social, setSocial] = React.useState("");

  function reset() {
    setName("");
    setEmail("");
    setSocial("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // UI-only for now (hook into webhook later)
    // eslint-disable-next-line no-alert
    alert("EOI submitted — thank you.");
    onOpenChange(false);
    reset();
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-[2px]" />

        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-[#0b0b0b] p-6 shadow-2xl outline-none">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="text-lg font-semibold text-white">
                Expression of Interest
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-white/55">
                Leave your details and we’ll reach out with next steps.
              </Dialog.Description>
            </div>

            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
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

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-white/60">
                Social (optional)
              </label>
              <input
                value={social}
                onChange={(e) => setSocial(e.target.value)}
                placeholder="@handle or link"
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

              <button
                type="submit"
                className="rounded-xl border border-green-600 bg-transparent px-5 py-2 text-sm font-medium text-green-400 transition hover:bg-green-600/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/60"
              >
                Submit EOI
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
