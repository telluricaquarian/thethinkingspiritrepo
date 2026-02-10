"use client";

import React from "react";
import type { WorkflowNode, WorkflowEdge } from "./types";

interface CanvasProps {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  nodeTypes: Record<string, React.FC<{ data: WorkflowNode["data"] }>>;
  edgeTypes: Record<string, React.FC<{ id: string; sourceX: number; sourceY: number; targetX: number; targetY: number }>>;
  fitView?: boolean;
  zoom?: number;
  offsetX?: number;
  offsetY?: number;
}

export const Canvas: React.FC<CanvasProps> = ({
  nodes,
  edges,
  nodeTypes,
  edgeTypes,
  zoom = 0.4,
  offsetX = 50,
  offsetY = 250,
}) => {
  // Unscaled node dimensions (must match node.tsx min-w / approximate height)
  const nodeW = 200;
  const nodeH = 110;
  // Nodes are rendered with transform: scale(zoom * 2), so visual dimensions
  // are nodeW * zoom * 2 wide and nodeH * zoom * 2 tall.
  // Handle dots sit at top-1/2 (vertical center) of the node.

  return (
    <div className="w-full h-full relative dot-grid overflow-hidden bg-black/40 border border-[#222222] rounded-lg">
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      >
        {edges.map((edge) => {
          const sourceNode = nodes.find((n) => n.id === edge.source);
          const targetNode = nodes.find((n) => n.id === edge.target);
          if (!sourceNode || !targetNode) return null;

          const EdgeComp = edgeTypes[edge.type];
          if (!EdgeComp) return null;

          return (
            <EdgeComp
              key={edge.id}
              id={edge.id}
              sourceX={
                sourceNode.position.x * zoom + offsetX + nodeW * zoom * 2
              }
              sourceY={
                sourceNode.position.y * zoom +
                offsetY +
                nodeH * zoom
              }
              targetX={targetNode.position.x * zoom + offsetX}
              targetY={
                targetNode.position.y * zoom +
                offsetY +
                nodeH * zoom
              }
            />
          );
        })}
      </svg>

      <div className="absolute inset-0 p-4 overflow-auto scrollbar-hide">
        <div
          className="relative"
          style={{ width: "1200px", height: "600px" }}
        >
          {nodes.map((node) => {
            const NodeComp = nodeTypes[node.type];
            if (!NodeComp) return null;

            return (
              <div
                key={node.id}
                className="absolute transition-all duration-500 ease-in-out"
                style={{
                  left: `${node.position.x * zoom + offsetX}px`,
                  top: `${node.position.y * zoom + offsetY}px`,
                  transform: `scale(${zoom * 2})`,
                  transformOrigin: "top left",
                  zIndex: 10,
                }}
              >
                <NodeComp data={node.data} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
