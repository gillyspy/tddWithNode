const express = require('express');
const userRouter = require('./user/UserRouter.js');

const app = express();

//parse body with express 4.16+ way
app.use(express.json());

//handle user requests
app.use('/api/1.0/users', userRouter);

module.exports = app;
