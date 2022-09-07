const Expense = require('../models/expenseModel').Expense;
const User = require('../models/userModel');
const CustomError = require('../models/custom-error');
const { nanoid } = require('nanoid');

//check if userId exists in request and in database
exports.userIdCheck = async (req, res, next) => {
    if(!req.body.userId){
        return next(new CustomError(404, 'Pass on a userId'));
    }

    next();
};

// check if all the parameters are passed in the body
exports.checkFullRequestBody = (req, res, next) => {
    if (!req.body.title || !req.body.amount || !req.body.recurring || !req.body.type || !req.body.date){
        return next(new CustomError(404, 'Incomplete credentials given. Please pass title, amount, recurring, type, date as arguments.'));
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
exports.getFullUserInfo = async (req, res, next) => {

    const { userId } = req.body;

    let foundUser;
    try{
        foundUser = await User.findById(userId);
    } catch(err){
        console.log(err);
        return next(new CustomError(500, 'Internal error: Unable to find user. Please try again later'));
    }

    if(!foundUser){
        return next(new CustomError(404, 'Invalid userId passed. No user exists.'));
    }

    res.status(200).json({
        status: 'success',
        userData: foundUser.toObject({getters: true})
    })
};


// add a new expense
exports.addExpense = async (req, res, next) => {
    
    const userId = req.body.userId;

    let foundUser;
    try{
        foundUser = await User.findById(userId);
        // foundUser = await User.findOne({id: req.userId});
    } catch(err){
        console.log(err);
        return next(new CustomError(500, 'Internal error: Unable to find user. Please try again later'));
    }

    if(!foundUser){
        return next(new CustomError(404, 'Invalid userId passed. No user exists.'));
    }

    const newExpense = {
        // expenseId: nanoid(),
        title: req.body.title,
        amount: req.body.amount,
        recurring: req.body.recurring,
        type: req.body.type,
        date: req.body.date
    };
    // console.log("new expense: " + JSON.stringify(newExpense));

    // try{
    //     await newExpense.save();
    // } catch(err){
    //     return next(new CustomError(500, 'Unable to save expense in expenses. Please try again later'));
    // }

    foundUser.expenses.push(newExpense);

    try{
        await foundUser.save();
    } catch(err){
        console.log(err);
        return next(new CustomError(500, 'Internal error: Unable to save user after adding expense. Please try again later'));
    }

    res.status(201).json({
        status: 'success',
        message: `New expense of '${req.body.title}' created.`,
        expense: newExpense
    });
};

exports.getExpense = async (req, res, next) => {
    const { userId, expenseId } = req.body;

    let foundUser;
    try{
        foundUser = await User.findById(userId);
    } catch(err){
        console.log(err);
        return next(new CustomError(500, 'Internal error: Unable to find user. Please try again later'));
    }

    if(!foundUser){
        return next(new CustomError(404, 'Invalid userId passed. No user exists.'));
    }

    const foundExpense = foundUser.expenses.id(expenseId);

    res.status(200).json({
        status: 'success',
        expenseData: foundExpense.toObject({getters: true})
    })
}

exports.updateExpense = async (req, res, next) => {

    const {userId, expenseId, title, amount, recurring, type, date} = req.body;

    let foundUser;
    try{
        foundUser = await User.findById(userId);
    } catch(err){
        console.log(err);
        return next(new CustomError(500, 'Could not find user. Please try again.'));
    }

    if(!foundUser){
        return next(new CustomError(404, 'Invalid userId passed. No user exists.'));
    }

    const foundExpense = foundUser.expenses.id(expenseId);

    console.log(foundExpense);
    foundExpense.title = title;
    foundExpense.amount = amount;
    foundExpense.recurring = recurring;
    foundExpense.type = type;
    foundExpense.date = date;

    // foundUser.expenses.map(exp => {
    //     exp.expenseId === req.body.expenseId ? ({ 
    //         ...exp,
    //         title: req.body.title,
    //         amount: req.body.amount,
    //         recurring: req.body.recurring,
    //         type: req.body.type,
    //         date: req.body.date
    //     }) : exp
    // })

    try{
        foundUser.save();
    } catch(err){
        console.log(err);
        return next(new CustomError(500, 'Could not save user. Please try again.'));
    }
    

    res.status(200).json({
        status: 'success',
        data: foundUser
    })
};

// userId and expenseId is passed
exports.deleteExpense = async (req, res, next) => {

    const { userId, expenseId } = req.body;

    let foundUser;
    try{
        foundUser = await User.findById(userId);
    } catch(err){
        console.log(err);
        return next(new CustomError(500, 'Could not find user. Please try again.'));
    }

    if(!foundUser){
        return next(new CustomError(404, 'Invalid userId passed. No user exists.'));
    }

    const foundExpense = foundUser.expenses.id(expenseId);

    if(!foundExpense){
        return next(new CustomError(404, 'Invalid expenseId passed. No expense exists.'));
    }

    foundExpense.remove();      //removing the expense
    //TODO check for the wrong expense id path, whether this is async

    try{
        foundUser.save();
    } catch(err){
        console.log(err);
        return next(new CustomError(500, 'Could not save user. Please try again.'));
    }

    res.status(204).json({
        status: 'success',
        data: null
    })
    // no data is sent...it works
};