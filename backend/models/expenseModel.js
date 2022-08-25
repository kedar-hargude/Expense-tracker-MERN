const mongoose = require('mongoose');


const expenseSchema = mongoose.Schema({
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


/*

User.findById(userId, function(err, resultUser) =>

working add expense >>
const newExpense = new Expense ({...all values})
resultUser.expenses.push(newExpense);
resultUser.save();

working delete expense >>
resultUser.expenses = resultUser.expenses.filter(ele => ele.id !== expenseId);
resultUser.save();


*/