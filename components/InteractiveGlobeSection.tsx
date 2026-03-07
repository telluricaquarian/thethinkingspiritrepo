"use client";

import { useState } from "react";
import { Component as Globe, ENAGIC_MARKERS, ENAGIC_CONNECTIONS } from "@/components/ui/interactive-globe";

type OfficeEntry = { city: string; markerIdx: number };
type OfficeGroup = { region: string; offices: OfficeEntry[]; coverage?: string[] };

const OFFICE_GROUPS: OfficeGroup[] = [
  {
    region: "Australia / Oceania",
    offices: [{ city: "Macquarie Park (Sydney), Australia", markerIdx: 0 }],
    coverage: ["Australia", "New Zealand", "Cook Islands", "Kiribati"],
  },
  {
    region: "United States",
    offices: [
      { city: "Torrance, California (Los Angeles HQ)", markerIdx: 1 },
      { city: "Mount Prospect, Illinois (Chicago)", markerIdx: 2 },
      { city: "Orlando, Florida", markerIdx: 3 },
      { city: "Astoria, New York", markerIdx: 4 },
      { city: "Lynnwood, Washington", markerIdx: 5 },
      { city: "Garland, Texas", markerIdx: 6 },
      { city: "Honolulu, Hawaii", markerIdx: 7 },
    ],
  },
  {
    region: "Canada",
    offices: [
      { city: "Mississauga, Ontario", markerIdx: 8 },
      { city: "Burnaby, British Columbia", markerIdx: 9 },
    ],
  },
  {
    region: "Mexico",
    offices: [{ city: "San Pedro Garza García, Nuevo León", markerIdx: 10 }],
  },
  {
    region: "Brazil",
    offices: [{ city: "Sorocaba, São Paulo", markerIdx: 11 }],
  },
  {
    region: "Europe",
    offices: [
      { city: "Paris, France", markerIdx: 12 },
      { city: "Düsseldorf, Germany", markerIdx: 13 },
      { city: "Rome, Italy", markerIdx: 14 },
      { city: "Porto, Portugal", markerIdx: 15 },
      { city: "Brașov, Romania", markerIdx: 16 },
      { city: "Moscow, Russia", markerIdx: 17 },
    ],
  },
  {
    region: "Japan",
    offices: [
      { city: "Naha, Okinawa (HQ)", markerIdx: 18 },
      { city: "Tokyo", markerIdx: 19 },
      { city: "Osaka", markerIdx: 20 },
      { city: "Sapporo", markerIdx: 21 },
      { city: "Fukuoka", markerIdx: 22 },
    ],
  },
  {
    region: "Asia",
    offices: [
      { city: "Tsim Sha Tsui, Kowloon (Hong Kong)", markerIdx: 23 },
      { city: "Bangalore, India", markerIdx: 24 },
      { city: "Jakarta, Indonesia", markerIdx: 25 },
      { city: "Seoul, South Korea", markerIdx: 26 },
      { city: "Kuala Lumpur, Malaysia", markerIdx: 27 },
      { city: "Singapore", markerIdx: 28 },
      { city: "Taipei, Taiwan", markerIdx: 29 },
      { city: "Bangkok, Thailand", markerIdx: 30 },
      { city: "Taguig City, Philippines", markerIdx: 31 },
      { city: "Ulaanbaatar, Mongolia", markerIdx: 32 },
    ],
  },
];

// Split groups into two sub-columns for the right panel
const LEFT_GROUPS = OFFICE_GROUPS.slice(0, 4);   // AU, US, Canada, Mexico
const RIGHT_GROUPS = OFFICE_GROUPS.slice(4);       // Brazil, Europe, Japan, Asia

export default function InteractiveGlobeSection() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <div className="border-t border-neutral-200 px-8 py-10">

      {/* Three-column editorial layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_500px_minmax(0,1fr)] gap-10 items-start">

        {/* ── Left: heading + supporting text ── */}
        <div className="space-y-4 lg:pt-6">
          <h2
            className="font-bold leading-tight text-black text-[clamp(1.75rem,3.5vw,48px)] tracking-[-0.03em]"
            style={{ fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif' }}
          >
            The company that engineers the product I recommend operates from offices around the{" "}
            <span className="font-editorial-ultralight-italic text-blue-600 block">World</span>
          </h2>

          <p className="text-xs text-neutral-500 leading-relaxed max-w-xs">
            Enagic maintains a substantial global footprint spanning Japan, North America, Europe,
            and the Asia-Pacific region. The globe and the lists shown here represent a portion of
            those locations — from the company&rsquo;s headquarters in Naha, Okinawa, through to
            regional offices and distribution points across more than thirty cities worldwide.
          </p>

          <p className="text-[10px] text-neutral-400 leading-relaxed max-w-xs">
            Hover or tap a marker on the globe to view office details. Click any listed city to
            highlight its location.
          </p>
        </div>

        {/* ── Center: globe ── */}
        <div className="flex justify-center">
          <Globe
            size={500}
            markers={ENAGIC_MARKERS}
            connections={ENAGIC_CONNECTIONS}
            activeMarkerIndex={activeIdx}
            onActiveMarkerChange={setActiveIdx}
          />
        </div>

        {/* ── Right: office lists in two sub-columns ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-5 lg:pt-6">
          {/* Sub-column A */}
          <div className="space-y-5">
            {LEFT_GROUPS.map((group) => (
              <OfficeGroupBlock
                key={group.region}
                group={group}
                activeIdx={activeIdx}
                onSelect={setActiveIdx}
              />
            ))}
          </div>
          {/* Sub-column B */}
          <div className="space-y-5">
            {RIGHT_GROUPS.map((group) => (
              <OfficeGroupBlock
                key={group.region}
                group={group}
                activeIdx={activeIdx}
                onSelect={setActiveIdx}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

function OfficeGroupBlock({
  group,
  activeIdx,
  onSelect,
}: {
  group: OfficeGroup;
  activeIdx: number | null;
  onSelect: (idx: number | null) => void;
}) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mb-1.5">
        {group.region}
      </p>
      <ul className="space-y-0.5">
        {group.offices.map((entry) => {
          const isActive = activeIdx === entry.markerIdx;
          return (
            <li key={entry.city}>
              <button
                type="button"
                onClick={() => onSelect(isActive ? null : entry.markerIdx)}
                className={[
                  "text-left text-[11px] leading-snug transition-colors w-full",
                  isActive
                    ? "text-blue-600 font-medium"
                    : "text-neutral-600 hover:text-black",
                ].join(" ")}
              >
                {entry.city}
              </button>
            </li>
          );
        })}
      </ul>
      {group.coverage && (
        <div className="mt-1.5">
          <p className="text-[10px] text-neutral-400 italic mb-0.5">Coverage often includes:</p>
          <ul className="space-y-0.5">
            {group.coverage.map((c) => (
              <li key={c} className="text-[10px] text-neutral-400 pl-2">
                — {c}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
