"use client";

import React from "react";
import Image from "next/image";
import { Canvas } from "@/components/ai-elements/canvas";
import { Edge } from "@/components/ai-elements/edge";
import {
  Node,
  NodeContent,
  NodeDescription,
  NodeFooter,
  NodeHeader,
  NodeTitle,
} from "@/components/ai-elements/node";
import type { WorkflowNode, WorkflowEdge } from "@/components/ai-elements/types";

const nodeIds = {
  start: "start",
  process1: "process1",
  decision: "decision",
  output1: "output1",
  output2: "output2",
  process2: "process2",
};

const nodes: WorkflowNode[] = [
  {
    data: {
      description: "Initialize workflow",
      handles: { source: true, target: false },
      label: "Start",
    },
    id: nodeIds.start,
    position: { x: 0, y: 0 },
    type: "workflow",
  },
  {
    data: {
      description: "Transform input",
      handles: { source: true, target: true },
      label: "Process Data",
    },
    id: nodeIds.process1,
    position: { x: 500, y: 0 },
    type: "workflow",
  },
  {
    data: {
      description: "Route based on conditions",
      handles: { source: true, target: true },
      label: "Decision Point",
    },
    id: nodeIds.decision,
    position: { x: 1000, y: 0 },
    type: "workflow",
  },
  {
    data: {
      description: "Handle success case",
      handles: { source: true, target: true },
      label: "Success Path",
    },
    id: nodeIds.output1,
    position: { x: 1500, y: -120 },
    type: "workflow",
  },
  {
    data: {
      description: "Handle error case",
      handles: { source: true, target: true },
      label: "Error Path",
    },
    id: nodeIds.output2,
    position: { x: 1500, y: 120 },
    type: "workflow",
  },
  {
    data: {
      description: "Finalize workflow",
      handles: { source: false, target: true },
      label: "Complete",
    },
    id: nodeIds.process2,
    position: { x: 2000, y: 0 },
    type: "workflow",
  },
];

const edges: WorkflowEdge[] = [
  { id: "e1", source: nodeIds.start, target: nodeIds.process1, type: "animated" },
  { id: "e2", source: nodeIds.process1, target: nodeIds.decision, type: "animated" },
  { id: "e3", source: nodeIds.decision, target: nodeIds.output1, type: "animated" },
  { id: "e4", source: nodeIds.decision, target: nodeIds.output2, type: "temporary" },
  { id: "e5", source: nodeIds.output1, target: nodeIds.process2, type: "animated" },
  { id: "e6", source: nodeIds.output2, target: nodeIds.process2, type: "temporary" },
];

const WorkflowNodeComponent: React.FC<{ data: WorkflowNode["data"] }> = ({
  data,
}) => (
  <Node handles={data.handles}>
    <NodeHeader>
      <NodeTitle>{data.label}</NodeTitle>
      <NodeDescription>{data.description}</NodeDescription>
    </NodeHeader>
    <NodeContent>
      <div className="bg-black/40 p-1 rounded-sm border border-zinc-800">
        test
      </div>
      <div className="bg-black/40 p-1 rounded-sm border border-zinc-800">
        test
      </div>
    </NodeContent>
    <NodeFooter>
      <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
    </NodeFooter>
  </Node>
);

const nodeTypes = { workflow: WorkflowNodeComponent };

const edgeTypes = {
  animated: Edge.Animated,
  temporary: Edge.Temporary,
};

export const NegentropicWorkflowPreview: React.FC<{
  className?: string;
}> = ({ className }) => {
  return (
    <div className={className}>
      <div className="h-[240px] w-full relative">
        <Canvas
          edges={edges}
          edgeTypes={edgeTypes}
          fitView
          nodes={nodes}
          nodeTypes={nodeTypes}
          zoom={0.3}
          offsetX={20}
          offsetY={100}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/60 pointer-events-none rounded-lg" />
        {/* NI logo badge */}
        <div className="absolute bottom-3 left-3 z-20 pointer-events-none">
          <Image
            src="/images/negentropicyellowlogo.png"
            alt="Negentropic"
            width={40}
            height={40}
            className="rounded-md shadow-sm"
          />
        </div>
      </div>
    </div>
  );
};
