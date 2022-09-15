import React, { useState, useContext } from "react";
import {useNavigate} from 'react-router-dom';

import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import UpdateExpense from "./UpdateExpense";
import useCustomFetch from "../../shared/hooks/fetch-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { MyAuthContext } from "../../shared/context/auth.context";
import "./ExpenseItem.css";

export default function ExpenseItem(props){

    const [showModal, setShowModal] = useState(false);
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);

    const navigate = useNavigate();

    const {isLoading, error, sendRequest, clearError} = useCustomFetch();
    const auth = useContext(MyAuthContext);

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

    async function confirmDeleteHandler(){
        // {console.log(`Deleting id:${props.id}...`)}
        setShowDeleteConfirmModal(false);
        // TODO delete request to backend
        try{
            const responseData = await sendRequest(
                'http://localhost:5000/api/v1/expenses/delete',
                'DELETE',
                JSON.stringify({
                    userId: auth.userId,
                    expenseId: props.id
                }),
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + auth.token
                }
            );

            props.reloadPage();
        } catch(err){}
        
        navigate('/', {replace: true});
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
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}

            <Modal  
            show={showModal}
            onCancel={closeUpdateExpenseHandler}
            header='Edit expense'
            >
                <UpdateExpense
                    expenseId={props.id}
                    handleFormSubmit={updateExpenseSubmitHandler}
                    showDeleteWarningHandler={showDeleteWarningHandler}
                    sendRequest={props.sendRequest}
                    reloadPage={props.reloadPage}
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

            {!isLoading && <tr className="expense-row__container">
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
            </tr>}
        </React.Fragment>
        
    )
}