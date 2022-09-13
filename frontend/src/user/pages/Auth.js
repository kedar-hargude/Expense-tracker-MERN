import React, { useState, useContext } from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/utils/validators"
import useForm from "../../shared/hooks/form-hook";
import useCustomFetch from "../../shared/hooks/fetch-hook";
import { MyAuthContext } from "../../shared/context/auth.context";
import "./Auth.css";

export default function Auth(){

    const auth = useContext(MyAuthContext);

    const [isLoginMode, setIsLoginMode] = useState(true);
    const {isLoading, error, sendRequest, clearError} = useCustomFetch();

    const [formState, inputHandler, , setInitialFormData] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false)

    function switchModeHandler(){
        if(!isLoginMode){
            setInitialFormData({
                ...formState.inputs,
                name: undefined
            }, 
            formState.inputs.email.isValid && formState.inputs.password.isValid);

        } else {
            setInitialFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            }, false);
        }
        setIsLoginMode(prevState => !prevState);
    }

    const authSubmitHandler = async (event) => {
        event.preventDefault();

        // setIsLoading(true);

        if(isLoginMode){
            // loggin existing user
            try{
                const responseData = await sendRequest(
                    'http://localhost:5000/api/v1/users/login', 
                    'POST', 
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    }),
                    {
                    'Content-Type': 'application/json'
                    }
                );
                auth.login(responseData.userData.id);
            } catch(err){
                // empty purposefully, setError already set in custom hook
            }

        } else {
            // signing a new user:
            try{
                const responseData = await sendRequest(
                    'http://localhost:5000/api/v1/users/signup', 
                    'POST',
                    JSON.stringify({
                        name: formState.inputs.name.value,
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    }), 
                    {
                        'Content-Type': 'application/json'
                    }
                );
                auth.login(responseData.userData.id);
            } catch(err){}
            
        }
        
        //TODO submit to backend, and different for login and signup
    }


    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <div className="authentication--container">
                {isLoading && <LoadingSpinner asOverlay />}
                <div className="authentication-form--container">
                    <form onSubmit={authSubmitHandler}>
                        <h2 className="center">
                            {isLoginMode ? 'Welcome Back!' : 'Create a new account'}
                        </h2>
                        <p className="center">Please enter your details</p>


                        {!isLoginMode && (
                            <div className="center">
                                <Input 
                                    id='name' 
                                    type='text' 
                                    label='Your Name' 
                                    validators={[VALIDATOR_REQUIRE()]} 
                                    errorText="Please enter a name"
                                    onInput={inputHandler}
                                    width='40vw'
                                />
                            </div>
                        )}
                        <div className="center">
                            <Input 
                                id='email' 
                                type='email'
                                label='E-Mail'
                                validators={[VALIDATOR_EMAIL()]}
                                errorText="Please enter a valid email"
                                onInput={inputHandler}
                                width='40vw'
                                initialIsValid={false}
                            />
                        </div>

                        <div className="center">
                            <Input
                                id='password'
                                type='password'
                                label='Password'
                                validators={[VALIDATOR_MINLENGTH(5)]}
                                errorText='Password greater than 5 characters!'
                                onInput={inputHandler}
                                width='40vw'
                            />
                        </div>

                        <div className="center">
                            <Button 
                            type="submit" 
                            disabled={!formState.isValid}
                            bold
                            >
                                {isLoginMode ? 'LOGIN' : 'SignUp'}
                            </Button>
                        </div>
                        


                    </form>

                    {/* <hr /> */}
                    <div className="switch center">
                        <Button 
                        plain 
                        onClick={switchModeHandler}
                        >
                            SWITCH TO {isLoginMode? 'SIGNUP': 'LOGIN'}
                        </Button>
                    </div>
                </div>

                
                <div className="image--container"></div>
            </div>
        </React.Fragment>
    )
}