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