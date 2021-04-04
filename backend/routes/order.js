const express = require('express');
const router = express.Router()
const auth = require('../middleware/auth')
const _ = require('lodash')
const { Order, validation } = require('../models/orderModel')
const { Product } = require('../models/productModel')
const admin = require('../middleware/admin');
const Joi = require('joi');

// create order
// protected by user
router.post('/order/new', auth, async (req, res) => {
    // console.log(req.body)
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
router.get('/order/:id', auth, async (req, res) => {
    const order = await Order.findById(req.params.id)
        .populate('user', 'name email')
    if (!order) return res.status(400).send("No Order Found with the given ID")

    res.send(order)
})

// get all orders of logged in user
// protected by user
router.get('/orders/me', auth, async (req, res) => {
    const orders = await Order.find({ user: req.user._id })

    if (!orders) return res.status(400).send("No Orders found....")

    res.send(orders)
})



// get all orders by admin and add their total amounts
// protected by admin only 
router.get('/admin/orders', [auth, admin], async (req, res) => {

    const orders = await Order.find()
    if (!orders) return res.status(400).send("No Orders found....")

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.send({
        totalAmount,
        orders
    })
})

// Delte an orders by admin 
// protected by admin only 
router.delete('/admin/delete/order/:id', [auth, admin], async (req, res) => {

    const order = await Order.findByIdAndRemove(req.params.id)
    if (!order) return res.status(400).send("No Orders found....")
    res.send({
        message: "order is deleted successfully",
        order
    })

})

// update | Process order status
// protected by admin

router.put('/admin/update/order/:id', [auth, admin], async (req, res) => {

    const order = await Order.findById(req.params.id)
    if (!order) return res.status(400).send('Order with the given id is not present...')
    if (order.orderStatus === 'Delivered') return res.status(400).send("This Product is already Delivered")

    //update stock of each product
    order.orderItems.forEach(async item => {
        await updateOrderStatus(item.product, item.quantity)
    })

    // Joi error checking
    const { error } = orderProcessingValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // update status
    order.orderStatus = req.body.status;
    order.deliveredAt = Date.now()

    await order.save()

    res.send("Stock is updated and order is Delivered")
})

const updateOrderStatus = async (id, quantity) => {

    const product = await Product.findById(id)

    product.stock = product.stock - quantity

    await product.save({ validateBeforeSave: false })
}

const orderProcessingValidation = (status) => {
    const schema = Joi.object({
        status: Joi.string().required().valid("Processing", "Delivered")
    })
    return schema.validate(status)
}
module.exports = router

