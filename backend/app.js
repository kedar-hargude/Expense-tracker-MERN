const express = require('express');
const app = express();
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes');
const expenseRouter = require('./routes/expenseRoutes');
const CustomError = require('./models/custom-error');

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/expenses', expenseRouter);

// unhandled routes
app.all('*', (req, res, next) => {
    next(new CustomError(404, `Can't find ${req.originalUrl} on this server!`));
})

// error handling middleware
app.use((error, req, res, next) => {
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500).json({
        status: 'error',
        message: error.message || 'An unknown error occured'
    })
})

module.exports = app;