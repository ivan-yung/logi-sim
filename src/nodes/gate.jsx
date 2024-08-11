import React from "react";
import { Handle, Position } from "@xyflow/react";
import { shallow } from "zustand/shallow";
import { useStore } from "../store";

const selector = (id) => (store) => ({
  connect: (source, target, handle) => store.connectGates(source, target, handle),
  updateDependents: (id) => store.updateDependents(id),
  logStore: store.logStore,
});

const gateContainerStyle = {
  padding: 1,
  border: '1px solid #ddd',
  borderRadius: 10,
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  backgroundColor: '#56B3FA',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 5,
  width: 80,
  height: 70,
};

const handleStyle = {
    backgroundColor: "#61dafb",
    border: "1px solid #20232a",
    width: "10px",
    height: "10px",
    borderRadius: "30%",
};

const gateSymbolStyle = {
  color: '#fff',
  fontSize: 20,
  fontWeight: 450,
};

const Gate = ({ id, data, type }) => {
  const { connect, updateDependents } = useStore(selector(id), shallow);

  const handleConnect = (params) => {
    connect(params.source, params.target, params.targetHandle);
    updateDependents(params);
  };

  const getGateSymbol = (type) => {
    switch (type) {
      case 'or':
        return 'OR';
      case 'and':
        return 'AND';
      case 'xor':
        return 'XOR';
      default:
        return 'Unknown';
    }
  };

  return (
    <div style={gateContainerStyle}>
      <Handle
        type="target"
        position={Position.Left}
        id="inputa1"
        style={{ ...handleStyle, top: '30%' }}
      />

      <Handle
        type="target"
        position={Position.Left}
        id="inputa2"
        style={{ ...handleStyle, top: '70%' }}
      />

      <div style={gateSymbolStyle}>{getGateSymbol(type)}</div>

      <Handle
        type="source"
        position={Position.Right}
        id="output"
        style={handleStyle}
        onConnect={handleConnect}
      />
    </div>
  );
};

export default Gate;