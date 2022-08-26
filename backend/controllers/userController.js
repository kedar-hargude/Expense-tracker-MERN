const User = require('../models/userModel');
const CustomError = require('../models/custom-error')

// check email and password of incoming req.body
// exports.checkEmailPasswordMiddleware = (req, res, next) => {
//     console.log(req.body);
//     if(!req.body.email || !req.body.password){
//         return res.status(404).json({status: 'error', message: 'Incomplete credentials entered'})
//     }
//     next();
// };


// name, email, password given
exports.signUp = async (req, res, next) => {

    const {name, email, password} = req.body;

    // check if user email already exists
    let existingUser;
    try{
        existingUser = await User.findOne({ email: email });
    } catch(err){
        console.log(err);
        const error = new CustomError(500, 'Unable to find if email already exists. Please try again later');
        return next(error);
    }

    if(existingUser){
        return next(new CustomError(400, 'User already exists. Enter different email.'));
    }

    let newUserDoc;
    try{
        newUserDoc = await User.create(req.body);
    } catch(err){
        console.log(err);
        return next(new CustomError(500, 'Adding user failed. Please try again later'));
    }

    res.status(201).json({
        status: 'success', 
        message: `Dummy user ${req.body.name} signed up!`,
        document: newUserDoc
    });
};

exports.logIn = (req, res) => {
    const findUser = userData.find(ele => ele.email === req.body.email);
    if(!findUser){
        res.status(404).json({ 
            status: 'error', 
            message: 'No user email id registered. Please sign up.'
        })
    } else if (findUser.password !== req.body.password){
        res.status(404).json({ 
            status: 'error', 
            message: 'Wrong user password.'
        })
    } else {
        res.status(200).json({ 
            status: 'success', 
            message: `Dummy user ${findUser.name} logged in!`
        })
    }
};

exports.updateUserInfo = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined! Will update the user info later.'
      });
}

exports.deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined! Will delete the user later'
    })
}