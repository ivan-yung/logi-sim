import React from "react";
import {useState} from "react";

import { shallow } from 'zustand/shallow';
import { useStore } from "../store";

import gate from "../nodes/gate";
import out from "../nodes/out";
import neg from "../nodes/neg";
import clk from "../nodes/clk";
import flipflop from "../nodes/flipflop";
import input from "../nodes/input";
import SegDisp from "../nodes/SegDisp";
import { BezierEdge } from "@xyflow/react";


const selector = (store) => ({
    createNode: (type, position, data) => store.createNode(type, position, data),
  
    bezEdge: store.updateEdgesDefault,
    stepEdge: store.updateEdgesToSmoothstep,
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
    input: input,
    SegDisp: SegDisp,
  
  };

  export default function Buttons(){
    const store = useStore(selector, shallow);
    const { stepEdge, bezEdge } = useStore(selector, shallow);
    const {logEdges, logStore} = useStore();
    const [buttonClick, setButtonClick] = useState(0);

    const handleLogEdges = () => {logEdges();}
    const logStoreHandler = () => {logStore();}

    //Edge view changer:
    const edgeChangeHandler = () =>{
      setButtonClick((prevButtonClick) => prevButtonClick + 1);
      if (buttonClick % 2 === 0){ stepEdge(); }else{ bezEdge(); }
    }
  
    //Node creation calls
    const createAndHandler = () => {store.createNode('and', { x: 100, y: 100 }, { inputa1: 3, inputa2: 3, output: 3 });}
    const createOrHandler = () => {store.createNode('or', { x: 0, y: 0 }, { inputa1: 3, inputa2: 3, output: 3 });}
    const createOutHandler = () => {store.createNode('out', { x: 0, y: 0 }, { inputa1: 3 });}
    const createInHandler = () => {store.createNode('input', { x: 0, y: 0 }, { output: 3 });}
    const createXorHandler = () => {store.createNode('xor', { x: 0, y: 0 }, { inputa1: 3, inputa2: 3, output: 3 });}
    const createNegHandler = () => {store.createNode('neg', { x: 0, y: 0 }, { inputa1: 3,output: 3 });}
    const createClkHandler = () => {store.createNode('clk', { x: 0, y: 0 }, {output: 3 });}
    const createSRFlip = () => {store.createNode('sr', { x: 0, y: 0 }, {inputa1: 3, inputa2: 3, inputa3: 3, output1: 3, output2: 3});}
    const createJKFlip = () => {store.createNode('jk', { x: 0, y: 0 }, {inputa1: 3, inputa2: 3, inputa3: 3, output1: 3, output2: 3});}
    const createFA = () => {store.createNode('fa', { x: 0, y: 0 }, {inputa1: 3, inputa2: 3, inputa3: 3, output1: 3, output2: 3});}
    const create7Seg = () => {store.createNode('SegDisp', { x: 0, y: 0 }, {inputa1: 3, inputa2: 3, inputa3: 3, inputa4: 3});}
  
    return(
      <>
      <div style = {{display: 'flex', justifyContent: 'center', gap: '10px', margin: '10px 0',}}>
        <button onClick ={edgeChangeHandler}>SwapWire</button>
        <button onClick ={createInHandler}>Input</button>
        <button onClick ={createClkHandler}>CLK</button>
        <button onClick ={createOutHandler}>OUT</button>
        <button onClick ={create7Seg}>NumDisp</button>
        <button onClick ={createAndHandler}>AND</button>
        <button onClick ={createOrHandler}>OR</button>
        <button onClick ={createXorHandler}>XOR</button>
        <button onClick ={createNegHandler}>NOT</button>
        <button onClick ={createSRFlip}>SR Flip</button>
        <button onClick ={createJKFlip}>JK Flip</button>
        <button onClick ={createFA}>FullAdder</button>

        


      </div>  
      
      </>
    )

  }