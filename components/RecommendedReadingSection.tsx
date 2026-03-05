import * as React from "react";

const READING_ITEMS = [
  {
    title: "Understanding Water",
    snippet:
      "The molecular structure, properties, and biological significance of water at a fundamental level.",
  },
  {
    title: "Molecular Hydrogen",
    snippet:
      "How H\u2082 functions as a selective antioxidant, its therapeutic applications and delivery mechanisms.",
  },
  {
    title: "Deuterium & Deuterium Depleted Water",
    snippet:
      "The role of heavy hydrogen isotopes in cellular function and the case for deuterium depletion.",
  },
  {
    title: "Understanding Biology",
    snippet:
      "Core biological principles \u2014 cellular mechanics, metabolic cycles, and systemic homeostasis.",
  },
  {
    title: "Understanding Electroculture",
    snippet:
      "Agricultural application of electromagnetic fields and electrolysis to stimulate plant growth.",
  },
  {
    title: "Understanding Psychology",
    snippet:
      "Mental models, cognitive frameworks, and the psychology of decision-making and belief.",
  },
  {
    title: "Understanding Money & Business",
    snippet:
      "First-principles thinking on capital, value creation, and the mechanics of economic systems.",
  },
  {
    title: "Understanding Geology",
    snippet:
      "Earth\u2019s mineral composition, water cycles, and geological processes that shape water chemistry.",
  },
  {
    title: "Understanding Electrochemistry",
    snippet:
      "Oxidation-reduction reactions, electrode potentials, and the science behind electrolysis.",
  },
  {
    title: "Understanding Energy",
    snippet:
      "Thermodynamics, bioenergetics, and the transfer of energy at molecular and systemic scales.",
  },
];

export default function RecommendedReadingSection() {
  return (
    <div className="flex border-t border-neutral-200">
      {/* Ghost sidebar — visual only, desktop only, non-interactive */}
      <div
        aria-hidden="true"
        className="hidden md:block w-48 shrink-0 border-r border-neutral-200 px-4 py-6 pointer-events-none select-none"
      >
        <nav>
          <ul className="space-y-3 text-base text-neutral-700">
            <li>Home</li>
            <li>Water Resources</li>
            <li>Tools &amp; Functions</li>
            <li>Products &amp; Services</li>
          </ul>
        </nav>
      </div>

      {/* Content area */}
      <div className="flex-1 px-8 py-10">
        {/* Heading */}
        <h2 className="text-2xl font-light text-black mb-8">
          Recommended{" "}
          <span className="font-editorial-ultralight-italic text-blue-600">Reading</span>
        </h2>

        {/* Reading items grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
          {READING_ITEMS.map((item) => (
            <div key={item.title} className="space-y-1.5">
              <p className="text-xs font-semibold text-neutral-800">{item.title}</p>
              <p className="text-xs text-neutral-500 leading-relaxed">{item.snippet}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
