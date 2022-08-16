import React from "react";

import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE } from '../../shared/utils/validators';
import Modal from "../../shared/components/UIElements/Modal";
import CreateExpense from "../../expenses/components/CreateExpense";
import "./SettingsForm.css";

export default function SettingsForm(props){

    return(

        <React.Fragment>
            <Modal  
            show={true}
            // onCancel={closeNewExpenseHandler}
            header='Log new expense'
            >
                <CreateExpense />
            </Modal>
        </React.Fragment>
    )
}