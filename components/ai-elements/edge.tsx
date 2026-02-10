"use client";

import React from "react";

interface EdgeProps {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
}

const Animated: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
}) => {
  const pathD = `M ${sourceX} ${sourceY} C ${sourceX + 100} ${sourceY}, ${targetX - 100} ${targetY}, ${targetX} ${targetY}`;
  const pathId = `edge-path-${id}`;

  return (
    <g>
      {/* Base solid line */}
      <path d={pathD} fill="none" stroke="#333" strokeWidth="1.5" />
      {/* Animated dashed overlay */}
      <path
        id={pathId}
        d={pathD}
        fill="none"
        stroke="#666"
        strokeWidth="1.5"
        strokeDasharray="5,5"
        className="animate-[dash_10s_linear_infinite]"
      />
      {/* Traveling dot along the path */}
      <circle r="3" fill="#0070f3" opacity="0.9">
        <animateMotion dur="4s" repeatCount="indefinite">
          <mpath href={`#${pathId}`} />
        </animateMotion>
      </circle>
      {/* Source endpoint (pulsing) */}
      <circle
        cx={sourceX}
        cy={sourceY}
        r="3"
        fill="#0070f3"
        className="animate-pulse"
      />
      {/* Target endpoint */}
      <circle cx={targetX} cy={targetY} r="3" fill="#0070f3" />
    </g>
  );
};

const Temporary: React.FC<EdgeProps> = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
}) => {
  const path = `M ${sourceX} ${sourceY} C ${sourceX + 100} ${sourceY}, ${targetX - 100} ${targetY}, ${targetX} ${targetY}`;

  return (
    <g>
      <path
        d={path}
        fill="none"
        stroke="#444"
        strokeWidth="1.5"
        strokeDasharray="4,4"
        className="opacity-50"
      />
      <circle cx={sourceX} cy={sourceY} r="2" fill="#444" />
      <circle cx={targetX} cy={targetY} r="2" fill="#444" />
    </g>
  );
};

export const Edge = {
  Animated,
  Temporary,
};
