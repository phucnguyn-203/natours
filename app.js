const express = require('express');
const morgan = require('morgan');
const path = require('path');

// START EXPRESS APP
const app = express();

// ROUTES
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// GLOBAL MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ROUTER
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
