const mongoose = require('mongoose');
const dbDebugger = require('debug')('app:dbDebug')
const dbBUG = require('debug')('app:dbBug')

module.exports = function () {
    mongoose.connect(process.env.LOCAL_DB_URI, {
        useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true
    })

        .then((con) => dbDebugger(`MongoDB databse connected with host ${con.connection.host}...`))
        .catch((err) => dbBUG(`Refused connection to database, ERROR: ${err.message}`))
}