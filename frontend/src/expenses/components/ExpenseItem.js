import React, { useState } from "react";

import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import UpdateExpense from "./UpdateExpense";
import "./ExpenseItem.css";

export default function ExpenseItem(props){

    const [showModal, setShowModal] = useState(false);
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);

    function openUpdateExpenseHandler(){
        setShowModal(true);
    }

    function closeUpdateExpenseHandler(){
        setShowModal(false);
    }

    function updateExpenseSubmitHandler(){
        setShowModal(false);
    }

    // function editHandler(){
    //     // console.log(props.id);
    //     openUpdateExpenseHandler();
    // }

    function showDeleteWarningHandler(){
        setShowModal(false);
        setShowDeleteConfirmModal(true);
    }

    function closeDeleteWarningHandler(){
        setShowDeleteConfirmModal(false);
    }

    function confirmDeleteHandler(){
        {console.log(`Deleting id:${props.id}...`)}
        setShowDeleteConfirmModal(false);
        // TODO delete request to backend
    }

    // {
    //     id: 1234123,
    //     title: 'Mobile phone',
    //     amount: 1000,
    //     recurring: false,
    //     type: 'Mobile',
    //     date: '2022-08-15'
    // }

    return(
        <React.Fragment>
            <Modal  
            show={showModal}
            onCancel={closeUpdateExpenseHandler}
            header='Edit expense'
            >
                <UpdateExpense
                    id={props.id}
                    handleFormSubmit={updateExpenseSubmitHandler}
                    showDeleteWarningHandler={showDeleteWarningHandler}
                />
            </Modal>

            <Modal
                show={showDeleteConfirmModal}
                onCancel={closeDeleteWarningHandler}
                header='Are you sure?'
            >
                <p>...to delete expense titled: <span className="big">{`${props.title}`}</span>, costing ₹<span className="big">{`${props.amount}`}</span>
                </p>
                <div className="confirm-delete-btn-container">
                    <Button 
                        onClick={confirmDeleteHandler}
                        danger
                    >Confirm</Button> 
                </div>
            </Modal>

            <tr className="expense-row__container">
            <td className="bold">{props.title}</td>
            <td>{props.type}</td>
            <td className="bold">₹{props.amount}</td>
            <td className="bold">{props.date}</td>
            <td>{props.id}</td>
            <td>
                <Button 
                    onClick={openUpdateExpenseHandler}
                // className="bold"
                >
                    <p>Edit</p>
                </Button>
            </td>
            </tr>
        </React.Fragment>
        
    )
}