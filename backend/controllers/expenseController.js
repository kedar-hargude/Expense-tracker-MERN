const userData = require('../DUMMY_DATA');

exports.userIdCheck = (req, res, next) => {
    //check if userId exists
    const foundUser = userData.find(ele => ele._id === req.body.userId);
    if(!req.body.userId || !foundUser){
        return res.status(404).json({
            status: 'error',
            message: 'Invalid userId'
        })
    }
    next();
};

exports.getAllExpenses = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: userData
    })
};

exports.checkFullRequestBody = (req, res, next) => {
    if (!req.body.title || !req.body.amount || !req.body.recurring || !req.body.type || !req.body.date){
        return res.status(404).json({
            status: 'error',
            message: 'Incomplete credentials'
        })
    }
    next();
}; 

exports.checkExpenseId = (req, res, next) => {
    if(!req.body.expenseId){
        return res.status(404).json({
            status: 'error',
            message: 'Expense Id not passed'
        })
    }
    next();
};

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