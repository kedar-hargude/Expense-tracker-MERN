import React, { useContext, useEffect, useState } from "react";

import SpendInfoCard from "../components/SpendInfoCard";
import { MyAuthContext } from "../../shared/context/auth.context";
import HomePage from "../components/HomePage";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import useCustomFetch from "../../shared/hooks/fetch-hook";
import RecentExpenses from "../components/RecentExpenses";
import RecurringExpenses from "../components/RecurringExpenses";
import Chart from "../components/Chart";
import "./Dashboard.css"

export default function Dashboard(){
    const {isLoading, error, sendRequest, clearError} = useCustomFetch();
    const [loadedUserData, setLoadedUserData] = useState();

    const auth = useContext(MyAuthContext);
    
    useEffect(() => {
        (async () => {
            if(auth.isLoggedIn){
                try{
                    const responseData = await sendRequest(
                        'http://localhost:5000/api/v1/expenses', 
                        'POST',
                        JSON.stringify({
                            userId: auth.userId
                        }),
                        {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + auth.token
                        }
                    );
                    // console.log('inside')
                    setLoadedUserData(responseData);
                } catch(err){}
            }  

        })();
    }, [sendRequest]);

    // TODO spendcard calculation data to be added here
    let totalExpenditure = 0;
    let monthlyExpenditure= 0;
    let dailyExpenditure= 0;

    let firstThreeExpenses = [];
    let recurringExpenses = [];

    let monthlySpends;
    if(loadedUserData){
        // console.log('Outside')
        // console.log(loadedUserData);
        // Total expenses:
        loadedUserData.userData.expenses.forEach(expense => {
            totalExpenditure += expense.amount;
        });

        const now = new Date();
        // console.log(now);
        // console.log(now.getFullYear());
        // console.log(now.getMonth());
        // console.log(now.getDate());

        function compareYear(checkDate){
            return now.getFullYear().toString().padStart(2, '0') === checkDate.split('T')[0].split('-')[0]; 
        }
        
        function compareMonth(checkDate){
            // console.log((now.getMonth() + 1).toString().padStart(2, '0'));
            // console.log(checkDate.split('T')[0].split('-')[1]);
            return (now.getMonth() + 1).toString().padStart(2, '0') === checkDate.split('T')[0].split('-')[1]; 
        }
        
        function compareDay(checkDate){
            return now.getDate().toString() === checkDate.split('T')[0].split('-')[2]; 
        }

        monthlySpends = loadedUserData.userData.expenses.filter(expense => 
            compareYear(expense.date) && compareMonth(expense.date));
        // console.log(monthlySpends);
        // Monthly expenses:
        monthlySpends.forEach(expense => {
            monthlyExpenditure += expense.amount;
        })

        const dailySpends = loadedUserData.userData.expenses.filter(expense => 
            compareYear(expense.date) && compareMonth(expense.date) && compareDay(expense.date));
        // console.log(dailySpends);
        // Daily expenses:
        dailySpends.forEach(expense => {
            dailyExpenditure += expense.amount;
        })

        if(loadedUserData.userData.expenses.length !== 0){
            const {expenses} = loadedUserData.userData;
            firstThreeExpenses.push(expenses[0]);

            expenses[1] && firstThreeExpenses.push(expenses[1]);

            expenses[2] && firstThreeExpenses.push(expenses[2]);
            
        } else {
            firstThreeExpenses = [{
                id:1,
                title: 'Please add a new expense',
                type: '-',
                amount: 0,
                date: '0000-00-00'
            }]
        }

        if(loadedUserData.userData.expenses.length !== 0){
            recurringExpenses = loadedUserData.userData.expenses.filter(expense => expense.recurring);
        } else {
            recurringExpenses = [{
                id:1,
                title: 'Please add a new expense',
                type: '-',
                amount: 0,
                date: '0000-00-00'
            }]
        }
        
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
                {/* First column here */}
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
                        value={monthlyExpenditure}
                        />
                        <SpendInfoCard 
                        title="Daily Spending"
                        value={dailyExpenditure}
                        light
                        />
                    </div>
                    
                    <div className='chart-container'>
                        <h3>Recent Expenses Chart:</h3>
                        <Chart data={monthlySpends.reverse()} />
                    </div>

                    <div className="recent-expenses-container">
                        <RecentExpenses items={firstThreeExpenses} />
                    </div>
                    
                </div>

                {/* Second Column here */}
                <div className="dashboard-second-column">
                    <div className="recurring-expenses-container">
                        <RecurringExpenses items={recurringExpenses} />
                    </div>
                </div>
                
            </div>}
        </React.Fragment>
    )
}