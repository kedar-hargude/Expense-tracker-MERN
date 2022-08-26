const mongoose = require('mongoose');

const expenseSchema = require('./expenseModel').expenseSchema;


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'You must have a name!']
    },
    lastName: String,
    mobileNumber: {
        type: Number,
        min: 1000000000,
        max: 9999999999
    },
    email: {
        type: String,
        required: [true, 'Account must have an email.'],
        trim: true,
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Account must have a password'],
        minLength: 5
    },
    expenses: [expenseSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;