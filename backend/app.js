const express = require('express');
const app = express();
const morgan = require('morgan');

console.log('app.js executed');

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.get('/', (req, res) => {
    res.status(200).json({status: 'success', message: 'This is working broo'})
})

module.exports = app;