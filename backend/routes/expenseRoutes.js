const router = require('express').Router();
const userData = require('../DUMMY_DATA');
const expenseController = require('../controllers/expenseController');
const { nanoid } = require('nanoid');

// temporary to get all expense values
router.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        data: userData
    })
})


// 'userId', which is the id of the user must be compulsorily passed to all requests
router.use((req, res, next) => {
    //check if user exists
    const foundUser = userData.find(ele => ele._id === req.body.userId);
    if(!req.body.userId || !foundUser){
        return res.status(404).json({
            status: 'error',
            message: 'Invalid userId'
        })
    } else if (!req.body.title || !req.body.amount || !req.body.recurring || !req.body.type || !req.body.date){
        return res.status(404).json({
            status: 'error',
            message: 'Incomplete credentials'
        })
    }

    next();
})


router.post('/add', (req, res) => {
    const foundUser = userData.find(ele => ele._id === req.body.userId);
    const newExpense = Object.assign({_id: nanoid()}, req.body)
    foundUser.expenses.push(newExpense);
    res.status(201).json({
        status: 'success',
        message: `New expense of ${req.body.title} created.`
    })
});

router.put('/update', (req, res) => {});

router.delete('/delete', (req, res) => {});

module.exports = router;