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


// Get a single order with user
// protected by user
router.get('/orders/:id', auth, async (req, res) => {
    const order = await Order.findById(req.params.id)
        .populate('user', 'name email')
    if (!order) return res.status(400).send("No Order Found with the given ID")

    res.send(order)
})

// get all orders of logged in user
router.get('/orders/my/orders', auth, async (req, res) => {
    const orders = await Order.find({ user: req.user._id })

    if (!orders) return res.status(400).send("No Orders found....")

    res.send(orders)
})


module.exports = router

