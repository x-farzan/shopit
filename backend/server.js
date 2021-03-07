const express = require('express');
const app = express();

const dotenv = require('dotenv');

// setting dotenv
dotenv.config();
const startupDebugger = require('debug')('app:startup')

require('./startup/routers')(app)


app.listen(process.env.PORT, () => {
    startupDebugger(`Server Started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode...`)
})