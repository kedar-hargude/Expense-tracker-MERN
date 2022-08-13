import React from "react";

import ExpenseList from "../components/ExpenseList";

/* dummy individual database info:

    {
        id: 3452345,
        name: Kedar,
        mobile-number: 1234567891,
        email: xyz@gmail.com,
        password: abcd123,
        expenses: [
            {
                id: 1234123,
                title: 'Mobile phone',
                amount: 1000,
                recurring: false,
                type: 'Mobile',
                date: '15 August, 2022'
            }
        ]
    }

*/
const DUMMY_EXPENSE_DATA = [
    {
        id: 1234123,
        title: 'Mobile phone',
        amount: 1000,
        recurring: false,
        type: 'Mobile',
        date: '15 August, 2022'
    },
    {
        id: 23462456,
        title: 'Scrimba subscription',
        amount: 100,
        recurring: true,
        type: 'Entertainment',
        date: '15 August, 2022' 
    },
    {
        id: 23452345234523452345234523,
        title: 'Frontend Masters subscription',
        amount: 100,
        recurring: true,
        type: 'Entertainment',
        date: '15 August, 2022' 
    }
];

export default function Expense(){
    const items = DUMMY_EXPENSE_DATA;

    return (
        <ExpenseList items={items} />
    )
}