const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env'});
const app = require('./app');
const User = require('./models/userModel');
const Expense = require('./models/expenseModel').Expense;

mongoose
    // .connect(process.env.DB_CONNECTION_STRING)
    .connect(process.env.DB_LOCAL_STRING)
    .then(() => {
        console.log('Database connected to cloud na broo!!');
    })


const newUser = new User({
    name: 'Kedar',
    lastName: "Hargude",
    email: "gabbarsingh208@gmail.com",
    password: "abcd123",
    expenses: [{
        "title": "Mobile phone",
        "amount": 1000,
        "recurring": false,
        "type": "Mobile",
        "date": "2022-08-15"
    }]
})

// newUser
//     .save()
//     .then(doc => console.log(doc))
//     .catch(err => console.log("Error here na: " + err))

const newExpense = new Expense({
    "title": "Scrimba subscription",
    "amount": 100,
    "recurring": true,
    "type": "Entertainment",
    "date": "2022-08-15"
})

// const id = '6307cf31953f148420bca1a3'; // in Atlas cloud
const userId = '6307d6c6c32cde8518b1b21d'; // local string url
const expenseId = '6307d6c6c32cde8518b1b21e'; // locally
User.findById(userId, (err, resultUser) => {
    if(err){
        console.log("Error finding by id: " + err);
    } else {
        // newExpense.save();
        resultUser.expenses = resultUser.expenses.filter(ele => ele.id !== expenseId);
        resultUser.save();
        // console.log("Found: " + result);
    }
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App has started listening on port ${port}`)
})