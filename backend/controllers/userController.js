const User = require('../models/userModel');
const CustomError = require('../models/custom-error')

// check email and password of incoming req.body
exports.checkEmailPasswordMiddleware = (req, res, next) => {
    if(!req.body.email || !req.body.password){
        return next(new CustomError(404, 'Invalid credentials entered.'));
    }

    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email) === false){
        return next(new CustomError(404, 'Invalid email entered.'));
    }
    
    if(req.body.password.length < 6){
        return next(new CustomError(404, 'Password should be minimum 6 characters long.'));
        //TODO check password length in frontend
    }

    next();
};


// name, email, password given
exports.signUp = async (req, res, next) => {

    const {name, email, password} = req.body;

    if(!name){
        return next(new CustomError(404, 'Please enter a username.'));
    }

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
        message: `User ${req.body.name} signed up!`,
        userData: newUserDoc.toObject({getters: true})
    });
};

// email, password given
exports.logIn = async (req, res, next) => {
    
    const {email, password} = req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({email: email});
    } catch(err){
        console.log(err);
        return next(new CustomError(500, 'Could not verify details. Please try again later.'))
    }

    if(!existingUser || existingUser.password !== password){
        return res.status(400).json({
            status: 'error',
            message: 'Invalid Credentials, could not log you in.'
        })
    }

    res.status(200).json({
        status: 'success',
        message: `User ${existingUser.name} is logged in.`,
        userData: existingUser.toObject({getters: true})
        // userData: existingUser.toObject({getters:true}) //TODO think about whether to apply getter to everyone...it just returns an id, doesn't store it in the database.
    })
};

// userId given
exports.getUserInfo = async (req, res, next) => {
    const {userId} = req.body;

    let foundUser;
    try{
        foundUser = await User.findById(userId);
    } catch(err){
        console.log(err);
        return next(new CustomError(500, 'Internal error: Unable to find user. Please try again later'));
    }

    if(!foundUser){
        return next(new CustomError(404, 'Invalid userId passed. No user exists.'));
    }

    res.status(200).json({
        status: 'success',
        userData: {
            name: foundUser.name,
            lastName: foundUser.lastName,
            email: foundUser.email,
            password: foundUser.password,
            mobileNumber: foundUser.mobileNumber
        }
    })
}

// "userId", name, lastName, mobileNumber, email compulsory given
// password only given if you want to update the password
exports.updateUserInfo = async (req, res, next) => {

    const { userId, name, lastName, mobileNumber, email } = req.body;

    let password;
    if(req.body.password){
        password = req.body.password;
    }
    
    //check if another same email already exists in database
    let emailExistingUser;
    try{
        emailExistingUser = await User.findOne({email: email});
    } catch(err){
        console.log(err);
        return next(new CustomError(500, 'Fetching user failed. Please try again later.'));
    }
    
    // if to-be-changed-email id's user exists and it's id is not equal to the id of the current user who's requresting the change, show error.
    if(emailExistingUser && emailExistingUser.id !== userId){
        return next(new CustomError(400, 'Email already exists, use another email.'))
    }

    // actually update the user
    let updateBodyOptions;
    if(req.body.password){
        updateBodyOptions = {name, lastName, mobileNumber, email, password}
    } else{
        updateBodyOptions = {name, lastName, mobileNumber, email}
    }
    
    let updatedUser;
    try{
        updatedUser = await User.findByIdAndUpdate(userId, updateBodyOptions, { runValidators: true, new: true })
    } catch(err){
        console.log(err);
        return next(new CustomError(500, 'Fetching user failed. Please try again later.'));
    }

    res.status(200).json({
        status: 'success',
        message: 'Updated the user',
        userData: {
            name: updatedUser.name,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            password: updatedUser.password,
            mobileNumber: updatedUser.mobileNumber
        }
    });
}

// // will do this later
// exports.deleteUser = (req, res) => {
//     res.status(500).json({
//         status: 'error',
//         message: 'This route is not yet defined! Will delete the user later'
//     })
// }