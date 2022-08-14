import React from "react";

import SpendInfoCard from "../components/SpendInfoCard";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE } from '../../shared/utils/validators'
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
                <Input 
                    type='text'
                    label='Name'
                    placeholder='Your name here'
                    errorText='Please enter an input'
                    validators={[VALIDATOR_REQUIRE()]}
                    width='90%'
                />

            </div>
            <div className="dashboard-second-column">
                Second column here!
            </div>
        </div>
    )
}