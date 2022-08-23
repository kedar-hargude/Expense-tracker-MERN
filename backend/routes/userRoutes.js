const router = require('express').Router();
const userController = require('../controllers/userController');

router.use(userController.checkEmailPasswordMiddleware);

// name, email and password required
router.post('/signup', userController.signUp);

// email and password required
router.post('/login', userController.logIn);

module.exports = router;