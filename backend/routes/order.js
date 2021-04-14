const express = require('express');
const router = express.Router()
const auth = require('../middleware/auth')
const _ = require('lodash')
const { Order, validation } = require('../models/orderModel')
const { Product } = require('../models/productModel')
const admin = require('../middleware/admin');
const Joi = require('joi');
const mongoose = require("mongoose")
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
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send("Invalid Product ID")
    }
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
        totalAmount: totalAmount.toFixed(2),
        orders
    })
})

// get single order
// protected by admin
router.get("/admin/order/:id", [auth, admin], async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send("This is not a correct ID")
    const order = await Order.findById(req.params.id).populate("user", "-password").select("-itemPrice -taxPrice -shippingPrice -totalPrice")
    if (!order) return res.status(400).send("Order with the Given ID is not present")
    res.send(order)
})

// Delte an orders by admin 
// protected by admin only 
router.delete('/admin/delete/order/:id', [auth, admin], async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send("Invalid Product ID")
    }
    const order = await Order.findByIdAndRemove(req.params.id)
    if (!order) return res.status(400).send("No Orders found....")

    const orders = await Order.find().sort("_id")
    if (!orders) return res.status(400).send("No Orders found....")


    res.send({
        success: true,
        orders
    })

})

// update | Process order status
// protected by admin

router.put('/admin/update/order/:id', [auth, admin], async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send("Invalid Order ID")
    const order = await Order.findById(req.params.id).populate("user", "-password")
    if (!order) return res.status(400).send('Order Not Present')

    if (order.orderStatus === 'Shipped' || order.orderStatus === 'Delivered') {

        if (order.orderStatus === 'Delivered') {
            return res.status(400).send("This Product is already Delivered")
        }
        if (req.body.status === "Shipped") return res.status(400).send("This Product is already Shipped")
        if (req.body.status === "Delivered") {
            order.orderStatus = req.body.status;
            await order.save()

            return res.send({
                msg: "Product is Delivered Successfully"
            })
        }
    }

    //update stock of each product
    order.orderItems.forEach(async item => {
        await updateOrderStatus(item.product, item.qty)
    })

    // Joi error checking
    const { error } = orderProcessingValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // update status
    order.orderStatus = req.body.status;
    order.deliveredAt = Date.now()

    await order.save()

    res.send({
        msg: "Stock is updated and order is Shipped",
        order
    })
})

const updateOrderStatus = async (id, quantity) => {

    const product = await Product.findById(id)

    const stock = product.stock - quantity

    product.stock = Number(stock)

    await product.save({ validateBeforeSave: false })
}

const orderProcessingValidation = (status) => {
    const schema = Joi.object({
        status: Joi.string().required().valid("Processing", "Shipped", "Delivered")
    })
    return schema.validate(status)
}
module.exports = router

