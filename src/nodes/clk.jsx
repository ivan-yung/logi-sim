import React, { useState, useEffect, useRef } from "react";
import { Handle, Position } from "@xyflow/react";
import { shallow } from "zustand/shallow";
import { useStore } from "../store";

const selector = (id) => (store) => ({
  setValue: (value) => store.storeNodeOutp(id, { type: value }),
  setValuePostConnect: (source, value) => store.storeNodeOutp(id, { output: value }),
  storeTo: (id, data, property) => store.storeTo(id, property, property),
  connect: (source, target, handle) => store.connectGates(source, target, handle),
  updateDependents: (e) => store.updateDependents(id),
});

function ClkNode({ id, data }) {
  const { updateDependents, setValue, setValuePostConnect, connect } = useStore(selector(id), shallow);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const handleConnect = (params) => {
    connect(params.source, params.target, params.targetHandle);
    updateDependents(params);
  };

  const toggleRunning = () => {
    setIsRunning((prev) => !prev);
  };

  const activate = () => {
    setValuePostConnect(null, 1);
    updateDependents(null);
  };

  const deactivate = () => {
    setValuePostConnect(null, 0);
    updateDependents(null);
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        activate();
        setTimeout(deactivate, 100);
      }, 250);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const nodeStyles = {
    backgroundColor: "#282c34",
    color: "#61dafb",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    boxShadow: "none",
    //fontFamily: "'Courier New', Courier, monospace",
    fontFamily: 'Poppins',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const buttonStyles = {
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
      <p style={{ margin: 0, fontSize: "1.2em", color: "#fff" }}>🕑CLK</p>
      <button onClick={toggleRunning} style={buttonStyles}>
        {isRunning ? "ON" : "OFF"}
      </button>
      <Handle
        type="source"
        position={Position.Right}
        onConnect={handleConnect}
        style={handleStyles}
      />
    </div>
  );
}

export default ClkNode;