import React from "react";

import "./Button.css"

export default function Button(props){
    return(
        <button
            className={`button 
            ${props.danger && 'button--danger'}
            ${props.plain && 'button--plain'}
            `}
            type={props.type}
            onClick={props.onClick}
            disabled={props.disabled}
            style={{width: `${props.width}`}}
        >
            {props.children}
        </button>
    )
}