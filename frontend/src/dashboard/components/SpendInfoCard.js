import React from "react";

import "./SpendInfoCard.css";

export default function SpendInfoCard(props){
    return (
        <div className={`card-container ${props.inverse && 'inverse'}`}>
            <div className="icons-container">
                <img src={`/icons/${props.light ? "money" : "wallet"}.png`} width={50} alt='icon'/>
            </div>
            <div className="info-container">
                <p className="info-container__title">{props.title}</p>
                <p className="info-container__value">₹{props.value}</p>
            </div>
        </div>
    )
}