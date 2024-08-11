import React from "react";
import { Handle, Position } from "@xyflow/react";
import { shallow } from "zustand/shallow";
import { useStore } from "../store";

import SevenSeg from '../assets/SevenSegment.ttf';

const SegDisp = ({id, data}) => {
    const { getNodeData } = useStore();
    const o1 = getNodeData(id, 'inputa1');
    const o2 = getNodeData(id, 'inputa2');
    const o3 = getNodeData(id, 'inputa3');
    const o4 = getNodeData(id, 'inputa4');


    let b1;
    if (o1 === 3){
        b1 = 0;
    } else{b1 = o1 }
    let b2;
    if (o2 === 3){
        b2 = 0;
    } else{b2 = o2 }
    let b3;
    if (o3 === 3){
        b3 = 0;
    } else{b3 = o3 }
    let b4;
    if (o4 === 3){
        b4 = 0;
    } else{b4 = o4 }

    const str = [];
    str.push(b1);
    str.push(b2);
    str.push(b3);
    str.push(b4);

    const binary = str.join('');
    const ten = binary === '0000' ? 0 : parseInt(binary, 2);
    const hex = isNaN(ten) ? '0' : ten.toString(16).toUpperCase();


    const handleStyles = {
        backgroundColor: "#61dafb",
        border: "1px solid #20232a",
        width: "10px",
        height: "10px",
        borderRadius: "30%",
    };

    const segDisplayStyles = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        height: "80px",
        border: "1px solid #20232a",
        borderRadius: "10px",
        backgroundColor: "#1e1e1e",
      };
    
      const segmentStyles = {
        width: "20px",
        height: "10px",
        borderRadius: "5px",
        backgroundColor: "#61dafb",
      };


    return (
        <>
        <div style={segDisplayStyles}>

            <div style={{ marginTop: "0px" }}>
            <p style={{ color: "#BA0021", fontSize: "48px"}}>{hex}</p>
            </div>

            <Handle
            type="target"
            position={Position.Left}
            id="inputa1"
            style={{ ...handleStyles, top:'0%'}}
            />
            <Handle
            type="target"
            position={Position.Left}
            id="inputa2"
            style={{ ...handleStyles, top:'30%'}}
            />
            <Handle
            type="target"
            position={Position.Left}
            id="inputa3"
            style={{ ...handleStyles, top:'70%'}}
            />
            <Handle
            type="target"
            position={Position.Left}
            id="inputa4"
            style={{ ...handleStyles, top:'100%'}}
            />

        </div>
        
        </>
    );

}

export default SegDisp;