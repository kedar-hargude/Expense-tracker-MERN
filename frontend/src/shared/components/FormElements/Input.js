import React, { useEffect, useReducer } from "react";

import { validate } from "../../utils/validators";
import "./Input.css";

/*
    props: {
        id
        type='text'/'password'/'email'
        label="Name"
        placeholder='name here'
        errorText='Please enter correct input'
        validators={[{type: 'require'}, {type: 'min-length',value: 5}]}
        width='100%'
    }
*/

function inputReducer(state, action){
    switch(action.type){
        case 'CHANGE':
            return{
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            }
        case 'TOUCH':
            return{
                ...state,
                isTouched: true
            }
        default:
            return state;
    }
}

export default function Input(props){

    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue || '',
        isTouched: false,
        isValid: props.initialIsValid || false
    });

    const { id, onInput } = props;
    const { value, isValid } = inputState;

    useEffect(() => {
        onInput(id, value, isValid);
    }, [id, value, isValid, onInput]);

    function changeHandler(event){
        dispatch({
            type: 'CHANGE', 
            val: event.target.value,
            validators: props.validators
        })
    }

    function touchHandler(){
        dispatch({
            type: 'TOUCH'
        })
    }

    return (
        <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
            <label htmlFor={props.id}>{props.label}</label>
            <input
                id={props.id}
                type={props.type} 
                placeholder={props.placeholder}
                onChange={changeHandler}
                onBlur={touchHandler}
                value={inputState.value}
                style={{width: `${props.width}`}}
            />
            {!inputState.isValid && inputState.isTouched && 
                <p>{props.errorText}</p>}
        </div>
    )
}