const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env'});
const app = require('./app');
const User = require('./models/userModel');
const Expense = require('./models/expenseModel').Expense;

mongoose
    .connect(process.env.DB_CONNECTION_STRING)
    // .connect(process.env.DB_LOCAL_STRING)
    .then(() => {
        console.log('Database connected to cloud na broo!!');
    })


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App has started listening on port ${port}`)
})