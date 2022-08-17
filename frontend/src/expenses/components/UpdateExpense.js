import React, {useReducer , useCallback } from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_REQUIRE } from "../../shared/utils/validators";
import "./ExpenseForm.css";


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

// pass on the id to the UpdateExpense props...pass on value as a number in an object
export default function UpdateExpense(props){

    const identifiedExpense = DUMMY_EXPENSE_DATA.find(ele => ele.id === props.id);

    if(!identifiedExpense){
        return(
            <div className="center">
                No expense found, sorry
            </div>
        )
    }


    return (
        <form className="place-form">
            <Input 
                id='title'
                type='text'
                label="Title"
                placeholder='Expense title'
                errorText='Please enter a title'
                validators={[VALIDATOR_REQUIRE()]}
                width='100%'
                onInput={()=> {}}
                initialValue={identifiedExpense.title}
                initialIsValid={true}
                />
            <Input 
                id='amount'
                type='number'
                label="Amount"
                placeholder='Expense amount'
                errorText='Please enter a valid number'
                validators={[VALIDATOR_REQUIRE()]}
                width='100%'
                onInput={()=> {}}
                initialValue={identifiedExpense.amount}
                initialIsValid={true}
            />
            <Input 
                id='type'
                type='text'
                label="Type"
                placeholder='Expense type'
                errorText='Please enter a valid number'
                validators={[VALIDATOR_REQUIRE()]}
                width='100%'
                onInput={()=> {}}
                initialValue={identifiedExpense.type}
                initialIsValid={true}
            />
            <Input 
                id='date'
                type='date'
                label="Date"
                placeholder='Expense'
                errorText='Please enter a valid date'
                validators={[VALIDATOR_REQUIRE()]}
                width='100%'
                onInput={()=> {}}
                initialValue={identifiedExpense.date}
                //date in yyyy-mm-dd
                initialIsValid={true}
            />
            <div className="recurring-container">
                <label htmlFor="recurring">Recurring  </label>
                <input 
                    id='recurring' 
                    type='checkbox' 
                    checked={identifiedExpense.recurring}
                />
            </div>
            <Button 
                type='submit'
                width='100%'
                disabled={true}
            > Update </Button>
        </form>
    )
}