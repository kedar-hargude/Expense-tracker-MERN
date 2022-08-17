import { useCallback, useReducer } from 'react';

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


export default function useForm(initialInputs, initialFormValidity){

    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: initialFormValidity
    });

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
    };

    return [formState, inputHandler, toggleHandler];

}