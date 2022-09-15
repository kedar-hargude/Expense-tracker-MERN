const router = require('express').Router();

const userController = require('../controllers/userController');
const { userIdCheck } = require('../controllers/expenseController');
const checkToken = require('../middleware/check-token-auth.js');

const {checkEmailPasswordMiddleware, signUp, getUserInfo, logIn, updateUserInfo} = userController;

// router.use(checkEmailPasswordMiddleware);

// 'name, email and password' required
router.post('/signup', checkEmailPasswordMiddleware, signUp);

// 'email and password' required
router.post('/login', checkEmailPasswordMiddleware, logIn);

// check auth token middleware
router.use(checkToken);

// userId required
router.post('/getUser', userIdCheck, getUserInfo);

// user 'id, and full user' info should be passed on as input
// maybe check if the SAME user is logged in before
router.put('/update', userIdCheck, updateUserInfo);

// // user 'id' passed as input
// router.delete('/delete', userController.deleteUser);

module.exports = router;