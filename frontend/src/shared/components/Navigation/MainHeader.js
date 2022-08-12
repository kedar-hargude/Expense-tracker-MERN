import React from "react";

import "./MainHeader.css";

export default function MainHeader(props){
    return(
        <div className="main-header">
            {props.children}
        </div>
    )
}