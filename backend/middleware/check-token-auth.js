const jwt = require('jsonwebtoken');

const CustomError = require('../models/custom-error');

module.exports = (req, res, next) => {
    // let token;
    if (req.method === 'OPTIONS') {
        return next();
    }
    try{
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            return next(new CustomError('Authentication failed', 401));
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decodedToken);
        // add new property to the request to use later in flow
        req.decodedUserData = { userId: decodedToken.userId };
        next();

    } catch(err){
        return next(new CustomError('Authentication failed! Couldnt verify token!', 403));
    }
    
};