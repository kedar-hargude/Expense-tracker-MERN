const router = require('express').Router();
const userData = require('../DUMMY_DATA');

router.use((req, res, next) => {
    console.log(req.body);
    if(!req.body.email || !req.body.password){
        return res.status(404).json({status: 'error', message: 'Incomplete credentials entered'})
    }
    next();
})


// name, email and password required
router.post('/signup', (req, res) => {

    // check if user email already exists
    const checkUser = userData.find(ele => ele.email === req.body.email);
    if(checkUser){
        return res.status(409).json({ status: 'error', message: 'User email already exists. Please log in.' })
    }

    res.status(201).json({status: 'success', message: `Dummy user ${req.body.name} signed up!`});
});

// email and password required
router.post('/login', (req, res) => {
    const findUser = userData.find(ele => ele.email === req.body.email);
    if(!findUser){
        res.status(404).json({ status: 'error', message: 'No user email id registered. Please sign up.'})
    } else if (findUser.password !== req.body.password){
        res.status(404).json({ status: 'error', message: 'Wrong user password.'})
    } else {
        res.status(200).json({ status: 'success', message: `Dummy user ${findUser.name} logged in!`})
    }
});

module.exports = router;