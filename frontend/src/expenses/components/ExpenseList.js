import React, { useState } from "react";

import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import ExpenseItem from "./ExpenseItem";
import "./ExpenseList.css";

export default function ExpenseList(props){
    const [showModal, setShowModal] = useState(false);

    function openNewExpenseHandler(){
        setShowModal(true);
    }

    function closeNewExpenseHandler(){
        setShowModal(false);
    }

    // {
    //     id: 1234123,
    //     title: 'Mobile phone',
    //     amount: 1000,
    //     recurring: false,
    //     type: 'Mobile',
    //     date: '15 August, 2022'
    // }

    const loadedData = props.items.map(item => (
        <ExpenseItem 
            key={item.id}
            id={item.id}
            title={item.title}
            type={item.type}
            amount={item.amount}
            date={item.date}
        />
    ))


    return (
        <React.Fragment>
            <Modal  
            show={showModal}
            onCancel={closeNewExpenseHandler}
            header='Log new expense'
            >
                <p>Your form here!</p>
            </Modal>
            <div className="expense-list__container">
                <div>
                    <Button onClick={openNewExpenseHandler} >
                        Create Expense
                    </Button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>NAME/BUSINESS</th>
                            <th>TYPE</th>
                            <th>AMOUNT</th>
                            <th>DATE</th>
                            <th>INVOICE ID</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loadedData}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    )
}