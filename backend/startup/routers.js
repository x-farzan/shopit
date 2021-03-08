const express = require('express')
const products = require('../routes/product')
const error = require('../middleware/errors')

module.exports = function (app) {
    app.use(express.json())
    app.use('/api/v1', products)



    // error middleware
    app.use(error)
}