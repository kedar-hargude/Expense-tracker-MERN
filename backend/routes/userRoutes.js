const router = require('express').Router();
const userController = require('../controllers/userController');

const {checkEmailPasswordMiddleware, signUp, getUserInfo, logIn, updateUserInfo} = userController;

// router.use(checkEmailPasswordMiddleware);

// 'name, email and password' required
router.post('/signup', checkEmailPasswordMiddleware, signUp);

// 'email and password' required
router.post('/login', checkEmailPasswordMiddleware, logIn);

// userId required
router.post('/getUser', getUserInfo);

// user 'id, and full user' info should be passed on as input
// maybe check if the SAME user is logged in before
router.put('/update', checkEmailPasswordMiddleware, updateUserInfo);

// // user 'id' passed as input
// router.delete('/delete', userController.deleteUser);

module.exports = router;