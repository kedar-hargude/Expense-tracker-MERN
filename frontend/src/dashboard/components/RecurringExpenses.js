import React from "react";

export default function RecurringExpenses(props){
    return(
        <React.Fragment>
            <h3>Recurring Expenses:</h3>
            <table>
                <tbody>
                    {props.items.map(item => (
                        <tr key={item.id}>
                            <td className="bold">{item.title}</td>
                            <td className="bold">₹{item.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </React.Fragment>
    )
}