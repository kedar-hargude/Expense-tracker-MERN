import React from 'react';

export default function RecentExpenses(props){
    
    return(
        <React.Fragment>
            <h3>Recent Expenses:</h3>
            <table>
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>TYPE</th>
                        <th>AMOUNT</th>
                        <th>DATE</th>
                    </tr>
                </thead>
                <tbody>
                    {/* <tr className="expense-row">
                        <td className="bold">{props.items[0].title}</td>
                        <td>{props.items[0].type}</td>
                        <td className="bold">₹{props.items[0].amount}</td>
                        <td className="bold">{props.items[0].date.split('T')[0]}</td>
                    </tr>
                    <tr className="expense-row">
                        <td className="bold">{props.items[1].title}</td>
                        <td>{props.items[1].type}</td>
                        <td className="bold">₹{props.items[1].amount}</td>
                        <td className="bold">{props.items[1].date.split('T')[0]}</td>
                    </tr>
                    <tr className="expense-row">
                        <td className="bold">{props.items[2].title}</td>
                        <td>{props.items[2].type}</td>
                        <td className="bold">₹{props.items[2].amount}</td>
                        <td className="bold">{props.items[2].date.split('T')[0]}</td>
                    </tr> */}
                    {props.items.map(item => (
                        <tr key={item.id}>
                            <td className="bold">{item.title}</td>
                            <td>{item.type}</td>
                            <td className="bold">₹{item.amount}</td>
                            <td className="bold">{item.date.split('T')[0]}</td> 
                        </tr>
                    ))}
                </tbody>
            </table>
        </React.Fragment>
    )
}