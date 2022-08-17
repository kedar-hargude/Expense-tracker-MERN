import React from "react";

import Modal from "../../shared/components/UIElements/Modal";
import CreateExpense from "../../expenses/components/CreateExpense";
import UpdateExpense from "../../expenses/components/UpdateExpense";
import "./SettingsForm.css";

export default function SettingsForm(props){

    return(

        <React.Fragment>
            <Modal  
            show={true}
            // onCancel={closeNewExpenseHandler}
            header='Log new expense'
            >
                <UpdateExpense id={23462456} />
            </Modal>
        </React.Fragment>
    )
}