import React, { useState, useContext } from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/utils/validators"
import useForm from "../../shared/hooks/form-hook";
import { MyAuthContext } from "../../shared/context/auth-context";
import "./Auth.css";

export default function Auth(){

    const auth = useContext(MyAuthContext);

    const [isLoginMode, setIsLoginMode] = useState(false);

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

    function authSubmitHandler(event){
        event.preventDefault();
        console.log(formState.inputs);
        auth.login();
        //TODO submit to backend, and different for login and signup
    }


    return (
        <div className="authentication--container">
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
    )
}