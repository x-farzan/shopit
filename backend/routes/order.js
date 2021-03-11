const express = require('express');
const router = express.Router()
const auth = require('../middleware/auth')
const _ = require('lodash')
const Order = require('../models/orderModel')

// create order
// protected by user
router.post('/order/new', auth, async (req, res) => {


    let order = new Order(_.pick, ['orderItems', 'shippingInfo', 'itemPrice', 'taxPrice', 'shippingPrice', 'totalPrice', 'paymentInfo']);
    order = {
        ...order,
        paidAt: Date.now(),
        user: req.user._id
    }
    order = await order.save()
    res.send(order)
})


module.exports = router