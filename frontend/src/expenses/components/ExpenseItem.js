import React from "react";

import Button from "../../shared/components/FormElements/Button";
import "./ExpenseItem.css";

export default function ExpenseItem(props){

    function editHandler(){
        console.log(props.id);
    }

    // {
    //     id: 1234123,
    //     title: 'Mobile phone',
    //     amount: 1000,
    //     recurring: false,
    //     type: 'Mobile',
    //     date: '15 August, 2022'
    // }

    return(
        <tr className="expense-row__container">
            <td className="bold">{props.title}</td>
            <td>{props.type}</td>
            <td className="bold">₹{props.amount}</td>
            <td className="bold">{props.date}</td>
            <td>{props.id}</td>
            <td>
                <Button 
                onClick={editHandler}
                // className="bold"
                >
                    <p>Edit</p>
                </Button>
            </td>
        </tr>
    )
}