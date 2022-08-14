import React, { useReducer } from "react";

import { validate } from "../../utils/validators";
import "./Input.css";

/*
    props: {
        id
        type='text'/'password'/'email'
        label="Name"
        placeholder='name here'
        errorText='Please enter correct input'
        validators=([{type: 'require'}, {type: 'min-length',value: 5}])
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
        value: '',
        isValid: false,
        isTouched: false
    })

    function changeHandler(event){
        dispatch({
            type: 'CHANGE', 
            val: event.target.value,
            validators: props.validators
        })
    }

    function touchHandler(){
        dispatch({
            type: 'TOUCH',
            isTouched: true
        })
    }

    return (
        <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
            <label htmlFor={props.id}>{props.label}</label>
            <input 
                type={props.type} 
                placeholder={props.placeholder}
                onChange={changeHandler}
                value={inputState.value}
                onBlur={touchHandler}
                style={{width: `${props.width}`}}
            />
            {!inputState.isValid && inputState.isTouched && 
                <p className="error">{props.errorText}</p>}
        </div>
    )
}