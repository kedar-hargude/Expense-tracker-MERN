const express = require('express');
const app = express();
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes');

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/v1/users', userRouter);
// app.use('/api/v1/expenses', expenseRouter);

module.exports = app;