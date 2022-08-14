import React from "react";

import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE } from '../../shared/utils/validators'
import "./SettingsForm.css";

export default function SettingsForm(props){
    return(
        <div className="settings-container">
            <Input 
                type='text'
                label='Name'
                placeholder='Your name here'
                errorText='Please enter an input'
                validators={[VALIDATOR_REQUIRE()]}
                width='90%'
            />
        </div>
    )
}