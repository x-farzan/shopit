const express = require('express');
const app = express();

const dotenv = require('dotenv');

// setting dotenv
dotenv.config();
const startupDebugger = require('debug')('app:startup')

// get all routes
require('./startup/routers')(app)
// conect to database
require('./startup/db')();


app.listen(process.env.PORT, () => {
    startupDebugger(`Server Started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode...`)
})