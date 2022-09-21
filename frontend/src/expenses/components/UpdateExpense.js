import React, { useEffect, useState, useContext } from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_REQUIRE } from "../../shared/utils/validators";
import useForm from "../../shared/hooks/form-hook";
import { MyAuthContext } from "../../shared/context/auth.context";
import useCustomFetch from "../../shared/hooks/fetch-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import "./ExpenseForm.css";


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

// pass on the id to the UpdateExpense props...pass on value as a number in an object
export default function UpdateExpense(props){

    const {isLoading, error, sendRequest, clearError} = useCustomFetch();

    const auth = useContext(MyAuthContext);
    // const [isLoading, setIsLoading] = useState(true);
    const [loadedExpense, setLoadedExpense] = useState();
    

    const [formState, inputHandler, toggleHandler, setInitialFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        amount: {
            value: '',
            isValid: false
        },
        type: {
            value: '',
            isValid: false
        },
        date: {
            value: '',
            isValid: false
        },
        recurring: {
            isRecurring: false,
            isValid: true
        }
    }, 
    false
    );


    // const identifiedExpense = DUMMY_EXPENSE_DATA.find(ele => ele.id === props.expenseId);

    useEffect(() => {
        (async() => {
            const responseData = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}api/v1/expenses/getExpense`,
                'POST',
                JSON.stringify({
                    userId: auth.userId,
                    expenseId: props.expenseId 
                }),
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + auth.token
                }
            )
            // console.log(responseData);
            setLoadedExpense(responseData);

            setInitialFormData({
                title: {
                    value: responseData.expenseData.title,
                    isValid: true
                },
                amount: {
                    value: responseData.expenseData.amount,
                    isValid: true
                },
                type: {
                    value: responseData.expenseData.type,
                    isValid: true
                },
                date: {
                    value: responseData.expenseData.date.split('T')[0],
                    isValid: true
                },
                recurring: {
                    isRecurring: responseData.expenseData.recurring,
                    isValid: true
                }
            }, 
            true);

            
        })()
    }, [sendRequest, props.expenseId, setInitialFormData]);

    // useEffect(()=> {
    //     if(identifiedExpense){
    //         setInitialFormData({
    //             title: {
    //                 value: identifiedExpense.title,
    //                 isValid: true
    //             },
    //             amount: {
    //                 value: identifiedExpense.amount,
    //                 isValid: true
    //             },
    //             type: {
    //                 value: identifiedExpense.type,
    //                 isValid: true
    //             },
    //             date: {
    //                 value: identifiedExpense.date,
    //                 isValid: true
    //             },
    //             recurring: {
    //                 isRecurring: identifiedExpense.recurring,
    //                 isValid: true
    //             }
    //         }, 
    //         true);
    //     }

    //     setIsLoading(false);
    // }, [setInitialFormData, identifiedExpense])

    if(!loadedExpense && !error){
        return(
            <div className="center">
                No expense found, sorry
            </div>
        )
    }

    // if(isLoading){
    //     return (
    //         <div className="center">
    //             <h2>Loading...</h2>
    //         </div>
    //     )
    // }

    async function expenseUpdateFormSubmit(event){
        event.preventDefault();
        // console.log(formState);
        
        
        // TODO post request to backend
        try{
            await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}api/v1/expenses/update`,
                'PUT',
                JSON.stringify({
                    userId: auth.userId,
                    expenseId: props.expenseId,
                    title: formState.inputs.title.value,
                    amount: formState.inputs.amount.value,
                    recurring: formState.inputs.recurring.isRecurring,
                    type: formState.inputs.type.value,
                    date: formState.inputs.date.value
                }),
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + auth.token
                }
            );

            props.reloadPage(); // to reload the expenses on the page
            
        } catch(err){}

        props.handleFormSubmit(); // to close the modal
        
    }


    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}
            {!isLoading && loadedExpense && 
            <form className="place-form" onSubmit={expenseUpdateFormSubmit}>
                <Input 
                    id='title'
                    type='text'
                    label="Title"
                    placeholder='Expense title'
                    errorText='Please enter a title'
                    validators={[VALIDATOR_REQUIRE()]}
                    width='100%'
                    onInput={inputHandler}
                    initialValue={formState.inputs.title.value}
                    initialIsValid={formState.inputs.title.isValid}
                />
                <Input 
                    id='amount'
                    type='number'
                    label="Amount"
                    placeholder='Expense amount'
                    errorText='Please enter a valid number'
                    validators={[VALIDATOR_REQUIRE()]}
                    width='100%'
                    onInput={inputHandler}
                    initialValue={formState.inputs.amount.value}
                    initialIsValid={formState.inputs.amount.isValid}
                />
                <Input 
                    id='type'
                    type='text'
                    label="Type"
                    placeholder='Expense type'
                    errorText='Please enter a valid number'
                    validators={[VALIDATOR_REQUIRE()]}
                    width='100%'
                    onInput={inputHandler}
                    initialValue={formState.inputs.type.value}
                    initialIsValid={formState.inputs.type.isValid}
                />
                <Input 
                    id='date'
                    type='date'
                    label="Date"
                    placeholder='Expense'
                    errorText='Please enter a valid date'
                    validators={[VALIDATOR_REQUIRE()]}
                    width='100%'
                    onInput={inputHandler}
                    initialValue={formState.inputs.date.value}
                    initialIsValid={formState.inputs.date.isValid}
                />
                <div className="recurring-container">
                    <label htmlFor="recurring">Recurring  </label>
                    <input 
                        id='recurring' 
                        type='checkbox'
                        checked={formState.inputs.recurring.isRecurring}
                        onChange={toggleHandler}
                    />
                </div>
                <div className="btn-container">
                    <div
                        className="delete-btn center"
                        onClick={props.showDeleteWarningHandler}
                    >Delete</div>
                    <Button 
                        type='submit'
                        width='100%'
                        disabled={!formState.isValid}
                    > Update </Button>
                </div>
            </form>}
        </React.Fragment>
    )
}