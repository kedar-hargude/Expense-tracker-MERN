const router = require('express').Router();
const userData = require('../DUMMY_DATA');
const expenseController = require('../controllers/expenseController');
const { nanoid } = require('nanoid');

// middleware to check whether every request has a userId.
router.use(expenseController.userIdCheck);

//TODO delete, temporary to get all expense values
router.get('/', expenseController.getAllExpenses);


// 'userId', which is the id of the user must be compulsorily passed to all requests
router.post('/add', expenseController.checkFullRequestBody,
        expenseController.addExpense);

// expenseId is passed to every request after this
router.put('/update', expenseController.checkExpenseId, 
        expenseController.checkFullRequestBody, expenseController.updateExpense);

router.delete('/delete', expenseController.checkExpenseId,
        expenseController.deleteExpense);

module.exports = router;