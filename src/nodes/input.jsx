import React, { useRef } from "react";
import { Handle, Position } from "@xyflow/react";
import { shallow } from "zustand/shallow";
import { useStore } from "../store";

const selector = (id) => (store) => ({
  setValue: (e) => store.storeNodeOutp(id, { type: e.target.value }),
  setValuePostConnect: (source, value) => store.storeNodeOutp(id, { output: value }),
  storeTo: (id, data, property) => store.storeTo(id, property, property),
  connect: (source, target, handle) => store.connectGates(source, target, handle),
  getGateType: (id) => store.getGateType(id),
  updateDependents: (e) => store.updateDependents(id),
});

function inputNode({ id, data }) {
  const {updateDependents, setValue, setValuePostConnect, connect} = useStore(selector(id), shallow);
  const isChanged = useRef(0);

  const onChanged = () => {
    isChanged.current = 1;
  }

  const handleSetValue = (e) => {
    onChanged();
    setValue(e);
    updateDependents(e);
  }

  const handleConnect = (params) => {
    if (isChanged.current === 0) {
      setValuePostConnect(params.source, 0);
    }
    connect(params.source, params.target, params.targetHandle);
    updateDependents(params);
  }

  const nodeStyles = {
    backgroundColor: "#282c34",
    color: "#61dafb",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    boxShadow: "none",
    fontFamily: "'Courier New', Courier, monospace",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const selectStyles = {
    marginTop: "10px",
    padding: "5px",
    backgroundColor: "#20232a",
    color: "#61dafb",
    border: "1px solid #61dafb",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1em",
  };

  const handleStyles = {
    backgroundColor: "#61dafb",
    border: "1px solid #20232a",
    width: "10px",
    height: "10px",
    borderRadius: "30%",
  };

  return (
    <div style={nodeStyles}>
      <label>
        <p style={{ margin: 0, fontSize: "1.2em", color: "#fff" }}>◐  INPUT</p>
        <select
          className="nodrag"
          value={data.value}
          onChange={handleSetValue}
          style={selectStyles}
        >
          <option value="0">0</option>
          <option value="1">1</option>
        </select>
      </label>
      <Handle
        type="source"
        position={Position.Right}
        onConnect={handleConnect}
        style={handleStyles}
      />
    </div>
  );
}

export default inputNode;
