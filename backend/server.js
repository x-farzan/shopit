const app = require('./app')
const dotenv = require('dotenv');

// setting dotenv
dotenv.config({ path: './config/config.env' });
const startupDebugger = require('debug')('app:startup')



app.listen(process.env.PORT, () => {
    startupDebugger(`Server Started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode...`)
})