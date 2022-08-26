const router = require('express').Router();
const expenseController = require('../controllers/expenseController');
const { nanoid } = require('nanoid');

const { userIdCheck, getFullUserInfo, checkExpenseId, checkFullRequestBody, addExpense, updateExpense, deleteExpense } = expenseController;

// middleware to check whether every request has a userId.
router.use(userIdCheck);

// 'userId', which is the id of the user must be compulsorily passed to all requests 

//Get all expense values of a specific userId. only userId is passed
router.post('/', getFullUserInfo);

// userId, title, amount, reccuring, type, date passed
router.post('/add', checkFullRequestBody, addExpense);

// userId, "expenseId", title, amount, reccuring, type, date passed
router.put('/update', checkExpenseId, checkFullRequestBody, updateExpense);

// userId, expenseId passed
router.delete('/delete', checkExpenseId, deleteExpense);

module.exports = router;