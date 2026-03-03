"use client";

import * as React from "react";
import EoiModal from "./ui/eoi-modal";
import HeroEnquireModal from "./ui/hero-enquire-modal";
import { UsedByMarquee } from "./ui/used-by-marquee";
import { K8_USED_BY } from "../lib/usedBy";

const EXPLAINER_COLS = [
  {
    heading: "Setting the stage:",
    body: "What the right information and technology can do is cataclysmic and shifts paradigms so exponentially, so much so, that the shift itself just simply seems too good to be true, misinterpreted and or specious.",
  },
  {
    heading: "Introducing water electrolyzer technology:",
    body: "This is especially the case when applied to specific machinery, a device or apparatus known as a \"water electrolyzer\" or \"water ioniser\"",
  },
  {
    heading: "Working Principle:",
    body: "Electrolysis is the process whereby electricity is used to break apart a compound, add water to this, and you can see quite simply that water electrolysis is simply the use of electricity to break apart the compound known as water.",
  },
  {
    heading: "Useful byproducts",
    body: "One of the central benefits of water electrolysis is that the electrolysed water can gain and or contain high amounts of hydrogen and thus become hydrogen-rich water.\n\nHydrogen can function as a powerful selective antioxidant, which basically stops your body from losing electrons and or experience oxidative stress.",
  },
  {
    heading: "Understanding Oxidation and Reduction",
    body: "These are both electrochemical terms used and derived from the field of electrochemistry.\n\nOxidation means loss of electrons\n\nand\n\nReduction means addition of electrons.",
  },
  {
    heading: "Electrolysis Products / Electrochemical reaction products",
    body: "Hydrogen-Rich Water is but one electrolysis product that is found to be beneficial for consumption.\n\nTwo other notable electrolysis products that can be generated (depending on feed water composition) are hypochlorous acid (HOCl) and sodium hydroxide (NaOH), which can have valuable cleaning/sanitation use cases.",
  },
];

export default function DesktopHome() {
  const [eoiOpen, setEoiOpen] = React.useState(false);
  const [verifiedOpen, setVerifiedOpen] = React.useState(false);
  const [enquiryOpen, setEnquiryOpen] = React.useState(false);
  const panelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (verifiedOpen) {
      panelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [verifiedOpen]);

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="flex h-screen overflow-hidden">

        {/* ── Sidebar ── */}
        <aside className="relative w-48 shrink-0 border-r border-neutral-200 px-4 py-6 sticky top-0 h-screen">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/blacktts.png" alt="TTS" className="mb-8 h-7 w-auto" />
          <nav>
            <ul className="space-y-3 text-base text-neutral-700">
              <li>Home</li>
              <li>Water Resources</li>
              <li>Tools &amp; Functions</li>
              <li>Products &amp; Services</li>
            </ul>
          </nav>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/ta-2.png" alt="Telluricaquarian x TheThinkingSpirit" className="absolute left-4 bottom-4 h-8 w-auto opacity-90 z-20" />
        </aside>

        {/* ── Main scroll area ── */}
        <main className="flex-1 overflow-y-auto pb-14">

          {/* ── Hero / intro (white section) ── */}
          <div className="pt-10 px-8 pb-10 space-y-6">

            {/* Top pill */}
            <div className="flex">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-4 py-1.5 text-xs text-neutral-700 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/diveicon.png" alt="" aria-hidden="true" className="h-[24px] w-[24px] mr-2 object-contain" />
                Dive into a whole new understanding of water
              </span>
            </div>

            {/* Headline row */}
            <div className="flex items-center gap-6">
              <h1 className="text-3xl font-light lg:whitespace-nowrap">
                Change your life by <span className="font-editorial-ultralight-italic text-blue-600">education</span> and <span className="font-editorial-ultralight-italic text-blue-600">information</span> alone.
              </h1>
              <div className="flex-1 border-t border-gray-300" />
            </div>

            {/* Maxwell quote */}
            <div className="max-w-[760px] space-y-1">
              <p className="font-times text-sm italic text-black">
                Of all electrical phenomena electrolysis appears the most likely to furnish us with a real insight into the true nature of the electric current. because we find currents of ordinary matter and current of electricity forming essential parts of the same phenomenon.
              </p>
              <p className="text-xs text-gray-400">— James Clerk Maxwell</p>
              <p className="text-xs italic text-gray-400">A Treatise on Electricity and Magnetism</p>
              <p className="text-xs italic text-gray-400">Vol. 1, Oxford, 1873</p>
            </div>

            {/* Multi-column explainer row */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 border-t border-gray-200 pt-6">
              {EXPLAINER_COLS.map((col) => (
                <div key={col.heading} className="space-y-2">
                  <p className="text-xs font-medium text-neutral-700">
                    {col.heading}
                  </p>
                  <p className="text-xs text-neutral-600 leading-snug">{col.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Product section (white) ── */}
          <div className="bg-white px-8 py-10">
            {/* ── K8 Detail: 2-col layout ── */}
            <div className="grid grid-cols-[3fr_2fr] gap-10 items-start border-b border-neutral-200 pb-10">

              {/* Left: image / video thumbnail */}
              <div className="relative w-full aspect-[4/3] rounded-md border border-neutral-200 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/newaqua.png"
                  alt="Level uk K8 Water Ioniser"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Play overlay */}
                <button
                  type="button"
                  aria-label="Play video"
                  className="absolute inset-0 grid place-items-center cursor-pointer"
                  onClick={() => setEnquiryOpen(true)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setEnquiryOpen(true); }}
                >
                  {/* Radar pulse rings */}
                  <span aria-hidden="true" className="absolute h-16 w-16 rounded-full bg-blue-600 vsl-pulse" />
                  <span aria-hidden="true" className="absolute h-16 w-16 rounded-full bg-blue-600 vsl-pulse-delay" />
                  {/* Play icon */}
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <polygon points="7,4 17,10 7,16" className="fill-blue-600" />
                    </svg>
                  </span>
                </button>
              </div>

              {/* Right: product details */}
              <div className="flex min-w-0 flex-col gap-4">

                {/* Title block */}
                <div className="space-y-0.5">
                  <h2 className="text-base font-medium leading-snug">
                    The &ldquo;Level uk K8&rdquo; water ioniser/water electrolyzer from enagic&reg;
                  </h2>
                  <p className="text-xs text-blue-600">
                    Level uk K8 | Water Ioniser / Electrolyzer
                  </p>
                  <p className="text-xs text-neutral-400">[ SKU 1018 ]</p>
                </div>

                {/* Used by marquee */}
                <UsedByMarquee items={K8_USED_BY} theme="light" duration={28} />

                {/* Verified posts toggle */}
                <button
                  type="button"
                  onClick={() => setVerifiedOpen((v) => !v)}
                  className="self-start text-[10px] font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  {verifiedOpen ? "Hide verified posts" : "View verified posts →"}
                </button>

                {/* Verified posts panel */}
                {verifiedOpen && (
                  <div ref={panelRef} className="rounded-lg border border-neutral-200 bg-white overflow-hidden">
                    {/* Panel header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100">
                      <div>
                        <p className="text-xs font-semibold text-black">Verified Posts</p>
                        <p className="text-[10px] text-neutral-400">Real people using Kangen Water®</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setVerifiedOpen(false)}
                        aria-label="Close verified posts"
                        className="text-neutral-400 hover:text-neutral-700 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
                          <path d="M2.22 2.22a.75.75 0 0 1 1.06 0L8 6.94l4.72-4.72a.75.75 0 1 1 1.06 1.06L9.06 8l4.72 4.72a.75.75 0 1 1-1.06 1.06L8 9.06l-4.72 4.72a.75.75 0 0 1-1.06-1.06L6.94 8 2.22 3.28a.75.75 0 0 1 0-1.06Z" />
                        </svg>
                      </button>
                    </div>
                    {/* Panel rows */}
                    {K8_USED_BY.map((item) => (
                      <div key={item.handle} className="flex items-center gap-3 px-4 py-3 border-b border-neutral-100 last:border-b-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.avatarSrc} alt={item.name} className="h-9 w-9 rounded-full object-cover shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-black truncate">{item.name}</p>
                          <p className="text-[10px] text-blue-600">{item.handle}</p>
                          <p className="text-[10px] text-neutral-400">{item.role}</p>
                        </div>
                        {item.postUrl && (
                          <a
                            href={item.postUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-medium px-2.5 py-1 rounded transition-colors"
                          >
                            View Post
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Price columns */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-wide text-blue-600 font-medium">
                      Methods &amp; Options
                    </p>
                    <p className="text-[10px] uppercase tracking-wide text-neutral-500 font-semibold">
                      Total One-Time Payment
                    </p>
                    <p className="text-xl font-semibold text-black">$6,787.00</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-wide text-blue-600 font-medium">
                      Methods &amp; Options
                    </p>
                    <p className="text-[10px] uppercase tracking-wide text-neutral-500 font-semibold">
                      Payment Plan – Australia
                    </p>
                    <div className="space-y-1 pt-0.5">
                      <div>
                        <p className="text-xs font-semibold text-black">10 Months</p>
                        <p className="text-[10px] text-neutral-500">Initial: AU$1,900</p>
                        <p className="text-[10px] text-neutral-700 font-medium">AU$514 / month</p>
                      </div>
                      <div className="pt-1">
                        <p className="text-xs font-semibold text-black">24 Months</p>
                        <p className="text-[10px] text-neutral-500">Initial: AU$1,123</p>
                        <p className="text-[10px] text-neutral-700 font-medium">AU$252 / month</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Patents + Certifications */}
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-neutral-100">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-wide text-neutral-400 font-semibold">Patents</p>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      JP2005152847A<br />
                      JP2005144418A<br />
                      JP2005074388A<br />
                      JP2006087987A
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-wide text-neutral-400 font-semibold">Certifications</p>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      ISO 9001<br />
                      ISO 13485<br />
                      ISO 14001
                    </p>
                  </div>
                </div>

                {/* Enquire CTA */}
                <div>
                  <button
                    type="button"
                    onClick={() => setEoiOpen(true)}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded transition-colors"
                  >
                    Enquire Now
                    <span aria-hidden="true">&rarr;</span>
                  </button>
                </div>

              </div>
            </div>

            {/* ── Hydrogen-Rich Water benefits ── */}
            <div className="py-8 border-b border-neutral-200">
              <h3 className="text-sm font-medium text-black mb-5">
                Hydrogen-Rich Water &ndash; Benefits made simple
              </h3>
              <div className="grid grid-cols-3 gap-8">
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-neutral-700">Powerful Selective Antioxidant</p>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    Hydrogen-Rich Water acts as a powerful selective antioxidant. Unlike traditional supplements, molecular hydrogen specifically targets and eliminates harmful hydroxyl radicals while leaving beneficial species intact. This precision helps protect your cells and DNA from oxidative damage throughout your body.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-neutral-700">Therapeutic Potential</p>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    Regular Consumption can alleviate various conditions, including metabolic syndromes, cardiovascular issues, and rheumatoid arthritis. Because hydrogen molecules are small, they easily permeate cell membranes, reaching vital organs like the brain to help manage inflammations and promote healthy cellular metabolism.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-neutral-700">Increased Energy</p>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    Electrolysis is the process whereby electricity is used to break apart a compound, add water to this, and you can see quite simply that water electrolysis is simply the use of electricity to break apart the compound known as water.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* ── Footer ── */}
          <footer className="fixed bottom-0 left-48 right-0 z-20 border-t border-neutral-200 bg-white px-8 py-4">
            <div className="flex items-center justify-between gap-6">

              {/* Left: copyright */}
              <div className="flex items-center gap-2 shrink-0">
                <p className="text-xs text-neutral-400">
                  &copy;{new Date().getFullYear()} Building &amp; designing anew.
                </p>
              </div>

              {/* Center: nav links */}
              <nav className="flex items-center gap-4">
                <a href="#" className="text-xs text-neutral-400 hover:text-neutral-700 transition-colors">Terms of Service</a>
                <a href="#" className="text-xs text-neutral-400 hover:text-neutral-700 transition-colors">Privacy Policy</a>
                <a href="#" className="text-xs text-neutral-400 hover:text-neutral-700 transition-colors">Branding Guidelines</a>
              </nav>

              {/* Right: Book a Call */}
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded bg-black px-3 py-1.5 text-xs font-medium text-white hover:bg-neutral-800 transition-colors shrink-0"
              >
                Book a Call
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.86.31 1.7.57 2.5a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.58-1.09a2 2 0 0 1 2.11-.45c.8.26 1.64.45 2.5.57A2 2 0 0 1 22 16.92z" />
                </svg>
              </button>

            </div>
          </footer>
        </main>
      </div>

      <EoiModal open={eoiOpen} onOpenChange={setEoiOpen} />
      <HeroEnquireModal open={enquiryOpen} onOpenChange={setEnquiryOpen} videoSrc="" />
    </div>
  );
}
