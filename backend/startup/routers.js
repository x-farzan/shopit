const express = require('express')
const products = require('../routes/product')
const error = require('../middleware/errors')
const users = require('../routes/users')
const auth = require('../routes/auth')
const profile = require('../routes/profile')
const cookieParser = require('cookie-parser')


module.exports = function (app) {
    app.use(express.json())
    app.use(cookieParser())
    app.use('/api/v1', products)
    app.use('/api/v1', users)
    app.use('/api/v1', auth)
    app.use('/api/v1', profile)


    // error middleware
    app.use(error)
}