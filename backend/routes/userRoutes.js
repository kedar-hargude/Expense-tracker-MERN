const router = require('express').Router();
const userController = require('../controllers/userController');

// router.use(userController.checkEmailPasswordMiddleware);

// name, email and password required
router.post('/signup', userController.signUp);

// email and password required
router.post('/login', userController.logIn);

// maybe check if the SAME user is logged in before
router.patch('/edit', userController.updateUserInfo);

router.delete('/delete', userController.deleteUser)

module.exports = router;