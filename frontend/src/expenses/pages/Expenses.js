import React, { useEffect, useState, useContext, useCallback } from "react";

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
// const DUMMY_EXPENSE_DATA = [
//     {
//         id: 1234123,
//         title: 'Mobile phone',
//         amount: 1000,
//         recurring: false,
//         type: 'Mobile',
//         date: '2022-08-15'
//     },
//     {
//         id: 23462456,
//         title: 'Scrimba subscription',
//         amount: 100,
//         recurring: true,
//         type: 'Entertainment',
//         date: '2022-08-15' 
//     },
//     {
//         id: 23452345234523452345234523,
//         title: 'Frontend Masters subscription',
//         amount: 100,
//         recurring: true,
//         type: 'Entertainment',
//         date: '2022-08-15' 
//     }
// ];

export default function Expense(){

    const auth = useContext(MyAuthContext);

    // const items = DUMMY_EXPENSE_DATA;
    const {isLoading, error, sendRequest, clearError} = useCustomFetch();
    const [loadedUserData, setLoadedUserData] = useState();
    const [pageReloader, setPageReloader] = useState(false);

    useEffect(() => {
        (async () => {
            try{
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}api/v1/expenses`, 
                    'POST',
                    JSON.stringify({
                        userId: auth.userId
                    }),
                    {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + auth.token
                    }
                );
                setLoadedUserData(responseData);
                
            } catch(err){}

        })();
    }, [pageReloader]);

    // // TODO sort arrays in backend, learn and use js date everything
    let items;
    if(loadedUserData){
        // items = [...loadedUserData.userData.expenses];
        // incoming date is a string here
        // console.log(loadedUserData.userData.expenses[0].date);
        items = loadedUserData.userData.expenses.map(expense => {
            expense.date = expense.date.split('T')[0];
            const day = expense.date.split('-')[2];
            const month = expense.date.split('-')[1];
            const year = expense.date.split('-')[0];
            const formattedDate = `${day}-${month}-${year}`
            return {...expense,
            date: formattedDate
            }
        });
    }
    // if(loadedUserData){
    //     items = loadedUserData.data.expenses.map(expense => ({
    //         ...expense,
    //         date: expense.date
    //         // date: expense.date.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})
    //     }))
    // }

    // to reload all the expenses on the page on create, update or delete an expense
    const reloadPage = useCallback(() => {
        setPageReloader(prevState => !prevState);
    }, []);

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}
            {!isLoading && loadedUserData && 
                <ExpenseList 
                    items={items}
                    sendRequest={sendRequest}
                    reloadPage={reloadPage}
                />
            }
        </React.Fragment>
    )
}