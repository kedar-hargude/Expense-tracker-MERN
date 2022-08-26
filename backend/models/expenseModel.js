const mongoose = require('mongoose');

const User = require('./userModel');

const expenseSchema = mongoose.Schema({
    // expenseId: {
    //     type: String
    // },
    title: {
        type: String,
        required: [true, 'Expense requires a title']
    },
    amount: {
        type: Number,
        required: [true, 'Expense requires an amount']
    },
    recurring: {
        type: Boolean,
        required: [true, 'Expense requires an amount']
    },
    type: {
        type: String,
        required: [true, 'Expense requires a type of expense']
    },
    date: {
        type: Date,
        required: [true, 'Expense requires an amount']
    }
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports.expenseSchema = expenseSchema;
module.exports.Expense = Expense;
