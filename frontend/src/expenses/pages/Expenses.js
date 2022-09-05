import React, { useEffect, useState, useContext } from "react";

import ExpenseList from "../components/ExpenseList";
import useCustomFetch from "../../shared/hooks/fetch-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { MyAuthContext } from "../../shared/context/auth.context";

/* dummy individual database info:

    {
        id: 3452345,
        name: Kedar,
        mobile-number: 1234567891,
        email: xyz@gmail.com,
        password: abcd123,
        expenses: [
            {
                id: 1234123,
                title: 'Mobile phone',
                amount: 1000,
                recurring: false,
                type: 'Mobile',
                date: '2022-08-15'
            }
        ]
    }

*/
const DUMMY_EXPENSE_DATA = [
    {
        id: 1234123,
        title: 'Mobile phone',
        amount: 1000,
        recurring: false,
        type: 'Mobile',
        date: '2022-08-15'
    },
    {
        id: 23462456,
        title: 'Scrimba subscription',
        amount: 100,
        recurring: true,
        type: 'Entertainment',
        date: '2022-08-15' 
    },
    {
        id: 23452345234523452345234523,
        title: 'Frontend Masters subscription',
        amount: 100,
        recurring: true,
        type: 'Entertainment',
        date: '2022-08-15' 
    }
];

export default function Expense(){

    const auth = useContext(MyAuthContext);

    const items = DUMMY_EXPENSE_DATA;
    const {isLoading, error, sendRequest, clearError} = useCustomFetch();
    const [loadedUserData, setLoadedUserData] = useState();

    useEffect(() => {
        (async () => {
            try{
                const responseData = await sendRequest(
                    'http://localhost:5000/api/v1/expenses', 
                    'POST',
                    JSON.stringify({
                        userId: auth.userId
                    }),
                    {
                        'Content-Type': 'application/json'
                    }
                );
                console.log(responseData)
                setLoadedUserData(responseData);
                
            } catch(err){}

        })();
    }, []);

    // // TODO sort arrays in backend, learn and use js date everything
    // const items = [];
    // if(loadedUserData){
    //     items = loadedUserData.data.expenses.map(expense => ({
    //         ...expense,
    //         date: expense.date.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})
    //     }))
    // }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}
            {!isLoading && loadedUserData && 
                <ExpenseList 
                    items={items}
                    sendRequest={sendRequest}
                />
            }
        </React.Fragment>
    )
}