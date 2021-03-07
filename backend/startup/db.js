const mongoose = require('mongoose');
const dbDebugger = require('debug')('app:dbDebug')
const dbBUG = require('debug')('app:dbBug')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.LOCAL_DB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (err) {
        console.log(`Error: ${ex.message}`)
        process.exit(1)
    }
}
module.exports = connectDB;