import React, { useContext, useEffect, useState } from "react";

import SpendInfoCard from "../components/SpendInfoCard";
import { MyAuthContext } from "../../shared/context/auth.context";
import HomePage from "../components/HomePage";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import useCustomFetch from "../../shared/hooks/fetch-hook";
import "./Dashboard.css"

export default function Dashboard(){

    const {isLoading, error, sendRequest, clearError} = useCustomFetch();
    const [loadedUserData, setLoadedUserData] = useState();

    const auth = useContext(MyAuthContext);
    
    useEffect(() => {
        (async () => {
            try{
                const responseData = await sendRequest(
                    'http://localhost:5000/api/v1/expenses', 
                    'POST',
                    JSON.stringify({
                        userId: "6308af341cfd923ada3dbc4a"
                    }),
                    {
                        'Content-Type': 'application/json'
                    }
                );
                console.log('inside')
                setLoadedUserData(responseData);
                
            } catch(err){}

        })();
    }, [sendRequest]);

    // TODO spendcard calculation data to be added here
    let totalExpenditure = 0;
    
    if(loadedUserData){
        // console.log('Outside')
        loadedUserData.data.expenses.forEach(expense => {
            totalExpenditure += expense.amount;
        });
    }


    if(!auth.isLoggedIn){
        return(
            <HomePage />
        )
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {!isLoading && loadedUserData && <div className="dashboard-container">
            {isLoading && <LoadingSpinner asOverlay />}
                <div className="dashboard-first-column">
                    <div className="spendInfo-cards-container">
                        <SpendInfoCard 
                        inverse 
                        title="Total Spending"
                        value={totalExpenditure}
                        // value="420.69"
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
            </div>}
        </React.Fragment>
    )
}