import React, { useContext, useEffect, useState } from "react";

import SpendInfoCard from "../components/SpendInfoCard";
import { MyAuthContext } from "../../shared/context/auth.context";
import HomePage from "../components/HomePage";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import "./Dashboard.css"

export default function Dashboard(){

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [loadedUserData, setLoadedUserData] = useState();

    const auth = useContext(MyAuthContext);

    

    
    let totalExpenditure = 0;
    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try{
                const response = await fetch('http://localhost:5000/api/v1/expenses', {
                    method: 'POST',
                    body: JSON.stringify({
                        userId: "6308af341cfd923ada3dbc4a"
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const responseData = await response.json();
                if(!response.ok){
                    throw new Error(responseData.message);
                }

                setLoadedUserData(responseData);
                console.log(responseData);
                // console.log('loaded inside: ' + loadedUserData);
                // setIsLoading(false);
                
            } catch(err){
                setError(err.message);
                // setIsLoading(false);
            }   
          
            setIsLoading(false);
        })();
    }, []);

    // TODO spendcard calculation data to be added here
    if(loadedUserData){
        // console.log('Outside')
        loadedUserData.data.expenses.forEach(expense => {
            totalExpenditure += expense.amount;
        });
    }

    function errorHandler(){
        setError(null);
    }

    if(!auth.isLoggedIn){
        return(
            <HomePage />
        )
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={errorHandler} />
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