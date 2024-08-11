import React from "react";
import { ReactFlow, ReactFlowProvider, Background, MiniMap } from '@xyflow/react';
import { shallow } from 'zustand/shallow';
 
import { useStore } from "./store";

import gate from "./nodes/gate";
import out from "./nodes/out";
import neg from "./nodes/neg";
import clk from "./nodes/clk";
import input from "./nodes/input";

import  Buttons  from "./components/buttons";
import Menubar from "./components/Menubar";
import flipflop from "./nodes/flipflop";
import SegDisp from "./nodes/SegDisp";

const selector = (store) => ({
  createNode: (type, position, data) => store.createNode(type, position, data),
  
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  addEdge: store.addEdge,

  logEdges: store.logEdges,
  logStore: store.logStore,
});

const nodeTypes = {
  and: gate,
  or: gate,
  xor: gate,
  neg: neg,
  clk: clk,
  out: out,
  sr: flipflop,
  jk: flipflop,
  fa: flipflop,
  input: input,
  SegDisp: SegDisp,
};
 
export default function App() {
  const store = useStore(selector, shallow);


  return (
    <>
    <Menubar/>
    <ReactFlowProvider>
      <Buttons/>
      <div style={{ width: '100vw', height: '90vh', '--node-border-default': 'none' }}>
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={store.nodes}
          edges={store.edges}
          onNodesChange={store.onNodesChange}
          onEdgesChange={store.onEdgesChange}
          onConnect={store.addEdge}
          fitView
          style={{
            '--node-border-default': 'none',
            '.reactFlow__nodeInput': { border: 'none' },
            '.reactFlow__nodeDefault': { border: 'none' },
            '.reactFlow__nodeOutput': { border: 'none' },
            '.reactFlow__nodeGroup': { border: 'none' },
          }}
          >
          <Background />
          <MiniMap/>
        </ReactFlow>
      </div>
    </ReactFlowProvider>
    </>
  );
}