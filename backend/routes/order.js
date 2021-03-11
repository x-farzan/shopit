const express = require('express');
const router = express.Router()
const auth = require('../middleware/auth')
const _ = require('lodash')
const { Order, validation } = require('../models/orderModel')

// create order
// protected by user
router.post('/order/new', auth, async (req, res) => {
    const { error } = validation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let order = new Order(_.pick(req.body, ['orderItems', 'shippingInfo', 'itemPrice', 'taxPrice', 'shippingPrice', 'totalPrice', 'paymentInfo']));
    // let order = new Order(_.pick(req.body, ['shippingInfo']));
    order.user = req.user._id
    order.paidAt = Date.now()

    await order.save()
    res.send(order)
})


module.exports = router

