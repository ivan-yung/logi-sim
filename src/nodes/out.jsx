import React from "react";
import { Handle, Position } from "@xyflow/react";
import { shallow } from "zustand/shallow";
import { useStore } from "../store";

const outGate = ({ id, data }) => {
  const { getNodeData } = useStore();
  const output = getNodeData(id, 'inputa1');

  let displayOutput;
  if (output === 3) {
    displayOutput = 'null';
  } else {
    displayOutput = output;
  }

  let backgroundColor;
  if (output === 1) {
    backgroundColor = '#FF3737'; // Red
  } else if (output === 0) {
    backgroundColor = '#660000'; // Dark Red
  } else {
    backgroundColor = '#000000'; // Light Gray
  }

  const nodeStyles = {
    padding: 10,
    border: '1px solid #ddd',
    borderRadius: 8,
    textAlign: 'center',
    backgroundColor,
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Poppins',
    fontSize: 16,
  };

  const handleStyles = {
    backgroundColor: "#61dafb",
    border: "1px solid #20232a",
    width: "10px",
    height: "10px",
    borderRadius: "30%",
  };

  const textStyles = {
    margin: 0,
    color: '#FFFF',
  };

  return (
    <div style={nodeStyles}>
      <Handle
        type="target"
        position={Position.Left}
        id="inputa1"
        style={handleStyles}
      />
      <p style={textStyles}>💡 OUT: {displayOutput}</p>
    </div>
  );
}

export default outGate;