import React from "react";
import { Handle, Position } from "@xyflow/react";
import { shallow } from "zustand/shallow";
import { useStore } from "../store";

const selector = (id) => (store) => ({
    connect: (source, target, handle, sourceAddr) => store.connectGates(source, target, handle, sourceAddr),
    updateDependents: (id) => store.updateDependents(id),
    logStore: store.logStore,
});

const flipflop = ({ id, data, type }) => {
    const { connect, updateDependents } = useStore(selector(id), shallow);

    const handleConnect = (params) => {
        connect(params.source, params.target, params.targetHandle, params.sourceHandle);
        updateDependents(params);
    };

    const getGateSymbol = (type) => {
        switch (type) {
            case 'sr':
                return '▷-CLK 🔒 SR Flip';
            case 'jk':
                return '▷-CLK 🔒 JK Flip';
            case 'fa':
                return '+ Full Adder'
            default:
                return 'Unknown';
        }
    };

    // Styles
    const containerStyles = {
        width: '100px',
        height: '80px',
        padding: '5px',
        border: '1px solid #FF69B4',
        borderRadius: '5px',
        backgroundColor: '#FF69B4', 
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    };

    const handleStyles = {
        backgroundColor: "#61dafb",
        border: "1px solid #20232a",
        width: "10px",
        height: "10px",
        borderRadius: "30%",
    };

    const textStyles = {
        color: '#fff',
        fontSize: '12px',
        fontWeight: 'bold',
        textShadow: '0px 0px 3px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        margin: '0 auto'
    };

    return (
        <div style={containerStyles}>

            <Handle
                type="target"
                position={Position.Left}
                id="inputa1"
                style={{ ...handleStyles, top: '20%' }}
            />
            <Handle
                type="target"
                position={Position.Left}
                id="inputa2"
                style={{ ...handleStyles, top: '50%' }}
            />
            <Handle
                type="target"
                position={Position.Left}
                id="inputa3"
                style={{ ...handleStyles, top: '80%' }}
            />

            <div style={textStyles}>{getGateSymbol(type)}</div>

            <Handle
                type="source"
                position={Position.Right}
                id="output1"
                style={{ ...handleStyles, top: '30%' }}
                onConnect={handleConnect}
            />
            <Handle
                type="source"
                position={Position.Right}
                id="output2"
                style={{ ...handleStyles, top: '70%' }}
                onConnect={handleConnect}
            />
        </div>
    );
}

export default flipflop;