import React, { useContext } from "react";

import SpendInfoCard from "../components/SpendInfoCard";
import { MyAuthContext } from "../../shared/context/auth-context";
import Modal from "../../shared/components/UIElements/Modal";
import HomePage from "../components/HomePage";
import "./Dashboard.css"

export default function Dashboard(){

    const auth = useContext(MyAuthContext);

    if(!auth.isLoggedIn){
        return(
            <HomePage />
        )
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-first-column">
                <div className="spendInfo-cards-container">
                    <SpendInfoCard 
                    inverse 
                    title="Total Spending"
                    value="420.69"
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