import ElectrolysisDiagram from "./ElectrolysisDiagram";

export default function ElectrolysisSection() {
  return (
    <div className="border-t border-neutral-200 px-8 py-10">
      {/* Heading */}
      <h2
        className="font-bold leading-tight text-black mb-4 text-[clamp(1.5rem,3vw,40px)] tracking-[-0.03em]"
        style={{ fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif' }}
      >
        How the Leveluk K8 Produces{" "}
        <span className="font-editorial-ultralight-italic text-blue-600">Hydrogen-Rich Water</span>
      </h2>

      <p className="text-xs text-neutral-500 leading-relaxed max-w-2xl mb-10">
        Electrolysis is the process of passing an electrical current through water to separate and
        reorganize its molecular components. Inside the Leveluk K8, eight platinum-coated titanium
        plates create alternating electrical fields that separate alkaline and acidic streams while
        generating dissolved molecular hydrogen near the cathode surfaces.
      </p>

      <div className="flex justify-center">
        <ElectrolysisDiagram />
      </div>
    </div>
  );
}
