import ElectrolysisDiagram from "./ElectrolysisDiagram";

export default function ElectrolysisSection() {
  return (
    <div className="border-t border-neutral-200 px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-10 lg:gap-16 items-start">

        {/* Left: text block */}
        <div className="space-y-5 lg:pt-3">
          <h2
            className="font-bold leading-tight text-black text-[clamp(1.5rem,3vw,40px)] tracking-[-0.03em]"
            style={{ fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif' }}
          >
            How the Leveluk K8 Produces{" "}
            <span className="font-editorial-ultralight-italic text-blue-600">Hydrogen-Rich Water</span>
          </h2>

          <p className="text-xs text-neutral-500 leading-relaxed max-w-xs">
            Electrolysis is the process of passing an electrical current through water to separate and
            reorganize its molecular components. Inside the Leveluk K8, eight platinum-coated titanium
            plates create alternating electrical fields that separate alkaline and acidic streams while
            generating dissolved molecular hydrogen near the cathode surfaces.
          </p>
        </div>

        {/* Right: schematic */}
        <div className="w-full">
          <ElectrolysisDiagram />
        </div>

      </div>
    </div>
  );
}
