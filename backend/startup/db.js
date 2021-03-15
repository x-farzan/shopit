const mongoose = require('mongoose');
const winston = require("winston")

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb://localhost:27017/shopit", {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
        winston.info(`MongoDB Connected: ${conn.connection.host}`)
    } catch (err) {
        winston.error(`Error: ${err.message}`)
        process.exit(1)
    }
}
module.exports = connectDB;