import { applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import { nanoid } from "nanoid";
import { create } from "zustand";


export const useStore = create((set, get) => ({
  nodes: [
    {
      id: 'input1',
      type: 'input',
      position: {x: 0, y:173},
      data: {output: 3},
    },
    {
      id: 'out',
      type: 'out',
      position: {x: 380, y: 200},
      data: {inputa1: 3}
    },


  ],
  edges: [],

  //Stores input into 'output' property of specified node
  // @id = nodeId
  // @data = updates node property with this information
  storeNodeOutp(id, data) {
    const inputData = typeof data === 'object' ? parseInt(Object.values(data)[0], 10) : data;
    set({
      nodes: get().nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, output: inputData } }
          : node
      ),
    });
  },
  
  //updates store with info to any property
  // @id = nodeId
  // @data = updates node property with this information
  // @property = field in which to update (input or output)
  storeTo(id, data, property) {
    const inputData = typeof data === 'object' ? parseInt(Object.values(data)[0], 10) : data;
    set({
      nodes: get().nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, [property]: inputData } }
          : node
      ),
    });
  },

  //Returns inputs or outputs from a node
  getNodeData: (id, property) => {
    const nodes = get().nodes;
    const node = nodes.find((node) => node.id === id);
    return node && node.data[property];
  },
  //Returns type of node
  getGateType: (id) => {
    const nodes = get().nodes;
    const node = nodes.find((node) => node.id === id);
    return node && node.type;
  },
  //Returns edges in graph
  getEdges: () =>{
    return get().edges;
  },

  // Utilizes a DFS to preturn a topological ordering of nodes
  // ONLY dependent on source node
  // @id = source node
  getTopOrder(id) {
    const edges = get().getEdges();
    const visited = new Set();
    const inProgress = new Set();
    const out = [];

    // Create a map to track how many inputs each node has
    const inputCount = new Map();
    edges.forEach(edge => {
        if (!inputCount.has(edge.target)) {
            inputCount.set(edge.target, 0);
        }
        inputCount.set(edge.target, inputCount.get(edge.target) + 1);
    });

    function dfs(node) {
        // If in progress of visiting this node, skip to avoid loops
        if (inProgress.has(node)) return;

        visited.add(node);
        inProgress.add(node);

        for (const edge of edges) {
            if (edge.source === node && !visited.has(edge.target)) {
                dfs(edge.target);
            }
        }

        // Now that all dependencies have been processed, push the node
        out.push(node);
        inProgress.delete(node);
    }

    // Start DFS from the initial node
    dfs(id);

    return out.reverse(); // Reversed order for topological sort
  },
  
  // Using topological order obtained from @getTopOrder(), updates all
  // nodes that are found to be dependent on source node (id)
  // @id = nodeId of source node
  updateDependents(id) {
    const topOrder = get().getTopOrder(id); // Now an array of node IDs
    console.log(topOrder);
    const edges = get().getEdges();

    for (let i = 0; i < topOrder.length; i++) {
        const source = topOrder[i]; // Current node in topological order

        // Find all edges where this node is the source
        for (const edge of edges) {
            if (edge.source === source) {
                const target = edge.target;
                const handle = edge.targetHandle;
                const sourceHandle = edge.sourceHandle;

                // Connect the gates using the source and target information
                get().connectGates(source, target, handle, sourceHandle);
            }
        }
    }
  },

  // Sets value passed from source of connection to target handle
  // *includes better handling if target is output
  //@Source = source ID
  //@target = target ID
  //@handle = handle ID
  connectGates(source, target, handle, sourceAddr){
    
    let sourceData = get().getNodeData(source, 'output');
    
    if (sourceData === undefined){
      sourceData = get().getNodeData(source, sourceAddr);
      
    }

    const gateType = get().getGateType(target);
    //If gate type is out, store source value to target
    if ((gateType === 'out')||(gateType === 'SegDisp')){
      get().storeTo(target, sourceData, handle);
      return;
    }  

    if ((gateType === 'sr')||(gateType === 'jk')||(gateType === 'fa')){
      get().storeTo(target, sourceData, handle);
      get().connectGatesHelperMultiple(target);
    }else{
      //Update Connection target with value
      get().storeTo(target, sourceData, handle);
      //Make Gate Logic
      get().connectGatesHelper(target);
    }
  },
  // Calculates output and stores output into store
  // @gate = nodeID
  connectGatesHelper(gate){
    const firstData = get().getNodeData(gate, 'inputa1');
    const secondData = get().getNodeData(gate, 'inputa2');
    const gateType = get().getGateType(gate);

    if ((firstData === 3) || (secondData === 3)){
      get().storeNodeOutp(gate, 0);
    }else{
      const out = get().gateLogic(firstData, secondData, gateType);
      get().storeNodeOutp(gate, { output: out });
    }
  },
  // Calculates output and stores output into store (handles 3 input gates)
  // @gate = nodeID
  connectGatesHelperMultiple(gate){
    const firstData = get().getNodeData(gate, 'inputa1');
    const ClkInput = get().getNodeData(gate, 'inputa2');
    let thirdData = get().getNodeData(gate, 'inputa3');
    const gateType = get().getGateType(gate);
    if ((gateType === 'fa')&&(thirdData===3)){
      get().storeTo(gate, 0, 'inputa3');
      thirdData = 0;
    } else{
      if ((firstData === 3) || (ClkInput === 3) || (thirdData === 3)){
        if ((gateType === 'sr') || (gateType === 'jk') || (gateType === 'fa')){
          get().storeTo(gate, 0, 'output1');
          get().storeTo(gate, 0, 'output2');
        }
      }else{
        get().flipLogic(firstData, ClkInput, thirdData, gateType, gate);
      } 
    }
  },
  // Computes flip flop logic. Returns 1 or 0 for 2 outputs
  // @firstData = Left argument of component
  // @ClkInput = Middle argument (Clock)
  // @thirdData = Right argument of component
  // @gateType = gate type identifier
  // @gate = id of gate for searching in function
  flipLogic(firstData, ClkInput, thirdData, gateType, gate){
    let Q = get().getNodeData(gate, 'output1');
    let Qnot = get().getNodeData(gate, 'output2');
    switch(gateType){
      case 'sr':
        if (ClkInput === 1) {  // Only evaluate when the clock is high
          if (firstData === 1 && thirdData === 0) {  // Set condition
            Q = 1;
            Qnot = 0;
          } else if (firstData === 0 && thirdData === 1) {  // Reset condition
            Q = 0;
            Qnot = 1;
          } else if (firstData === 0 && thirdData === 0) {  // No change condition
            // Q and Qnot remain the same
          } else if (firstData === 1 && thirdData === 1) {  // Invalid condition for SR flip-flop
            // Typically not allowed, but let's assume Q and Qnot go to an undefined state
            Q = 3;
            Qnot = 3;
          }
        }
        break;
        
      case 'jk':
        if (ClkInput === 1) {  // Only evaluate when the clock is high
          if (firstData === 0 && thirdData === 0) {  // No change condition
            // Q and Qnot remain the same
          } else if (firstData === 0 && thirdData === 1) {  // Reset condition
            Q = 0;
            Qnot = 1;
          } else if (firstData === 1 && thirdData === 0) {  // Set condition
            Q = 1;
            Qnot = 0;
          } else if (firstData === 1 && thirdData === 1) {  // Toggle condition
            Q = Q === 1 ? 0 : 1;
            Qnot = Qnot === 1 ? 0 : 1;
          }
        }
        break;

      case 'fa':
        const A = firstData;
        const B = ClkInput;
        const C = thirdData;
        if (!A && !B && !C){
          Q = 0;
          Qnot = 0;
        } else if((!A && !B && C) || (!A && B && !C) || (A && !B && !C)){
          Q = 1;
          Qnot = 0;
        } else if((!A && B && C) || (A && !B && C) || (A && B && !C)){
          Q = 0;
          Qnot = 1;
        } else{
          Q = 1;
          Qnot = 1;
        }
        break
      }

      get().storeTo(gate, Q, 'output1');
      get().storeTo(gate, Qnot, 'output2');
  },

  // Computes gate logic of 2 to 1. Returns 1 or 0
  // @L = Left argument of gate
  // @R = Right argument of gate
  // @G = gate type identifier
  gateLogic(L, R, G){
    switch(G){
      case 'and':
        if ((L & R) !== 0)  {
          return 1;
        }else{
          return 0;
        }
      case 'or':
        return (L | R) !== 0 ? 1 : 0;
      case 'neg':
        return L === 0 ? 1: 0;
      case 'xor':
        return (L ^ R) !== 0 ? 1 : 0;
    }
  },


  // Creates a node based on parameters passed
  // @type: gate type (string input)
  // @position: start position (2d array input)
  // @data: starting data value
  createNode: (type, position, data = {}) => {
    const id = nanoid(6);
    const newNode = {
      id,
      type,
      position,
      data,
    };
    set({
      nodes: [...get().nodes, newNode],
    });
  },

  //debug funct
  logGateData: () =>{
    const gateType = get().getGateType('input2');
    console.log(gateType)
  },
  //debug funct
  logNodeData: () => {
    const gate = 'input2';
    const prop = 'output';
    const info = get().getNodeData(gate, prop);
    console.log(info);
  },
  //debug funct
  logStore: () => {
    const store = get();
    console.log('Zustand Store:', store);
  },
  //debug funct
  logInStore: () => {
    const store = get();
    console.log('Zustand Store - Input Nodes:', store.nodes.filter(node => node.type === 'input').map(node => node.data));
  },
  //debug funct
  logEdges: () => {
    const edges = get().getEdges();
    console.log();
    console.log('Edges:', edges);
    const nodes = get().edges.length + 1;
    console.log('num nodes: ', nodes);
  },
  onNodesChange(changes) {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
 
  onEdgesChange(changes) {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
 
  updateEdgesToSmoothstep() {
    set({
      edges: get().edges.map((edge) => ({ ...edge, type: 'smoothstep' })),
    });
  },

  updateEdgesDefault() {
    set({
      edges: get().edges.map((edge) => ({ ...edge, type: 'default' })),
    });
  },

  addEdge(data) {
    const id = nanoid(6);
    const edge = { id, ...data };

    set({ edges: [edge, ...get().edges] });
  },
}));

