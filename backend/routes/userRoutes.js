const router = require('express').Router();
const userController = require('../controllers/userController');

router.use(userController.checkEmailPasswordMiddleware);

// 'name, email and password' required
router.post('/signup', userController.signUp);

// 'email and password' required
router.post('/login', userController.logIn);

// user 'id, and full user' info should be passed on as input
// maybe check if the SAME user is logged in before
router.put('/update', userController.updateUserInfo);

// // user 'id' passed as input
// router.delete('/delete', userController.deleteUser);

module.exports = router;