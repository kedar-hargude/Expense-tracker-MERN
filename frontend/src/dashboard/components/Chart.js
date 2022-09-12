import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from 'recharts';

export default function Chart(props){

    // console.log(props.data);
    const chartData = props.data.map(expense => ({
        amount: expense.amount,
        date: expense.date.split('T')[0]
    }));
    // console.log(chartData)

    return(
        <ResponsiveContainer width='100%' height='100%'>
            <LineChart data={chartData}>
                <CartesianGrid strokeDasharray='0' horizontal={false} />
                <XAxis dataKey='date' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type='monotone'
                  dataKey='amount'
                  stroke='#8884d8'
                //   activeDot={{ r: 2 }}
                />
            </LineChart>
        </ResponsiveContainer>
        // <h3>Chart here</h3>
    )
}