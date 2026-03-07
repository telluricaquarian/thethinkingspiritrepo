"use client";

const NEON = "#22ff7a";
const BLUE = "#38bdf8";
const ALK  = "#4ade80";
const ACD  = "#f87171";
const H2C  = "#80ffea";
const TEXT = "#d4d4d4";
const DIM  = "#6b7280";

// 8 plate left-edge x positions, spacing 74px
const PXS  = [118, 192, 266, 340, 414, 488, 562, 636];
const PW   = 16;
const PY   = 104; // plate top y
const PH   = 200; // plate height → bottom at 304

// Membrane midpoints between adjacent plates ≈ [153, 227, 301, 375, 449, 523, 597]
const MEMS = PXS.slice(0, -1).map((x, i) =>
  Math.round(x + PW + (PXS[i + 1] - x - PW) / 2)
);

// Chamber geometry
const CX = 80, CY = 80, CW = 640, CH = 250; // bottom y = 330

export default function ElectrolysisDiagram() {
  return (
    <svg
      viewBox="0 0 800 510"
      className="w-full max-w-3xl"
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
          <path d="M0,.6 L6,3 L0,5.4" fill="none" stroke="white" strokeWidth="1.3"/>
        </marker>
        <marker id="eab" markerWidth="7" markerHeight="6" refX="6" refY="3" orient="auto">
          <path d="M0,.6 L6,3 L0,5.4" fill="none" stroke={BLUE}  strokeWidth="1.3"/>
        </marker>
        <marker id="eag" markerWidth="7" markerHeight="6" refX="6" refY="3" orient="auto">
          <path d="M0,.6 L6,3 L0,5.4" fill="none" stroke={ALK}   strokeWidth="1.3"/>
        </marker>
        <marker id="ear" markerWidth="7" markerHeight="6" refX="6" refY="3" orient="auto">
          <path d="M0,.6 L6,3 L0,5.4" fill="none" stroke={ACD}   strokeWidth="1.3"/>
        </marker>
      </defs>

      {/* Background */}
      <rect width="800" height="510" fill="#0a0a0a" rx="10"/>

      {/* ═══════════════════════════════════════════════
          ALKALINE DRINKING WATER OUTPUT — exits TOP-LEFT
          ═══════════════════════════════════════════════ */}
      <path
        d={`M 136 ${CY} L 136 44 L 510 44`}
        fill="none" stroke={ALK} strokeWidth="1.8"
        className="efl" markerEnd="url(#eag)"
      />
      <text x="136" y="30" fill={ALK} fontSize="8.5"
        fontFamily="'Courier New',monospace" letterSpacing=".3">
        ALKALINE DRINKING WATER OUTPUT  (pH 8–11)
      </text>

      {/* ═══════════════════════════════════════════════
          ELECTROLYSIS CHAMBER
          ═══════════════════════════════════════════════ */}
      <rect x={CX} y={CY} width={CW} height={CH}
        fill="#030809" stroke={NEON} strokeWidth="2" rx="6"/>
      <text x="400" y="96" fill={NEON} fontSize="8"
        fontFamily="'Courier New',monospace" textAnchor="middle"
        letterSpacing="1.5" opacity=".65">
        ELECTROLYSIS CHAMBER
      </text>
      <text x={CX + CW - 2} y="96" fill={DIM} fontSize="7.5"
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
              fill={isCathode ? "#001e0a" : "#190000"}
              stroke={isCathode ? NEON : ACD}
              strokeWidth="1.5" rx="2"
              className={isCathode ? "epc" : "epa"}
            />
            {/* polarity letter C / A */}
            <text x={x + PW / 2} y={PY + 14}
              fill={isCathode ? NEON : ACD}
              fontSize="8" fontFamily="'Courier New',monospace" textAnchor="middle">
              {isCathode ? "C" : "A"}
            </text>
            {/* sign − / + */}
            <text x={x + PW / 2} y={PY + 24}
              fill={isCathode ? NEON : ACD}
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
          stroke="#3a3a3a" strokeWidth="1" strokeDasharray="4 3"
        />
      ))}
      {/* IEM annotation — leader from centre membrane down to label */}
      <path
        d={`M ${MEMS[3]} ${PY + PH - 14} L ${MEMS[3]} 316 L ${MEMS[3] + 14} 322`}
        fill="none" stroke={DIM} strokeWidth=".7"
      />
      <text x={MEMS[3] + 18} y="325" fill={DIM} fontSize="7"
        fontFamily="'Courier New',monospace" letterSpacing=".3">
        ION EXCHANGE MEMBRANE
      </text>

      {/* ═══════════════════════════════════════════════
          WATER FLOW LINES inside chamber
          ═══════════════════════════════════════════════ */}
      {/* Horizontal flow showing water traversing all plates */}
      <line
        x1={CX + 14} y1={205} x2={CX + CW - 14} y2={205}
        stroke={BLUE} strokeWidth="1" className="efl"
        markerEnd="url(#eab)" opacity=".4"
      />
      {/* Vertical upward flow on alkaline (cathode) side */}
      <line
        x1="100" y1="318" x2="100" y2={CY + 8}
        stroke={ALK} strokeWidth="1" className="efl"
        markerEnd="url(#eag)" opacity=".45"
      />

      {/* ═══════════════════════════════════════════════
          HYDROGEN GENERATION + H₂ BUBBLES
          ═══════════════════════════════════════════════ */}
      <text x="400" y="118" fill={H2C} fontSize="7.5"
        fontFamily="'Courier New',monospace" textAnchor="middle"
        letterSpacing="1" opacity=".9">
        ↑  HYDROGEN GENERATION  ↑
      </text>

      {/* Cathode plates i=0,2,4,6 → x=118, 266, 414, 562 */}
      {[118, 266, 414, 562].flatMap((px, pi) =>
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
                values=".85;0"
                dur={`${dur}s`} begin={`${beg}s`} repeatCount="indefinite"/>
              <animate attributeName="r"
                values="2.5;1"
                dur={`${dur}s`} begin={`${beg}s`} repeatCount="indefinite"/>
            </circle>
          );
        })
      )}

      {/* Channel tints */}
      <rect x={CX + 1}     y={CY + 1} width="28" height={CH - 2} fill={ALK} opacity=".04" rx="4"/>
      <rect x={CX + CW - 29} y={CY + 1} width="28" height={CH - 2} fill={ACD} opacity=".04" rx="4"/>

      {/* ═══════════════════════════════════════════════
          DC POWER INPUT — cable entering left side of chamber
          ═══════════════════════════════════════════════ */}
      <text x="14" y="191" fill={TEXT} fontSize="8.5"
        fontFamily="'Courier New',monospace" letterSpacing=".4">
        DC POWER INPUT
      </text>
      {/* cable body */}
      <line x1="20" y1="200" x2="78" y2="200" stroke={NEON} strokeWidth="2"/>
      {/* plug head */}
      <rect x="10" y="194" width="12" height="14"
        fill="none" stroke={NEON} strokeWidth="1.5" rx="2"/>
      <line x1="14" y1="192" x2="14" y2="195" stroke={NEON} strokeWidth="1.5"/>
      <line x1="18" y1="192" x2="18" y2="195" stroke={NEON} strokeWidth="1.5"/>
      {/* terminal dot on chamber wall */}
      <circle cx="80" cy="200" r="3.5" fill={NEON} opacity=".9"/>
      {/* internal dashed bus to plate zone */}
      <line x1="82" y1="200" x2="116" y2="200"
        stroke={NEON} strokeWidth=".8" strokeDasharray="3 3" opacity=".35"/>

      {/* ═══════════════════════════════════════════════
          MINERAL ENHANCER — bottom-left, in flow path
          ═══════════════════════════════════════════════ */}
      <rect x="68" y="348" width="136" height="36"
        fill="#06100a" stroke={NEON} strokeWidth="1.5" rx="5"/>
      {Array.from({ length: 8 }, (_, i) => (
        <circle key={i} cx={82 + i * 16} cy="366" r="3"
          fill={NEON} opacity={i % 2 === 0 ? 0.55 : 0.28}/>
      ))}
      <text x="136" y="398" fill={NEON} fontSize="8"
        fontFamily="'Courier New',monospace" textAnchor="middle" letterSpacing=".4">
        MINERAL ENHANCER CARTRIDGE
      </text>
      {/* enhancer top → chamber bottom */}
      <line x1="95" y1="348" x2="95" y2="330"
        stroke={BLUE} strokeWidth="1.5" className="efl" markerEnd="url(#eab)"/>

      {/* ═══════════════════════════════════════════════
          WATER INLET PIPE — bottom-left
          ═══════════════════════════════════════════════ */}
      <rect x="84" y="418" width="22" height="82"
        fill="none" stroke={NEON} strokeWidth="1.5" rx="3"/>
      {/* animated upward flow inside pipe */}
      <line x1="95" y1="494" x2="95" y2="426"
        stroke={BLUE} strokeWidth="1.5" className="efl" markerEnd="url(#eab)"/>
      {/* pipe top → enhancer bottom */}
      <line x1="95" y1="418" x2="95" y2="384"
        stroke={BLUE} strokeWidth="1.5" className="efl" markerEnd="url(#eab)"/>
      {/* label */}
      <line x1="108" y1="458" x2="148" y2="458" stroke={DIM} strokeWidth=".7"/>
      <text x="152" y="461" fill={TEXT} fontSize="8.5"
        fontFamily="'Courier New',monospace" letterSpacing=".5">
        WATER INLET
      </text>

      {/* ═══════════════════════════════════════════════
          ACIDIC WATER OUTPUT — exits bottom-right
          ═══════════════════════════════════════════════ */}
      <path
        d={`M 692 330 L 692 418 L 782 418`}
        fill="none" stroke={ACD} strokeWidth="1.8"
        className="efl" markerEnd="url(#ear)"
      />
      <text x="576" y="437" fill={ACD} fontSize="8.5"
        fontFamily="'Courier New',monospace" letterSpacing=".3">
        ACIDIC WATER OUTPUT  (pH 3–6)
      </text>

      {/* ═══════════════════════════════════════════════
          LEGEND  (two rows)
          ═══════════════════════════════════════════════ */}
      <line x1="80" y1="456" x2="720" y2="456" stroke={DIM} strokeWidth=".5" opacity=".3"/>

      {/* row 1 */}
      <rect x="80"  y="462" width="9" height="9" fill="#001e0a" stroke={NEON} strokeWidth="1" rx="1"/>
      <text x="94"  y="470" fill={DIM} fontSize="7.5" fontFamily="'Courier New',monospace">CATHODE (C−)</text>

      <rect x="193" y="462" width="9" height="9" fill="#190000" stroke={ACD}  strokeWidth="1" rx="1"/>
      <text x="207" y="470" fill={DIM} fontSize="7.5" fontFamily="'Courier New',monospace">ANODE (A+)</text>

      <line x1="298" y1="466" x2="318" y2="466" stroke="#3a3a3a" strokeWidth="1" strokeDasharray="4 3"/>
      <text x="322" y="470" fill={DIM} fontSize="7.5" fontFamily="'Courier New',monospace">ION EXCHANGE MEMBRANE</text>

      <circle cx="480" cy="466" r="3" fill={H2C} opacity=".7"/>
      <text x="488" y="470" fill={DIM} fontSize="7.5" fontFamily="'Courier New',monospace">H₂ BUBBLE</text>

      {/* row 2 */}
      <line x1="80"  y1="484" x2="100" y2="484" stroke={BLUE} strokeWidth="1" strokeDasharray="4 3"/>
      <text x="104" y="488" fill={DIM} fontSize="7.5" fontFamily="'Courier New',monospace">WATER FLOW</text>

      <line x1="180" y1="484" x2="200" y2="484" stroke={ALK} strokeWidth="1.5"/>
      <text x="204" y="488" fill={DIM} fontSize="7.5" fontFamily="'Courier New',monospace">ALKALINE</text>

      <line x1="260" y1="484" x2="280" y2="484" stroke={ACD} strokeWidth="1.5"/>
      <text x="284" y="488" fill={DIM} fontSize="7.5" fontFamily="'Courier New',monospace">ACIDIC</text>

      <line x1="330" y1="480" x2="350" y2="480" stroke={NEON} strokeWidth="2"/>
      <text x="354" y="488" fill={DIM} fontSize="7.5" fontFamily="'Courier New',monospace">ENGINEERING / POWER LINE</text>
    </svg>
  );
}
