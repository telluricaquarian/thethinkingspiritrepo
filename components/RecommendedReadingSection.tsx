"use client";

import * as React from "react";

const READING_ITEMS: { title: string; paragraphs: string[]; literature: string[] }[] = [
  {
    title: "Understanding Water",
    paragraphs: [
      "Delve further than just the conventional understanding of water. Most understand water being the compound of two hydrogen atoms and one oxygen atom, there is another form of water that contains an abundance of hydrogen, appropriately termed \u201chydrogen-rich water\u201d, albeit you will also come to find and learn even more valuable notions on water beyond this however, to be germane to what is shared specifically on this page, we will be addressing precisely \u201celectrolytically reduced hydrogen-rich, deuterium depleted water\u201d.",
      "The method used to create such water is known as \u201celectrolysis\u201d, specifically \u201cwater electrolysis\u201d.",
    ],
    literature: [],
  },
  {
    title: "Molecular Hydrogen",
    paragraphs: [
      "Molecular Hydrogen, when saturated into water, can act as a powerful selective antioxidant, of which can prove to have substantial medicinal, therapeutic and preventative effects as evidenced by various credible authors that are writing about and sharing their insights in this burgeoning field of molecular hydrogen medicine.",
      "A method used to create and or imbue water with hydrogen is \u201celectrolysis\u201d, specifically \u201cwater electrolysis\u201d.",
    ],
    literature: [],
  },
  {
    title: "Deuterium & Deuterium Depleted Water",
    paragraphs: [
      "Deuterium is an isotope of hydrogen, that simply has an additional neutron in combination to hydrogens one proton and one electron.",
      "An isotope is simply a distinct form of an atom with the only nuance being the amount of neutrons, in the case of deuterium it is one additional neutron added to what would otherwise be hydrogen.",
      "This can see us into the notion of deuterium-depleted water. Since water naturally contains deuterium \u2014 measurable in ppm or per ml (%) relative to international standards \u2014 Dr. Abdullah Olgun\u2019s 2007 work proposed a specific mechanism by which deuterium interferes with ATP synthase, the molecular motor responsible for cellular energy production, stochastically disrupting its rotation and thereby reducing ATP output.",
      "A method to deplete or isotopically separate deuterium from water is, you guessed it, electrolysis.",
    ],
    literature: [],
  },
  {
    title: "Understanding Biology",
    paragraphs: [
      "\u201cwater in biology is not like water in the glass\u201d",
      "\u2014 Gerald H. Pollack",
      "If you could understand the weight of this quote alone, you will change your entire life forever indefinitely, albeit you will also see how this ties into water, hence the reason why I am including literature on water, that is, biology literature or recommend reads that expand on specifically the above quote.",
    ],
    literature: [],
  },
  {
    title: "Understanding Electrohorticulture",
    paragraphs: [
      "Horticulture is garden management, so we can see that the term \u201celectrohorticulture\u201d simply is garden management involving electricity to enhance or aid with garden management.",
      "Now this may come as a surprise, however if you\u2019re on this page and especially if you\u2019ve read this far, it may instead just be another exciting thing to learn, that \u201cElectrolysis water\u201d can be used to increase the speed of plant growth. There is much evidence of this being the case alongside there also being a book on deuterium in which I read and was met with a pleasant section of the text that show plants watered with substantially lowered deuterium content grew significantly faster and larger.",
    ],
    literature: [],
  },
  {
    title: "Understanding Psychology",
    paragraphs: [
      "We all use heuristics/mental shortcuts, have biases, prejudices, preconceived notions and filters or lenses in which we perceive the world through, that can either make it clearer or blur our vision.",
      "It may be somewhat convincing or persuading to address those so this is where some this material fits in the picture.",
    ],
    literature: [],
  },
  {
    title: "Understanding Money & Business",
    paragraphs: [
      "Evidently this is a landing page of sorts, it definitely functions as one, in a especially niche and left field manner, thus it would be relevant to address not only the company in which the specific product, that is the water electrolyzer device is sourced from but to also go even deeper into our understanding of business and money.",
    ],
    literature: [],
  },
  {
    title: "Understanding Geology",
    paragraphs: [
      "There is certain phenomena in nature in which our learning and comprehension of will aid in gaining even further grasp on the realities and deeper truths that exist surrounding water.",
    ],
    literature: [],
  },
  {
    title: "Understanding Electrochemistry",
    paragraphs: [
      "The quote by James Maxwell Maltz indicated further above the fold of this page really gets to the crux as to the significance of electrolysis and thus the value in well and truly understanding it.",
    ],
    literature: [],
  },
  {
    title: "Understanding Energy",
    paragraphs: ["CLASSIFIED"],
    literature: [],
  },
];

export default function RecommendedReadingSection() {
  const [openTitle, setOpenTitle] = React.useState<string | null>(null);

  const toggle = (title: string) => {
    setOpenTitle((prev) => (prev === title ? null : title));
  };

  return (
    <div className="border-t border-neutral-200 px-8 py-10">
      {/* Heading */}
      <h2
        className="font-bold leading-none text-black mb-10 text-[clamp(3rem,7vw,88px)] tracking-[-0.05em]"
        style={{ fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif' }}
      >
        Recommended{" "}
        <span className="font-editorial-ultralight-italic text-blue-600">Reading</span>
      </h2>

      {/* Reading items grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
        {READING_ITEMS.map((item) => {
          const isOpen = openTitle === item.title;
          return (
            <div key={item.title} className="space-y-2">
              <p className="text-xs font-semibold text-neutral-800">{item.title}</p>
              {item.paragraphs.map((para, i) => (
                <p key={i} className="text-xs text-neutral-500 leading-relaxed">
                  {para}
                </p>
              ))}

              {/* Literature toggle */}
              <button
                type="button"
                onClick={() => toggle(item.title)}
                className="mt-1 flex items-center gap-1 text-[10px] text-neutral-400 hover:text-neutral-700 transition-colors"
              >
                <span>{isOpen ? "▲" : "▼"}</span>
                <span>Literature List</span>
              </button>

              {/* Literature panel */}
              {isOpen && (
                <div className="pt-1 border-t border-neutral-100">
                  {item.literature.length > 0 ? (
                    <ul className="space-y-1">
                      {item.literature.map((entry, i) => (
                        <li key={i} className="text-[10px] text-neutral-500 leading-relaxed">
                          {entry}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[10px] text-neutral-400 italic">Literature list forthcoming.</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
