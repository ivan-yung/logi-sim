import React from "react";
import { Handle, Position } from "@xyflow/react";
import { shallow } from "zustand/shallow";
import { useStore } from "../store";

const selector = (id) => (store) => ({
  connect: (source, target, handle) => store.connectGates(source, target, handle),
  updateDependents: (e) => store.updateDependents(id),
  logStore: store.logStore,
});

const gateContainerStyle = {
  padding: 20,
  border: '2px solid #FFC5C5',
  borderRadius: 10,
  textAlign: 'center',
  backgroundColor: '#FFC5C5',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const handleStyle = {
    backgroundColor: "#61dafb",
    border: "1px solid #20232a",
    width: "10px",
    height: "10px",
    borderRadius: "30%",
};

const Gate = ({ id, data, type }) => {
  const { connect, updateDependents } = useStore(selector(id), shallow);

  const handleConnect = (params) => {
    connect(params.source, params.target, params.targetHandle);
    updateDependents(params);
  };

  return (
    <div style={gateContainerStyle}>
      <Handle
        type="target"
        position={Position.Left}
        id="inputa1"
        style={handleStyle}
      />
      <div style={{ fontSize: 24, fontWeight: 600 }}>▶ο</div>
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