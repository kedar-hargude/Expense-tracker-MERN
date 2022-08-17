import React from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_REQUIRE } from "../../shared/utils/validators";
import useForm from "../../shared/hooks/form-hook";
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


    const [formState, inputHandler, toggleHandler] = useForm({
        title: {
            value: identifiedExpense.title,
            isValid: true
        },
        amount: {
            value: identifiedExpense.amount,
            isValid: true
        },
        type: {
            value: identifiedExpense.type,
            isValid: true
        },
        date: {
            value: identifiedExpense.date,
            isValid: true
        },
        recurring: {
            isRecurring: identifiedExpense.recurring,
            isValid: true
        }
    }, 
    true
    );


    if(!identifiedExpense){
        return(
            <div className="center">
                No expense found, sorry
            </div>
        )
    }

    function handleFormSubmit(event){
        event.preventDefault();
        console.log(formState);
        props.handleFormSubmit(); // to close the modal
        // TODO post request to backend
    }


    return (
        <form className="place-form" onSubmit={handleFormSubmit}>
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
            <Button 
                type='submit'
                width='100%'
                disabled={!formState.isValid}
            > Update </Button>
        </form>
    )
}