"use client";

import * as React from "react";
import Image from "next/image";
import { UsedByMarquee } from "./ui/used-by-marquee";
import type { UsedByItem } from "./ui/used-by-marquee";
import EoiModal from "./ui/eoi-modal";

const K8_USED_BY: UsedByItem[] = [
  {
    name: "Bryson DeChambeau",
    handle: "@brysondechambeau",
    role: "Professional Golfer",
    avatarSrc: "/images/bryson.jpeg",
    verified: true,
  },
  {
    name: "Wardell Stephen Curry II",
    handle: "@stephencurry30",
    role: "Olympic Gold Medalist",
    avatarSrc: "/images/stephencurry.jpeg",
    verified: true,
  },
  {
    name: "Jhene Aiko Efuru Chilombo",
    handle: "@jheneaiko",
    role: "Musician",
    avatarSrc: "/images/jheneaiko.jpg",
    verified: true,
  },
  {
    name: "Diplo",
    handle: "@diplo",
    role: "DJ / Producer",
    avatarSrc: "/images/diplo.jpeg",
    verified: true,
  },
];

const K8_SPECS = [
  "8 platinum-coated titanium plates for high ORP stability",
  "Electrolyzed, hydrogen-rich water (et al. 2025)",
  "Supports cellular hydration & metabolic efficiency",
  "Reduced deuterium concentration vs. standard water",
  "Designed for long-term daily use & durability",
];

const EXPLAINER_COLS = [
  {
    heading: "ORP Stability",
    body: "8 platinum-coated titanium plates for high ORP stability",
  },
  {
    heading: "Hydrogen-Rich",
    body: "Electrolyzed, hydrogen-rich water (et al. 2025)",
  },
  {
    heading: "Cellular Hydration",
    body: "Supports cellular hydration & metabolic efficiency",
  },
  {
    heading: "Deuterium Control",
    body: "Reduced deuterium concentration vs. standard water",
  },
];

export default function DesktopHome() {
  const [eoiOpen, setEoiOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="flex min-h-screen">

        {/* ── Sidebar ── */}
        <aside className="w-60 shrink-0 border-r border-neutral-200 p-6 sticky top-0 h-screen">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/blacktts.png" alt="TTS" className="mb-8 h-6 w-auto" />
          <nav>
            <ul className="space-y-3 text-sm text-neutral-700">
              <li>Home</li>
              <li>Water Resources</li>
              <li>Tools &amp; Functions</li>
              <li>Products &amp; Services</li>
            </ul>
          </nav>
        </aside>

        {/* ── Main scroll area ── */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[980px] mx-auto pt-20 px-10 pb-24 space-y-16">

            {/* ── A: Top pill ── */}
            <div className="flex justify-center">
              <span className="rounded-full bg-blue-600 px-4 py-1.5 text-xs text-white shadow-sm">
                Dive into a whole new understanding of water
              </span>
            </div>

            {/* ── B: Headline row ── */}
            <div className="flex items-center gap-6">
              <h1 className="text-3xl font-light whitespace-nowrap">
                Change your life by education and information alone.
              </h1>
              <div className="flex-1 border-t border-gray-300" />
            </div>

            {/* ── C: Maxwell quote ── */}
            <div className="max-w-[760px] space-y-1">
              <p className="text-sm italic text-gray-400">
                Of all electrical phenomena electrolysis appears the most likely to furnish us with a real insight into the true nature of the electric current. because we find currents of ordinary matter and current of electricity forming essential parts of the same phenomenon.
              </p>
              <p className="text-xs text-gray-400">— James Clerk Maxwell</p>
              <p className="text-xs italic text-gray-400">A Treatise on Electricity and Magnetism</p>
              <p className="text-xs italic text-gray-400">Vol. 1, Oxford, 1873</p>
            </div>

            {/* ── D: Multi-column explainer row ── */}
            <div className="grid grid-cols-4 gap-6 border-t border-gray-200 pt-8">
              {EXPLAINER_COLS.map((col) => (
                <div key={col.heading} className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    {col.heading}
                  </p>
                  <p className="text-sm text-neutral-600 leading-snug">{col.body}</p>
                </div>
              ))}
            </div>

            {/* ── E: K8 product card ── */}
            <div className="border border-neutral-200 rounded-2xl overflow-hidden">

              {/* Top: image left + details right */}
              <div className="grid grid-cols-2">
                <div className="relative min-h-[340px] bg-neutral-50">
                  <Image
                    src="/images/newaqua.png"
                    alt="Leveluk K8 Water Ionizer"
                    fill
                    className="object-contain p-6"
                    unoptimized
                  />
                </div>

                <div className="p-8 space-y-5 border-l border-neutral-200">
                  <p className="text-xs text-neutral-400 leading-snug">
                    Electrochemical Medical Grade Device engineered by Enagic®
                  </p>
                  <h2 className="text-2xl font-semibold">Leveluk K8 Water Ionizer</h2>
                  <ul className="space-y-2">
                    {K8_SPECS.map((spec) => (
                      <li key={spec} className="flex items-start gap-2 text-sm text-neutral-600">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-2">
                    <span className="inline-block rounded-full border border-neutral-300 px-3 py-1 text-xs text-neutral-500">
                      Enagic® Quality Assured
                    </span>
                  </div>
                </div>
              </div>

              {/* Used by bar */}
              <div className="border-t border-neutral-200 bg-black px-4 py-3">
                <UsedByMarquee items={K8_USED_BY} duration={28} />
              </div>

              {/* Pricing row */}
              <div className="grid grid-cols-3 divide-x divide-neutral-200 border-t border-neutral-200">
                <div className="p-6">
                  <p className="text-xs text-neutral-400 mb-1">AUD</p>
                  <p className="text-3xl font-semibold">$6,787</p>
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <p className="text-sm text-neutral-500">Payment options available</p>
                  <p className="text-sm text-neutral-500">From ~$252/mo (E-Payment or finance)</p>
                </div>
                <div className="p-6 flex flex-col justify-center gap-3">
                  <button className="w-full rounded-full bg-black text-white text-sm py-2.5 px-4 hover:bg-neutral-800 transition-colors">
                    Contact for Procurement
                  </button>
                  <button
                    onClick={() => setEoiOpen(true)}
                    className="w-full rounded-full border border-neutral-300 text-sm py-2.5 px-4 hover:bg-neutral-50 transition-colors"
                  >
                    Inquire
                  </button>
                </div>
              </div>

              {/* Patents / certs row */}
              <div className="border-t border-neutral-200 px-6 py-3 flex items-center gap-6 text-xs text-neutral-400">
                <span>Enagic® Certified</span>
                <span>·</span>
                <span>Medical Grade Device</span>
                <span>·</span>
                <span>Electrolysis Technology</span>
                <span>·</span>
                <span>Designed for long-term daily use &amp; durability</span>
              </div>
            </div>

          </div>

          {/* ── Footer ── */}
          <footer className="border-t border-neutral-200 px-10 py-6">
            <div className="max-w-[980px] mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/blacktts.png" alt="TTS" className="h-5 w-auto" />
                <p className="text-xs text-neutral-400">
                  Building and designing anew. {new Date().getFullYear()}©
                </p>
              </div>
              <div className="relative h-7 w-7">
                <Image
                  src="/images/telluricaquarian.png"
                  alt="Telluric Aquarian"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </footer>
        </main>
      </div>

      <EoiModal open={eoiOpen} onOpenChange={setEoiOpen} />
    </div>
  );
}
