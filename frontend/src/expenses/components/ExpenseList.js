import React from "react";

import ExpenseItem from "./ExpenseItem";
import "./ExpenseList.css";

export default function ExpenseList(props){

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
        <div className="expense-list__container">
            <div>
                <h3 className="center">
                    Filter tag and search here maybe?
                </h3>
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
    )
}