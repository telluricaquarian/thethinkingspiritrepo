"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import Image from "next/image";

type EoiModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

export default function EoiModal({ open, onOpenChange }: EoiModalProps) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [social, setSocial] = React.useState("");

  // Honeypot (should stay empty)
  const [company, setCompany] = React.useState("");

  const [submitState, setSubmitState] = React.useState<SubmitState>({
    status: "idle",
  });

  function resetFields() {
    setName("");
    setEmail("");
    setSocial("");
    setCompany("");
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitState.status === "submitting") return;

    setSubmitState({ status: "submitting" });

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          social,
          source: "green_product_card",
          honeypot: company, // keep empty; if filled, backend should skip write
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || (data && data.ok === false)) {
        const msg =
          (data && (data.error || data.message)) ||
          `Request failed (${res.status})`;
        throw new Error(msg);
      }

      setSubmitState({ status: "success" });

      // Close modal after a short beat so the user sees success
      setTimeout(() => {
        onOpenChange(false);
        resetFields();
        setSubmitState({ status: "idle" });
      }, 450);
    } catch (err) {
      setSubmitState({
        status: "error",
        message:
          err instanceof Error ? err.message : "Something went wrong. Try again.",
      });
    }
  }

  // When modal closes, reset transient UI state
  React.useEffect(() => {
    if (!open) {
      setSubmitState({ status: "idle" });
      // Don’t auto-clear fields here unless you want it
      // resetFields();
    }
  }, [open]);

  const isSubmitting = submitState.status === "submitting";

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />

        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-black/90 p-6 text-white shadow-2xl">
          {/* Brand strip */}
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
                Submit your details to receive a short email sequence with water
                insights, product information, and complimentary resources.
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
            {/* Honeypot field (hidden) */}
            <div className="hidden">
              <label className="text-xs text-white/60">Company</label>
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs text-white/60">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20"
                required
                disabled={isSubmitting}
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
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs text-white/60">Social (optional)</label>
              <input
                value={social}
                onChange={(e) => setSocial(e.target.value)}
                placeholder="@handle or link"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20"
                disabled={isSubmitting}
              />
            </div>

            {/* Status line */}
            {submitState.status === "error" ? (
              <p className="text-sm text-red-300">{submitState.message}</p>
            ) : submitState.status === "success" ? (
              <p className="text-sm text-green-300">Submitted — check your inbox.</p>
            ) : null}

            {/* Buttons */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="rounded-xl border border-white/15 bg-transparent px-5 py-2.5 text-sm text-white/80 hover:bg-white/10 transition-colors disabled:opacity-60"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
              </Dialog.Close>

              <button
                type="submit"
                className="rounded-xl border border-green-600 bg-transparent px-5 py-2.5 text-sm font-medium text-green-500 hover:bg-green-600/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/60 transition-colors disabled:opacity-60"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
