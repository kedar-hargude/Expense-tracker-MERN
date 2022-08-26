const userData = require('../DUMMY_DATA');
const CustomError = require('../models/custom-error');

//check if userId exists
exports.userIdCheck = (req, res, next) => {
    const foundUser = userData.find(ele => ele._id === req.body.userId);
    if(!req.body.userId || !foundUser){
        return next(new CustomError(404, 'Invalid userId passed'));
    }
    next();
};

// check if all the parameters are passed in the body
exports.checkFullRequestBody = (req, res, next) => {
    if (!req.body.title || !req.body.amount || !req.body.recurring || !req.body.type || !req.body.date){
        return next(new CustomError(404, 'Incomplete credentials given'));
    }
    next();
}; 

// check if expenseId to be updated/deleted is passed
exports.checkExpenseId = (req, res, next) => {
    if(!req.body.expenseId){
        return next(new CustomError(404, 'Expense Id not passed'));
    }
    next();
};

// get all expenses of an individual. userId is provided
exports.getAllExpenses = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: userData
    })
};


// add a new expense
exports.addExpense = (req, res) => {
    const foundUser = userData.find(ele => ele._id === req.body.userId);
    // const newExpense = Object.assign({_id: nanoid()}, req.body);
    const newExpense = {
        _id: nanoid(),
        title: req.body.title,
        amount: req.body.amount,
        recurring: req.body.recurring,
        type: req.body.type,
        date: req.body.date
    }
    foundUser.expenses.push(newExpense);
    res.status(201).json({
        status: 'success',
        message: `New expense of ${req.body.title} created.`,
        expense: newExpense
    })
};

exports.updateExpense = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            expense: '<Updated expense here...>'
        }
    })
};

exports.deleteExpense = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: null
    })
    // no data is sent...it works
};