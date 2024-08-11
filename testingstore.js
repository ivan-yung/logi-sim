import { nanoid } from "nanoid";
import { create } from "zustand";

  
export const useStore = create((set, get) => ({

  stack: [],

  getAdjList(){
    // create adjacency List
    const edges = get().getEdges();
    const adjList = {};
    // Loop through edges, pushing in source, and next node
    edges.forEach((edge) => {
      if (!adjList[edge.source]) {
        adjList[edge.source] = [];
      }
      adjList[edge.source].push(edge.target);
    })

    return adjList;
  },

  
  topSort(){
    const V = get().edge.length + 1;
    const adjList = get().getAdjList();
    const visited = new Array(V).fill(false);
    const output = [];

    for (let i = 0; i < V; i++){
      if(!visited[i]){
        DFS(i, adjList, visited);
      }
    }

    while(!stack.empty){
      output.push(stack.top());
      stack.pop();
    }

    return output;
  },

    DFS(V, adjList, visited){
      visited[V] = true;

      for (let i = 0; i < adjList.length; i++){
        if (!visited[i]){
          DFS(i, adjList, visited,Stack);
        }
      }

      stack.push(V);
    },


  
  //works, but stored into store as a string
  updateInputNode(id, data) {
    console.log('updateInput function activated', data);
    const inputData = Object.values(data)[0];
    set({
      nodes: get().nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, inputs: inputData } }
          : node
      ),
    });
  },
  //Stores node info to output, accepts int and string as data argument
  storeNode(id, data) {
    console.log('updateInput function activated', data);
    console.log(id);
    const inputData = typeof data === 'object' ? parseInt(Object.values(data)[0], 10) : data;
    set({
      nodes: get().nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, output: inputData } }
          : node
      ),
    });
  },
  //Stores info to any property
  storeNode(id, data, property) {
    console.log('storeNode function activated', data);
    console.log(id);
    const inputData = typeof data === 'object' ? parseInt(Object.values(data)[0], 10) : data;
    set({
      nodes: get().nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, [property]: inputData } }
          : node
      ),
    });
  },

  //================= Get =========================
  testGetStore: (get) => {
    const outputValue = get().nodes.find((node) => node.id === 'input1').data.output;
    console.log('Testing Get: ', outputValue);
  },

  // returns value of node and property. has default value in which the nodes data object is undefined
  getNodeData: (id, property, defaultValue = null) => {
    const nodes = get().nodes;
    const node = nodes.find((node) => node.id === id);
    return node && node.data[property] !== undefined ? node.data[property] : defaultValue;
  },

  //================ Connect ======================
  connectGates(source, id2, gateId){
    const sourceData = get().getNodeData(source, 'output');
    const L = get().getNodeData(id2, 'output');
    
    const gate = get().getGateType(gateId);

    if ((sourceData === 3) || (L === 3)){
      get().storeNode(gateId, '0');

    }else{;
      const out = get().gateLogic(sourceData, L, gate);
      get().storeNode(gateId, { output: out });

    }
  },
  //Console Logged for debugging
  //Set ouput of input node to input of gate node
  connectGates(source, id2, gateId){
    console.log('Connecting gates id1: ', source);
    console.log('Connecting gates id2: ', id2);
    console.log('Connecting Gates, gateId: ', gateId);
    const sourceData = get().getNodeData(source, 'output');
    const L = get().getNodeData(id2, 'output');
    console.log('Connecting gates U: ', sourceData);
    console.log('Connecting gates L: ', L);

    const gate = get().getGateType(gateId);
    console.log('Connecting Gates, gate is currently of type: ', gate);
    if ((sourceData === 3) || (L === 3)){
      console.log('Gate Conditions NOT TRUE: ', gateId);
      get().storeNode(gateId, 0);
    }else{
      console.log('Gate Conditons TRUE');
      const out = get().gateLogic(sourceData, L, gate);
      get().storeNode(gateId, { output: out });
    }
  },

  // Sets value passed from source of connection to target handle
  //@Source = source ID
  //@target = target ID
  connectGates(source, target, handle){
    const sourceData = get().getNodeData(source, 'output');
    //Update Connection target with value
    get().storeTo(target, sourceData, handle);
    //Make Gate Logic
    get().connectGatesHelper(target);
  },

  connectGatesHelper(gate){
    const firstData = get().getNodeData(gate, 'inputa1');
    const secondData = get().getNodeData(gate, 'inputa2');
    const gateType = get().getGateType(gate);

    if ((firstData === 3) || (secondData === 3)){
      get().storeNodeOutp(gate, 0);
    }else{
      const out = gateLogic(FirstData, secondData, gateType);
      get().storeNodeOutp(gate, { output: out });
    }
  },

  // Sets value passed from source of connection to target handle
  // *includes better handling if target is output
  //@Source = source ID
  //@target = target ID
  connectGates(source, target, handle){
    const sourceData = get().getNodeData(source, 'output');
    const gateType = get().getGateType(target);
    //If gate type is out, store source value to target
    if (gateType === 'out'){
      get().storeTo(target, sourceData, handle);
    }else{
      //Update Connection target with value
      get().storeTo(target, sourceData, handle);
      //Make Gate Logic
      get().connectGatesHelper(target);
    }
  },

  gateLogic(L, R, G){
    console.log('GateLogic here  L: ', L);
    console.log('GateLogic here  R: ', R);
    console.log('GateLogic here  gate: ', G);
    switch(G){
      case 'and':
        if ((L & R) !== 0)  {
          console.log('outputted 1');
          return 1;
        }else{
          console.log('outputted 0');
          return 0;
        }
    }
  },

  //Cascading Update
  const handleSetValue = (params) => {
    onChanged(1);
    setValue(params);
    logStore();

    // Trigger cascade update
    const dependentNodes = getDependentNodes(id, get);
    dependentNodes.forEach((nodeId) => {
      get().connectGatesHelper(nodeId);
  });
  },

  const getDependentNodes = (id, get) => {
    const edges = get().edges;
    const dependentNodes = [];
  
    edges.forEach((edge) => {
      if (edge.source === id) {
        dependentNodes.push(edge.target);
      }
    });
  
    return dependentNodes;
  },

  //Updates all dependent nodes given a root node
  // @id root node
  updateDependents(id){
    const dependentNodes = get().getDependents(id);
    dependentNodes.forEach((id) => {
      get().connectGatesHelper(id);
    })
  },
  // update dependencies by iterating through adjacent nodes
  // @id = nodeId of current node
  updateDependents(id){
    const [targets, sources, handles] = get().getDependents(id);

    targets.forEach((target, index) => {
      const source = sources[index];
      const handle = handles[index];
      
      get().connectGates(source, target, handle);
    })
  },

  
  // Utilizes a modified DFS to return a topological ordering of nodes
  // ONLY dependent on source node
  // @id = source node
  getTopOrder(id){
    const edges = get().getEdges();
    let curr = id;
    const out = [];

    for (let i = 0; i < edges.length; i++){
      const edge = edges[i];
      if (edge.source == id){
        curr = edge.target;
        out.push(i);
      }
    }
    for (let j = 0; j < edges.length; j++){
      for (let i = 0; i < edges.length; i++){
        const edge = edges[i];
        if (curr === edge.source){
          out.push(i);
          curr = edge.target;
        }
      }
    }
    return out;
  },

  // Find dependent Nodes
  // @id = nodeId of current node
  getDependents(id){
    const edges = get().getEdges();
    const DNTargets = [];
    const DNSources = [];
    const DNHandles = [];

    edges.forEach((edge) => {
      if (edge.source == id) {
        DNTargets.push(edge.target);
        DNSources.push(edge.source);
        DNHandles.push(edge.targetHandle);
      }
    })
    return [DNTargets, DNSources, DNHandles];
  },

  updateDependents(id){
    const edges = get().getEdges();
    let curr = id;
    const out = [];

    //set curr to id.target
    edges.forEach((edge) => {
      if (edge.source == id){
        curr = edge.target;
        out.push(edge.target);
      }
    })

    for (let j = 0; j < edges.length; j++){
      for (let i = 0; i < edges.length; i++){
        const edge = edges[i];
        if (curr === edge.source){
          out.push(edge.target);
          curr = edge.target;
        }
        
      }
    }
    return out;
  },
  updateDependents(id){
    const topOrder = get().getTopOrder(id);
    const edges = get().getEdges();
    const targets = [];
    const sources = [];
    const handles = [];

    for (let i = 0; i < topOrder.length; i ++){
      for (let j = 0; j < edges.length; j++){
        if (topOrder[i] === j){
          targets.push(edges.target);
          sources.push(edges.source);
          handles.push(edges.handle);

        }
      }
    }

    for (let i = 0; i < topOrder.length; i++ ){
      const target = targets[i];
      const source = sources[i];
      const handle = handles[i];
      
      get().connectGates(source, target, handle);
    }
  },






    // Calculates output and stores output into store (handles 3 input gates)
  // @gate = nodeID
  connectGatesHelperMultiple(gate){
    const firstData = get().getNodeData(gate, 'inputa1');
    const secondData = get().getNodeData(gate, 'inputa2');
    const thirdData = get().getNodeData(gate, 'inputa3');
    const gateType = get().getGateType(gate);

    if ((firstData === 3) || (secondData === 3) || (thirdData === 3)){
      if ((gateType === 'sr') || (gateType === 'jk')){
        get().storeTo(gate, 0, 'output1');
        get().storeTo(gate, 0, 'output2');
      }
    }else{
      if ((gateType === 'sr') || (gateType === 'jk')){
        switch(G){
          case 'sr':
            if (gateType === 'flipflop'){
              let Q = get().getNodeData(gate, 'output1');
              let Qnot = get().getNodeData(gate, 'output2');
            
              if (firstData && !secondData) { // S=1, R=0
                Q = 1;
                Qnot = 0;
              } else if (!firstData && secondData) { // S=0, R=1
                Q = 0;
                Qnot = 1;
              } else if (firstData && secondData) { // S=1, R=1 (invalid)
                Q = Q; // hold previous state
                Qnot = Qnot;
              } else { // S=0, R=0 (hold previous state)
                Q = Q;
                Qnot = Qnot;
              }
            
              get().storeTo(gate, Q, 'output1');
              get().storeTo(gate, Qnot, 'output2');
            }
        }
      }
    }
  },

  // Sets value passed from source of connection to target handle
  // *includes better handling if target is output
  //@Source = source ID
  //@target = target ID
  //@handle = handle ID
  connectGates(source, target, handle){
    const sourceData = get().getNodeData(source, 'output');
    const srcType = get().getGateType(source);
    const gateType = get().getGateType(target);
    //If gate type is out, store source value to target
    if (gateType === 'out'){
      get().storeTo(target, sourceData, handle);
    }  
    if ((gateType === 'sr')||(gateType === 'jk')){
      get().storeTo(target, sourceData, handle);
      get().connectGatesHelperMultiple(target);
    }else{
      //Update Connection target with value
      get().storeTo(target, sourceData, handle);
      //Make Gate Logic
      get().connectGatesHelper(target);
    }
  },

  handleFlip(){
    

  }
}));







import React, {useRef} from "react";
import { Handle, Position } from "@xyflow/react";
import { shallow } from "zustand/shallow";
import { useStore } from "../store";


const selector = (id) => (store) => ({
  setValue: (e) => store.storeNodeOutp(id, { type: e.target.value }),
  setValuePostConnect: (source, value) => store.storeNodeOutp(id, { output: value}),
  storeTo: (id, data, property) => store.storeTo(id, property, property),

  connect: (source, target, handle) => store.connectGates(source, target, handle),
  updateDependents: (e) => store.updateDependents(id),
});

const input = ({ id, data, type }) => {
  const {updateDependents, setValue, setValuePostConnect, connect} = useStore(selector(id), shallow);
  const isChanged = useRef(0);//Ref for tracking changes


  const onChanged = () => {
    isChanged.current = 1; // update ref value to 1
  }

  const handleSetValue = (e) => {
    onChanged(1);
    setValue(e);
    //update all dependent nodes
    updateDependents(e);

  }

  const handleConnect = (params) => {
    // Check if input was changed. If input not changed set input to 0
    if ( isChanged.current === 0 ){
      setValuePostConnect(params.source, 0);
    }
    //call connection to dependent gate
    connect(params.source, params.target, params.targetHandle);
    updateDependents(params);
  }

  return (

    <div>


        <p>◐  INPUT</p>
        <select className="nodrag" value={data.value} onChange={handleSetValue}>
          <option value="0">0</option>
          <option value="1">1</option>
        </select>


        <Handle
        type="source"
        position={Position.Right}
        onConnect={handleConnect}
        style={{ background: '#555'}}
        />
        
    </div>

  );
}

export default input;