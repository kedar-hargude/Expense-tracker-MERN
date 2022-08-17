import React from "react";

import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../shared/utils/validators";
import Button from "../../shared/components/FormElements/Button";
import useForm from "../../shared/hooks/form-hook";
import "./ExpenseForm.css";

/*
    Title , amount , type , date , recurring... Add button
*/



export default function CreateExpense(props){

    const [formState, inputHandler, toggleHandler] = useForm({
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


    

    function handleFormSubmit(event){
        event.preventDefault();
        console.log(formState);
        props.handleFormSubmit();
        // TODO post request to backend
    }


    return(
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
            />
            <div className="recurring-container">
                <label htmlFor="recurring">Recurring  </label>
                <input 
                    id='recurring' 
                    type='checkbox' 
                    onChange={toggleHandler} 
                />
            </div>
            <Button 
                type='submit'
                width='100%'
                disabled={!formState.isValid}
            > Add</Button>
        </form>
    )
}