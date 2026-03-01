"use client";

import * as React from "react";
import localFont from "next/font/local";
import EoiModal from "./ui/eoi-modal";

const ppEditorial = localFont({
  src: "../public/PPEditorialNew-UltralightItalic.otf",
  display: "swap",
});

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
    body: "Hydrogen-Rich Water is but one electrolysis product that is found to be beneficial for consumption.\n\nTwo other notable electrolysis products that can be created, especially by and from the machine mentioned on this page known as Hypochlorous acid and NaOH Ionostat can both offer tremendous valuable use cases, especially in regards to cleaning.",
  },
];

export default function DesktopHome() {
  const [eoiOpen, setEoiOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="flex h-screen overflow-hidden">

        {/* ── Sidebar ── */}
        <aside className="w-48 shrink-0 border-r border-neutral-200 px-4 py-6 sticky top-0 h-screen">
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
              <h1 className="text-3xl font-light whitespace-nowrap">
                Change your life by <span className={ppEditorial.className}>education</span> and <span className={ppEditorial.className}>information</span> alone.
              </h1>
              <div className="flex-1 border-t border-gray-300" />
            </div>

            {/* Maxwell quote */}
            <div className="max-w-[760px] space-y-1">
              <p className="text-sm italic text-gray-400">
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
            <div className="grid grid-cols-[3fr_2fr] gap-10 border-b border-neutral-200 pb-10">

              {/* Left: image */}
              <div className="relative w-full aspect-[4/3] bg-neutral-50 rounded overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/newaqua.png"
                  alt="Level uk K8 Water Ioniser"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Right: product details */}
              <div className="flex flex-col gap-4">

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

                {/* Used by box */}
                <div className="border border-neutral-200 rounded px-4 py-5 flex items-center justify-between">
                  <span className="text-xs italic text-blue-600">Used by:</span>
                  <span className="text-xs text-neutral-400">Tap to view verified posts</span>
                </div>

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
                      Payment Plan + Deposit
                    </p>
                    <p className="text-xl font-semibold text-black">$6,787.00</p>
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
                className="inline-flex items-center gap-1.5 rounded border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors shrink-0"
              >
                Book a Call
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5 text-neutral-500" aria-hidden="true">
                  <path fillRule="evenodd" d="M2 3a1 1 0 0 1 1-1h2.153a1 1 0 0 1 .986.836l.74 4.435a1 1 0 0 1-.54 1.06l-1.548.773a11.04 11.04 0 0 0 6.105 6.105l.774-1.548a1 1 0 0 1 1.059-.54l4.435.74a1 1 0 0 1 .836.986V13a1 1 0 0 1-1 1h-2C7.82 14 2 8.18 2 5V3Z" clipRule="evenodd" />
                </svg>
              </button>

            </div>
          </footer>
        </main>
      </div>

      <EoiModal open={eoiOpen} onOpenChange={setEoiOpen} />
    </div>
  );
}
