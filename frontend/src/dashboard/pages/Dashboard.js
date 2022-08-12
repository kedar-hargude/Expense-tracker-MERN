import React from "react";

import SpendInfoCard from "../components/SpendInfoCard";
import "./Dashboard.css"

export default function Dashboard(){
    return (
        <div className="dashboard-container">
            <div className="dashboard-first-column">
                <div className="spendInfo-cards-container">
                    <SpendInfoCard 
                    inverse 
                    title="Total Spending"
                    value="420.69"
                    // not 'light'
                    />
                    <SpendInfoCard 
                    title="Monthly Spending"
                    value="210"
                    />
                    <SpendInfoCard 
                    title="Daily Spending"
                    value="15"
                    light
                    />
            </div>
                First column here!
            </div>
            <div className="dashboard-second-column">
                Second column here!
            </div>
        </div>
    )
}