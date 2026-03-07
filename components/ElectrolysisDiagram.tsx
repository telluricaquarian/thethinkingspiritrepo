"use client";

const NEON   = "#22ff7a";
const BLUE   = "#38bdf8";
const ALK    = "#4ade80";
const ACD    = "#f87171";
const H2C    = "#80ffea";
const TEXT   = "#d4d4d4";
const DIM    = "#6b7280";

// 8 plate left-edge x positions (spaced 73px apart inside the chamber)
const PXS = [112, 185, 258, 331, 404, 477, 550, 623];
const PW  = 16;   // plate width
const PY  = 146;  // plate top y
const PH  = 154;  // plate height → bottom at 300

// Membrane midpoints between adjacent plates
const MEMS = PXS.slice(0, -1).map((x, i) => Math.round(x + PW + (PXS[i + 1] - x - PW) / 2));
// ≈ [155, 228, 301, 374, 447, 520, 593]

// Chamber geometry
const CX = 62, CY = 116, CW = 676, CH = 216; // bottom y = 332

export default function ElectrolysisDiagram() {
  const flowY = CY + CH / 2; // 224 — mid-chamber water flow line

  return (
    <svg
      viewBox="0 0 800 480"
      className="w-full max-w-3xl"
      aria-label="Leveluk K8 electrolysis chamber schematic"
    >
      <defs>
        <style>{`
          @keyframes eDash     { to { stroke-dashoffset: -24; } }
          @keyframes eDashDown { to { stroke-dashoffset: -20; } }
          @keyframes ePlate    { 0%,100%{opacity:.65} 50%{opacity:1} }
          .efl  { stroke-dasharray:10 6; animation:eDash 1.4s linear infinite; }
          .eflv { stroke-dasharray:10 6; animation:eDashDown 1.4s linear infinite; }
          .epc  { animation:ePlate 2.1s ease-in-out infinite; }
          .epa  { animation:ePlate 2.1s ease-in-out infinite 1.05s; }
        `}</style>

        {/* Arrow markers */}
        <marker id="eaw" markerWidth="7" markerHeight="6" refX="6" refY="3" orient="auto">
          <path d="M0,.6 L6,3 L0,5.4" fill="none" stroke="white" strokeWidth="1.3"/>
        </marker>
        <marker id="eab" markerWidth="7" markerHeight="6" refX="6" refY="3" orient="auto">
          <path d="M0,.6 L6,3 L0,5.4" fill="none" stroke={BLUE} strokeWidth="1.3"/>
        </marker>
        <marker id="eag" markerWidth="7" markerHeight="6" refX="6" refY="3" orient="auto">
          <path d="M0,.6 L6,3 L0,5.4" fill="none" stroke={ALK} strokeWidth="1.3"/>
        </marker>
        <marker id="ear" markerWidth="7" markerHeight="6" refX="6" refY="3" orient="auto">
          <path d="M0,.6 L6,3 L0,5.4" fill="none" stroke={ACD} strokeWidth="1.3"/>
        </marker>
      </defs>

      {/* ── Background ── */}
      <rect width="800" height="480" fill="#0a0a0a" rx="10"/>

      {/* ── WATER INLET ── */}
      <rect x="384" y="8" width="32" height="46" fill="none" stroke={NEON} strokeWidth="1.5" rx="3"/>
      <line x1="400" y1="13" x2="400" y2="47" stroke={BLUE} strokeWidth="1.5" className="eflv" markerEnd="url(#eab)"/>
      {/* label */}
      <line x1="418" y1="30" x2="450" y2="30" stroke={DIM} strokeWidth=".7"/>
      <text x="454" y="33" fill={TEXT} fontSize="8.5" fontFamily="'Courier New',monospace" letterSpacing=".5">WATER INLET</text>
      {/* connector to enhancer */}
      <line x1="400" y1="54" x2="400" y2="58" stroke={NEON} strokeWidth="1.5"/>

      {/* ── MINERAL ENHANCER CARTRIDGE ── */}
      <rect x="296" y="58" width="208" height="36" fill="#06100a" stroke={NEON} strokeWidth="1.5" rx="5"/>
      {Array.from({ length: 11 }, (_, i) => (
        <circle key={i} cx={313 + i * 17} cy="76" r="3" fill={NEON} opacity={i % 2 === 0 ? 0.55 : 0.28}/>
      ))}
      {/* label below box */}
      <text x="400" y="109" fill={NEON} fontSize="8" fontFamily="'Courier New',monospace" textAnchor="middle" letterSpacing=".5">MINERAL ENHANCER CARTRIDGE</text>
      {/* connector to chamber */}
      <line x1="400" y1="94" x2="400" y2="115" stroke={NEON} strokeWidth="1.5" markerEnd="url(#eaw)"/>

      {/* ── "8 TITANIUM PLATES" label above chamber ── */}
      <text x="64" y="113" fill={DIM} fontSize="7.5" fontFamily="'Courier New',monospace" letterSpacing=".4">
        8 PLATINUM-COATED TITANIUM PLATES
      </text>

      {/* ── ELECTROLYSIS CHAMBER BORDER ── */}
      <rect x={CX} y={CY} width={CW} height={CH} fill="#030809" stroke={NEON} strokeWidth="2" rx="6"/>
      <text x="400" y="131" fill={NEON} fontSize="8" fontFamily="'Courier New',monospace" textAnchor="middle" letterSpacing="1.5" opacity=".65">
        ELECTROLYSIS CHAMBER
      </text>

      {/* ── 8 PLATES (alternating cathode C / anode A) ── */}
      {PXS.map((x, i) => {
        const isCathode = i % 2 === 0;
        return (
          <g key={i}>
            <rect
              x={x} y={PY} width={PW} height={PH}
              fill={isCathode ? "#001e0a" : "#190000"}
              stroke={isCathode ? NEON : ACD}
              strokeWidth="1.5" rx="2"
              className={isCathode ? "epc" : "epa"}
            />
            {/* C / A label inside plate top */}
            <text
              x={x + PW / 2} y={PY + 14}
              fill={isCathode ? NEON : ACD}
              fontSize="8" fontFamily="'Courier New',monospace" textAnchor="middle"
            >
              {isCathode ? "C" : "A"}
            </text>
          </g>
        );
      })}

      {/* ── MEMBRANE SEPARATORS (dashed lines between each plate pair) ── */}
      {MEMS.map((mx, i) => (
        <line key={i}
          x1={mx} y1={PY + 14} x2={mx} y2={PY + PH - 14}
          stroke="#3a3a3a" strokeWidth="1" strokeDasharray="4 3"
        />
      ))}

      {/* ── WATER FLOW LINE through chamber ── */}
      <line
        x1={CX + 12} y1={flowY} x2={CX + CW - 12} y2={flowY}
        stroke={BLUE} strokeWidth="1" className="efl" markerEnd="url(#eab)" opacity=".5"
      />

      {/* ── HYDROGEN GENERATION label ── */}
      <text x="400" y="153" fill={H2C} fontSize="7.5" fontFamily="'Courier New',monospace" textAnchor="middle" letterSpacing="1" opacity=".9">
        ↑  HYDROGEN GENERATION  ↑
      </text>

      {/* ── H₂ BUBBLES (near cathode plates: i=0,2,4,6 → x=112,258,404,550) ── */}
      {[112, 258, 404, 550].flatMap((px, pi) =>
        [0, 1, 2].map(j => {
          const dur  = (1.8 + j * 0.28).toFixed(2);
          const beg  = (j * 0.55 + pi * 0.22).toFixed(2);
          return (
            <circle key={`b${pi}-${j}`}
              cx={px + PW / 2 + (j - 1) * 8}
              cy={PY + PH - 16}
              r="2.5"
              fill={H2C}
              opacity="0"
            >
              <animate attributeName="cy"      values={`${PY + PH - 16};${PY + 24}`} dur={`${dur}s`} begin={`${beg}s`} repeatCount="indefinite"/>
              <animate attributeName="opacity" values=".85;0"                          dur={`${dur}s`} begin={`${beg}s`} repeatCount="indefinite"/>
              <animate attributeName="r"       values="2.5;1"                          dur={`${dur}s`} begin={`${beg}s`} repeatCount="indefinite"/>
            </circle>
          );
        })
      )}

      {/* ── ALKALINE CHANNEL tint (left side of chamber) ── */}
      <rect x={CX + 1} y={CY + 1} width="28" height={CH - 2} fill={ALK} opacity=".04" rx="4"/>

      {/* ── ACIDIC CHANNEL tint (right side of chamber) ── */}
      <rect x={CX + CW - 29} y={CY + 1} width="28" height={CH - 2} fill={ACD} opacity=".04" rx="4"/>

      {/* ── ALKALINE WATER OUTLET ── */}
      <path
        d={`M 94 ${CY + CH} L 94 368 L 164 368 L 164 420`}
        fill="none" stroke={ALK} strokeWidth="1.8" className="efl" markerEnd="url(#eag)"
      />
      <text x="70" y="393" fill={ALK} fontSize="8.5" fontFamily="'Courier New',monospace" letterSpacing=".3">ALKALINE WATER</text>
      <text x="70" y="406" fill={ALK} fontSize="8.5" fontFamily="'Courier New',monospace" letterSpacing=".3">OUTPUT  (pH 8–11)</text>

      {/* ── ACIDIC WATER OUTLET ── */}
      <path
        d={`M 704 ${CY + CH} L 704 368 L 634 368 L 634 420`}
        fill="none" stroke={ACD} strokeWidth="1.8" className="efl" markerEnd="url(#ear)"
      />
      <text x="573" y="393" fill={ACD} fontSize="8.5" fontFamily="'Courier New',monospace" letterSpacing=".3">ACIDIC WATER</text>
      <text x="573" y="406" fill={ACD} fontSize="8.5" fontFamily="'Courier New',monospace" letterSpacing=".3">OUTPUT  (pH 3–6)</text>

      {/* ── LEGEND ── */}
      <line x1="62" y1="444" x2="738" y2="444" stroke={DIM} strokeWidth=".5" opacity=".3"/>

      <rect x="62"  y="450" width="9" height="9" fill="#001e0a" stroke={NEON} strokeWidth="1" rx="1"/>
      <text x="76"  y="458" fill={DIM} fontSize="7.5" fontFamily="'Courier New',monospace">CATHODE (C)</text>

      <rect x="163" y="450" width="9" height="9" fill="#190000" stroke={ACD} strokeWidth="1" rx="1"/>
      <text x="177" y="458" fill={DIM} fontSize="7.5" fontFamily="'Courier New',monospace">ANODE (A)</text>

      <line x1="255" y1="454" x2="275" y2="454" stroke="#3a3a3a" strokeWidth="1" strokeDasharray="4 3"/>
      <text x="279" y="458" fill={DIM} fontSize="7.5" fontFamily="'Courier New',monospace">MEMBRANE SEP.</text>

      <circle cx="374" cy="454" r="3" fill={H2C} opacity=".7"/>
      <text x="382" y="458" fill={DIM} fontSize="7.5" fontFamily="'Courier New',monospace">H₂ BUBBLE</text>

      <line x1="450" y1="450" x2="470" y2="450" stroke={BLUE} strokeWidth="1" strokeDasharray="4 3"/>
      <text x="474" y="458" fill={DIM} fontSize="7.5" fontFamily="'Courier New',monospace">WATER FLOW</text>

      <line x1="548" y1="450" x2="568" y2="450" stroke={ALK} strokeWidth="1.5"/>
      <text x="572" y="458" fill={DIM} fontSize="7.5" fontFamily="'Courier New',monospace">ALKALINE</text>

      <line x1="627" y1="450" x2="647" y2="450" stroke={ACD} strokeWidth="1.5"/>
      <text x="651" y="458" fill={DIM} fontSize="7.5" fontFamily="'Courier New',monospace">ACIDIC</text>
    </svg>
  );
}
