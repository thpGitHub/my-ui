import { jsx as _jsx } from "react/jsx-runtime";
import React, { useState } from 'react';
const DangerButton = ({ children = 'DangerButton' })=>{
    const [hover, setHover] = useState(false);
    const buttonStyle = {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        margin: '5px',
        backgroundColor: hover ? 'white' : 'red',
        color: hover ? 'red' : 'white',
        transition: 'background-color 0.3s ease, color 0.3s ease'
    };
    return /*#__PURE__*/ _jsx("button", {
        style: buttonStyle,
        onMouseEnter: ()=>setHover(true),
        onMouseLeave: ()=>setHover(false),
        children: children
    });
};
export default DangerButton;
