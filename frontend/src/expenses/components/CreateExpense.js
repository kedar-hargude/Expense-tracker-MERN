import React, { useCallback, useReducer } from "react";

import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../shared/utils/validators";
import Button from "../../shared/components/FormElements/Button";
import "./ExpenseForm.css";

/*
    Title , amount , type , date , recurring... Add button
*/

function formReducer(state, action){

    switch (action.type){
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for (const inputId in state.inputs){
                if(!state.inputs[inputId]){
                    continue;
                }
                if(inputId === action.inputId){
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId] : {
                        value: action.value,
                        isValid: action.isValid
                    }
                },
                isValid: formIsValid
            }
        case 'TOGGLE_CHANGE':{
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    recurring: {
                        isRecurring: action.toggleValue,
                        isValid: true
                    }
                }
            }
        }
        default:
            return state
    }
}


export default function CreateExpense(props){

    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
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
        isValid: false
    })


    

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({ 
            type: 'INPUT_CHANGE', 
            inputId: id, 
            value: value,
            isValid: isValid
        })
    }, []);

    const toggleHandler = (event) => {
        dispatch ({
            type: 'TOGGLE_CHANGE',
            toggleValue: event.target.checked
        })
    }

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