"use client";

// ── White-background palette ─────────────────────────────────────────────────
const STRUCT = "#1a1a1a";   // charcoal — chamber outline, pipes, engineering lines
const FLOW   = "#38bdf8";   // sky blue — water flow arrows (lighter than cathode blue)
const CATH   = "#1d4ed8";   // dark indigo-blue — cathode plates
const ALK    = "#15803d";   // forest green — alkaline / drinking-water path
const ACD    = "#b91c1c";   // dark red — acidic path + anode accent
const H2C    = "#0891b2";   // steel blue — hydrogen generation callout + bubbles
const TEXT   = "#111827";   // near-black — primary labels
const DIM    = "#6b7280";   // medium gray — secondary labels, leader lines

// 8 plates, 70 px center-to-center spacing
const PXS  = [120, 190, 260, 330, 400, 470, 540, 610];
const PW   = 16;
const PY   = 104;  // plate top y
const PH   = 240;  // plate height → bottom at 344

// Membrane midpoints ≈ [163, 233, 303, 373, 443, 513, 583]
const MEMS = PXS.slice(0, -1).map((x, i) =>
  Math.round(x + PW + (PXS[i + 1] - x - PW) / 2)
);

// Chamber geometry: right = 660, bottom = 370
const CX = 100, CY = 70, CW = 560, CH = 300;

export default function ElectrolysisDiagram() {
  return (
    <svg
      viewBox="0 0 800 648"
      className="w-full"
      aria-label="Leveluk K8 electrolysis chamber schematic"
    >
      <defs>
        <style>{`
          @keyframes eDash  { to { stroke-dashoffset: -24; } }
          @keyframes ePlate { 0%,100%{opacity:.65} 50%{opacity:1} }
          .efl { stroke-dasharray:10 6; animation:eDash 1.4s linear infinite; }
          .epc { animation:ePlate 2.1s ease-in-out infinite; }
          .epa { animation:ePlate 2.1s ease-in-out infinite 1.05s; }
        `}</style>

        <marker id="eaw" markerWidth="7" markerHeight="6" refX="6" refY="3" orient="auto">
          <path d="M0,.6 L6,3 L0,5.4" fill="none" stroke={STRUCT} strokeWidth="1.3"/>
        </marker>
        <marker id="eab" markerWidth="7" markerHeight="6" refX="6" refY="3" orient="auto">
          <path d="M0,.6 L6,3 L0,5.4" fill="none" stroke={FLOW}   strokeWidth="1.3"/>
        </marker>
        <marker id="eag" markerWidth="7" markerHeight="6" refX="6" refY="3" orient="auto">
          <path d="M0,.6 L6,3 L0,5.4" fill="none" stroke={ALK}    strokeWidth="1.3"/>
        </marker>
        <marker id="ear" markerWidth="7" markerHeight="6" refX="6" refY="3" orient="auto">
          <path d="M0,.6 L6,3 L0,5.4" fill="none" stroke={ACD}    strokeWidth="1.3"/>
        </marker>
      </defs>

      {/* No background rect — diagram renders on page's white background */}

      {/* ═══════════════════════════════════════════════
          ALKALINE DRINKING WATER OUTPUT — exits TOP-LEFT
          ═══════════════════════════════════════════════ */}
      <path
        d={`M 128 ${CY} L 128 40 L 520 40`}
        fill="none" stroke={ALK} strokeWidth="1.8"
        className="efl" markerEnd="url(#eag)"
      />
      <text x="128" y="26" fill={ALK} fontSize="8.5"
        fontFamily="'Courier New',monospace" letterSpacing=".3">
        ALKALINE DRINKING WATER OUTPUT  (pH 8–11)
      </text>

      {/* ═══════════════════════════════════════════════
          ELECTROLYSIS CHAMBER
          ═══════════════════════════════════════════════ */}
      <rect x={CX} y={CY} width={CW} height={CH}
        fill="#fafafa" stroke={STRUCT} strokeWidth="1.5" rx="6"/>
      <text x={CX + CW / 2} y="88" fill="#374151" fontSize="8"
        fontFamily="'Courier New',monospace" textAnchor="middle"
        letterSpacing="1.5" opacity=".7">
        ELECTROLYSIS CHAMBER
      </text>
      <text x={CX + CW - 2} y="88" fill={DIM} fontSize="7.5"
        fontFamily="'Courier New',monospace" textAnchor="end" letterSpacing=".4">
        8 PLATINUM-COATED Ti PLATES
      </text>

      {/* ═══════════════════════════════════════════════
          8 PLATES  —  sequence: C A C A C A C A
          ═══════════════════════════════════════════════ */}
      {PXS.map((x, i) => {
        const isCathode = i % 2 === 0;
        return (
          <g key={i}>
            <rect
              x={x} y={PY} width={PW} height={PH}
              fill={isCathode ? "#dcfce7" : "#fee2e2"}
              stroke={isCathode ? ALK : ACD}
              strokeWidth="1.5" rx="2"
              className={isCathode ? "epc" : "epa"}
            />
            {/* polarity letter C / A */}
            <text x={x + PW / 2} y={PY + 14}
              fill={isCathode ? ALK : ACD}
              fontSize="8" fontFamily="'Courier New',monospace" textAnchor="middle">
              {isCathode ? "C" : "A"}
            </text>
            {/* sign − / + */}
            <text x={x + PW / 2} y={PY + 25}
              fill={isCathode ? ALK : ACD}
              fontSize="7" fontFamily="'Courier New',monospace" textAnchor="middle" opacity=".7">
              {isCathode ? "−" : "+"}
            </text>
          </g>
        );
      })}

      {/* ═══════════════════════════════════════════════
          ION EXCHANGE MEMBRANES (dashed separators)
          ═══════════════════════════════════════════════ */}
      {MEMS.map((mx, i) => (
        <line key={i}
          x1={mx} y1={PY + 14} x2={mx} y2={PY + PH - 14}
          stroke="#9ca3af" strokeWidth="1" strokeDasharray="4 3"
        />
      ))}
      {/* IEM annotation — leader exits bottom of centre membrane, clears chamber wall */}
      <path
        d={`M ${MEMS[3]} ${PY + PH - 14} L ${MEMS[3]} 382 L ${MEMS[3] + 14} 388`}
        fill="none" stroke={DIM} strokeWidth=".7"
      />
      <text x={MEMS[3] + 18} y="391" fill={DIM} fontSize="7"
        fontFamily="'Courier New',monospace" letterSpacing=".3">
        ION EXCHANGE MEMBRANE
      </text>

      {/* ═══════════════════════════════════════════════
          WATER FLOW LINES inside chamber
          ═══════════════════════════════════════════════ */}
      {/* Horizontal bulk flow across all plates */}
      <line
        x1={CX + 14} y1={240} x2={CX + CW - 14} y2={240}
        stroke={FLOW} strokeWidth="1" className="efl"
        markerEnd="url(#eab)" opacity=".6"
      />
      {/* Vertical upward flow on alkaline (cathode) side */}
      <line
        x1="117" y1="340" x2="117" y2={CY + 8}
        stroke={ALK} strokeWidth="1" className="efl"
        markerEnd="url(#eag)" opacity=".65"
      />

      {/* ═══════════════════════════════════════════════
          HYDROGEN GENERATION callout + H₂ BUBBLES
          ═══════════════════════════════════════════════ */}
      <text x={CX + CW / 2} y="172" fill={H2C} fontSize="7.5"
        fontFamily="'Courier New',monospace" textAnchor="middle"
        letterSpacing="1" opacity=".95">
        ↑  HYDROGEN GENERATION  ↑
      </text>

      {/* Cathode plates i=0,2,4,6 → x=120, 260, 400, 540 */}
      {[120, 260, 400, 540].flatMap((px, pi) =>
        [0, 1, 2].map(j => {
          const dur = (1.8 + j * 0.28).toFixed(2);
          const beg = (j * 0.55 + pi * 0.22).toFixed(2);
          return (
            <circle key={`b${pi}-${j}`}
              cx={px + PW / 2 + (j - 1) * 8}
              cy={PY + PH - 16}
              r="2.5" fill={H2C} opacity="0"
            >
              <animate attributeName="cy"
                values={`${PY + PH - 16};${PY + 28}`}
                dur={`${dur}s`} begin={`${beg}s`} repeatCount="indefinite"/>
              <animate attributeName="opacity"
                values=".75;0"
                dur={`${dur}s`} begin={`${beg}s`} repeatCount="indefinite"/>
              <animate attributeName="r"
                values="2.5;1"
                dur={`${dur}s`} begin={`${beg}s`} repeatCount="indefinite"/>
            </circle>
          );
        })
      )}

      {/* Channel tints */}
      <rect x={CX + 1}       y={CY + 1} width="18" height={CH - 2} fill={ALK} opacity=".07" rx="4"/>
      <rect x={CX + CW - 19} y={CY + 1} width="18" height={CH - 2} fill={ACD} opacity=".06" rx="4"/>

      {/* ═══════════════════════════════════════════════
          DC POWER INPUT — cable entering left chamber wall
          ═══════════════════════════════════════════════ */}
      <text x="14" y="206" fill={TEXT} fontSize="8.5"
        fontFamily="'Courier New',monospace" letterSpacing=".4">
        DC POWER INPUT
      </text>
      {/* cable body */}
      <line x1="20" y1="216" x2="98" y2="216" stroke={STRUCT} strokeWidth="2"/>
      {/* plug head */}
      <rect x="10" y="210" width="12" height="14"
        fill="none" stroke={STRUCT} strokeWidth="1.5" rx="2"/>
      <line x1="14" y1="208" x2="14" y2="211" stroke={STRUCT} strokeWidth="1.5"/>
      <line x1="18" y1="208" x2="18" y2="211" stroke={STRUCT} strokeWidth="1.5"/>
      {/* terminal dot on chamber wall */}
      <circle cx="100" cy="216" r="3.5" fill={STRUCT} opacity=".8"/>
      {/* internal dashed bus to plate zone */}
      <line x1="102" y1="216" x2="118" y2="216"
        stroke={STRUCT} strokeWidth=".8" strokeDasharray="3 3" opacity=".35"/>

      {/* ═══════════════════════════════════════════════
          MINERAL ENHANCER — in flow path above inlet
          ═══════════════════════════════════════════════ */}
      <rect x="82" y="406" width="136" height="36"
        fill="#f0fdf4" stroke={STRUCT} strokeWidth="1.5" rx="5"/>
      {Array.from({ length: 8 }, (_, i) => (
        <circle key={i} cx={96 + i * 16} cy="424" r="3"
          fill={STRUCT} opacity={i % 2 === 0 ? 0.4 : 0.18}/>
      ))}
      <text x="150" y="458" fill={TEXT} fontSize="8"
        fontFamily="'Courier New',monospace" textAnchor="middle" letterSpacing=".4">
        MINERAL ENHANCER CARTRIDGE
      </text>
      {/* enhancer top → chamber bottom */}
      <line x1="115" y1="406" x2="115" y2="370"
        stroke={FLOW} strokeWidth="1.5" className="efl" markerEnd="url(#eab)"/>

      {/* ═══════════════════════════════════════════════
          WATER INLET PIPE — bottom-left
          ═══════════════════════════════════════════════ */}
      <rect x="104" y="474" width="22" height="100"
        fill="none" stroke={STRUCT} strokeWidth="1.5" rx="3"/>
      {/* animated upward flow inside pipe */}
      <line x1="115" y1="568" x2="115" y2="482"
        stroke={FLOW} strokeWidth="1.5" className="efl" markerEnd="url(#eab)"/>
      {/* pipe top → enhancer bottom */}
      <line x1="115" y1="474" x2="115" y2="442"
        stroke={FLOW} strokeWidth="1.5" className="efl" markerEnd="url(#eab)"/>
      {/* label */}
      <line x1="128" y1="524" x2="172" y2="524" stroke={DIM} strokeWidth=".7"/>
      <text x="176" y="527" fill={TEXT} fontSize="8.5"
        fontFamily="'Courier New',monospace" letterSpacing=".5">
        WATER INLET
      </text>

      {/* ═══════════════════════════════════════════════
          ACIDIC WATER OUTPUT — exits bottom-right
          ═══════════════════════════════════════════════ */}
      <path
        d={`M 646 370 L 646 460 L 790 460`}
        fill="none" stroke={ACD} strokeWidth="1.8"
        className="efl" markerEnd="url(#ear)"
      />
      <text x="566" y="478" fill={ACD} fontSize="8.5"
        fontFamily="'Courier New',monospace" letterSpacing=".3">
        ACIDIC WATER OUTPUT  (pH 3–6)
      </text>

      {/* ═══════════════════════════════════════════════
          LEGEND  (two rows)
          ═══════════════════════════════════════════════ */}
      <line x1="80" y1="594" x2="720" y2="594" stroke={DIM} strokeWidth=".5" opacity=".4"/>

      {/* row 1 */}
      <rect x="80"  y="601" width="9" height="9" fill="#dcfce7" stroke={ALK} strokeWidth="1" rx="1"/>
      <text x="94"  y="609" fill={DIM} fontSize="7.5" fontFamily="'Courier New',monospace">CATHODE (C−)</text>

      <rect x="193" y="601" width="9" height="9" fill="#fee2e2" stroke={ACD} strokeWidth="1" rx="1"/>
      <text x="207" y="609" fill={DIM} fontSize="7.5" fontFamily="'Courier New',monospace">ANODE (A+)</text>

      <line x1="298" y1="605" x2="318" y2="605" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4 3"/>
      <text x="322" y="609" fill={DIM} fontSize="7.5" fontFamily="'Courier New',monospace">ION EXCHANGE MEMBRANE</text>

      <circle cx="480" cy="605" r="3" fill={H2C} opacity=".8"/>
      <text x="488" y="609" fill={DIM} fontSize="7.5" fontFamily="'Courier New',monospace">H₂ BUBBLE</text>

      {/* row 2 */}
      <line x1="80"  y1="628" x2="100" y2="628" stroke={FLOW} strokeWidth="1" strokeDasharray="4 3"/>
      <text x="104" y="632" fill={DIM} fontSize="7.5" fontFamily="'Courier New',monospace">WATER FLOW</text>

      <line x1="180" y1="628" x2="200" y2="628" stroke={ALK} strokeWidth="1.5"/>
      <text x="204" y="632" fill={DIM} fontSize="7.5" fontFamily="'Courier New',monospace">ALKALINE</text>

      <line x1="260" y1="628" x2="280" y2="628" stroke={ACD} strokeWidth="1.5"/>
      <text x="284" y="632" fill={DIM} fontSize="7.5" fontFamily="'Courier New',monospace">ACIDIC</text>

      <line x1="330" y1="624" x2="350" y2="624" stroke={STRUCT} strokeWidth="2"/>
      <text x="354" y="632" fill={DIM} fontSize="7.5" fontFamily="'Courier New',monospace">ENGINEERING / POWER LINE</text>
    </svg>
  );
}
