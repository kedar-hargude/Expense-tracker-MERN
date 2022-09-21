import React, { useEffect, useState, useContext, useCallback } from "react";

import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from "../../shared/utils/validators";
import Button from "../../shared/components/FormElements/Button";
import useForm from "../../shared/hooks/form-hook";
import useCustomFetch from "../../shared/hooks/fetch-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { MyAuthContext } from "../../shared/context/auth.context";
import "./SettingsForm.css";

// dummy individual database info:

    // const DUMMY_USER_DATA = {
    //     id: 3452345,
    //     name: 'Kedar',
    //     lastName: 'Hargude',
    //     dateOfBirth: '1996-12-26',
    //     mobileNumber: 1234567890,
    //     email: 'xyz@gmail.com',
    //     password: 'abcd123',
    //     expenses: [
    //         {
    //             id: 1234123,
    //             title: 'Mobile phone',
    //             amount: 1000,
    //             recurring: false,
    //             type: 'Mobile',
    //             date: '2022-08-15'
    //         }
    //     ]
    // };

export default function SettingsForm(props){
    // TODO add password reset functionality through email if password was forgotten

    const {isLoading, error, sendRequest, clearError} = useCustomFetch();
    const auth = useContext(MyAuthContext);
    const [loadedUser, setLoadedUser] = useState();
    const [pageReloader, setPageReloader] = useState(false);
    // const [isLoading, setIsLoading] = useState(true);
    const [passwordError, setPasswordError] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);

    const [formState, inputHandler , , setInitialFormData] = useForm({
        name: {
            value: '',
            isValid: false
        },
        lastName: {
            value: '',
            isValid: false
        },
        dateOfBirth: {
            value: '',
            isValid: false
        },
        mobileNumber: {
            value: '',
            isValid: false
        },
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        },
        confirmPassword: {
            value: '',
            isValid: false
        }
    },
    false
    );

    // const currentUserInfo = DUMMY_USER_DATA;

    useEffect(() => {
        (async() => {
            const responseData = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}api/v1/users/getUser`,
                'POST',
                JSON.stringify({
                    userId: auth.userId
                }),
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + auth.token
                }
            )
        
            setLoadedUser(responseData);

            setInitialFormData({
                name: {
                    value: responseData.userData.name,
                    isValid: true
                },
                lastName: {
                    value: responseData.userData.lastName || '',
                    isValid: true
                },
                dateOfBirth: {
                    // value: responseData.userData.dateOfBirth.split('T')[0] || '',
                    value: (() => {
                        if(!responseData.userData.dateOfBirth){
                            return ''
                        } else {
                            return responseData.userData.dateOfBirth.split('T')[0]
                        }
                    })(),
                    isValid: true
                },
                mobileNumber: {
                    value: responseData.userData.mobileNumber || '',
                    isValid: true
                },
                email: {
                    value: responseData.userData.email,
                    isValid: true
                },
                password: {
                    value: '',
                    isValid: true
                },
                confirmPassword: {
                    value: '',
                    isValid: true
                }
            }, true)

        })()
    }, [sendRequest, setInitialFormData, pageReloader]);

    // useEffect(() => {
    //     setInitialFormData({
    //         name: {
    //             value: DUMMY_USER_DATA.name,
    //             isValid: true
    //         },
    //         lastName: {
    //             value: DUMMY_USER_DATA.lastName,
    //             isValid: true
    //         },
    //         dateOfBirth: {
    //             value: DUMMY_USER_DATA.dateOfBirth,
    //             isValid: true
    //         },
    //         mobileNumber: {
    //             value: DUMMY_USER_DATA.mobileNumber,
    //             isValid: true
    //         },
    //         email: {
    //             value: DUMMY_USER_DATA.email,
    //             isValid: true
    //         },
    //         password: {
    //             value: '',
    //             isValid: false
    //         },
    //         confirmPassword: {
    //             value: '',
    //             isValid: false
    //         }
    //     }, false)

    //     // setIsLoading(false);
    // }, [setInitialFormData, currentUserInfo])


    

    const reloadPage = useCallback(() => {
        setPageReloader(prevState => !prevState);
    }, []);

    async function settingsFormSubmitHandler(event){
        setPasswordError(false);
        setSuccessMessage(false);
        event.preventDefault();
        if(formState.inputs.password.value !== formState.inputs.confirmPassword.value){
            return setPasswordError(true);
        }
        // console.log(formState);
        //TODO submit info to backend
        
        try{
            // change request body if password field is entered.
            let requestBodyOptions;
            if(formState.inputs.password.value){
                requestBodyOptions = {
                    userId: auth.userId,
                    name: formState.inputs.name.value,
                    lastName: formState.inputs.lastName.value,
                    mobileNumber: formState.inputs.mobileNumber.value,
                    email: formState.inputs.email.value,
                    dateOfBirth: formState.inputs.dateOfBirth.value,
                    password: formState.inputs.password.value
                }
            } else{
                requestBodyOptions = {
                    userId: auth.userId,
                    name: formState.inputs.name.value,
                    lastName: formState.inputs.lastName.value,
                    mobileNumber: formState.inputs.mobileNumber.value,
                    email: formState.inputs.email.value,
                    dateOfBirth: formState.inputs.dateOfBirth.value
                }
            }

            await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}api/v1/users/update`,
                'PUT',
                JSON.stringify(requestBodyOptions),
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + auth.token
                }
            )

            setSuccessMessage(true);
            reloadPage();

        } catch(err){}

        setTimeout(() => {
            setSuccessMessage(false);
        }, 1500);
    }

    if(!loadedUser){
        return(
            <LoadingSpinner asOverlay />
        )
    }

    //TODO change initialIsValid values depending on what all values you get during new user sign-up
    return(
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}
            {!isLoading && loadedUser && 
            <form className="settings-form__container" onSubmit={settingsFormSubmitHandler}>
            <h2>Account Information</h2> 
            <p>Update your account information</p>
            <div className="inputs-container">
                    <Input
                        id='firstName'
                        type='text'
                        label='First name'
                        errorText='Please enter your name'
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                        width='40vw'
                        initialValue={formState.inputs.name.value}
                        initialIsValid={true}
                        />
                    <Input
                        id='lastName' 
                        type='text'
                        label='Last name'
                        errorText='Please enter your last name'
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                        width='40vw'
                        initialValue={formState.inputs.lastName.value}
                        initialIsValid={true}
                    />
            </div>
            <div className="inputs-container">
                    <Input
                        id='dateOfBirth'
                        type='date'
                        label='Date of Birth'
                        errorText='Please enter a valid date'
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                        width='40vw'
                        initialValue={formState.inputs.dateOfBirth.value}
                        initialIsValid={true}
                    />
                    <Input
                        id='mobileNumber' 
                        type='number'
                        label='Mobile Number'
                        errorText='Please enter your 10 digit mobile number'
                        validators={[VALIDATOR_MINLENGTH(9)]}
                        onInput={() => {}}
                        width='40vw'
                        initialValue={formState.inputs.mobileNumber.value}
                        initialIsValid={true}
                    />
            </div>
            <Input
                    id='email' 
                    type='email'
                    label='Email'
                    errorText='Please enter a valid email id'
                    validators={[VALIDATOR_EMAIL()]}
                    onInput={inputHandler}
                    width='82vw'
                    initialValue={formState.inputs.email.value}
                    initialIsValid={true}
                />
                <div className="inputs-container">
                    <Input
                        id='password'
                        type='password'
                        label='Update Password (If you want to update)'
                        errorText='Please enter a password greater than 5 digits'
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        onInput={inputHandler}
                        width='40vw'
                        // initialValue={DUMMY_USER_DATA.password}
                        initialIsValid={false}
                    />
                    <Input
                        id='confirmPassword'
                        type='password'
                        label='Confirm Update Password'
                        errorText='Please enter a password greater than 5 digits'
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        onInput={inputHandler}
                        width='40vw'
                        // initialValue={DUMMY_USER_DATA.password}
                        initialIsValid={false}
                    />   
            </div>
            {successMessage && <p className="success">Info Successfully updated!</p>}
                {passwordError && <p className="error">Ensure that both passwords are same!</p>}
            <Button 
                        type='submit'
                        // onClick={settingsFormSubmitHandler}
                        disabled={false}
                        // disabled={!formState.isValid}
                        green
                        // width='12%'
                    >Update
                </Button>
                
            </form>}
        </React.Fragment>
    )
}