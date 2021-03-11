const mongoose = require('mongoose');
const Joi = require('joi')

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        phoneNo: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true }

    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItems: [
        {
            name: { type: String, required: true },
            quantity: { type: String, required: true },
            image: { type: String, required: true },
            price: { type: String, required: true },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            }
        }
    ],
    paymentInfo: {
        id: { type: String },
        status: { type: String }
    },
    paidAt: {
        type: Date
    },
    itemPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    orderStatus: {
        type: String,
        required: true,
        default: "processing..."
    },
    deliveredAt: { type: String },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Order = mongoose.model('Order', orderSchema)

const orderValidation = order => {
    const orderItemsSchema = Joi.object({
        name: Joi.string().required(),
        quantity: Joi.string().required(),
        image: Joi.string().required(),
        price: Joi.string().required(),
        product: Joi.string().required(),
    })
    const shippingInfoSchema = {
        address: Joi.string().required(),
        city: Joi.string().required(),
        phoneNo: Joi.string().required(),
        postalCode: Joi.string().required(),
        country: Joi.string().required(),
    }
    const paymentInfoSchema = {
        id: Joi.string().required(),
        status: Joi.string().required()
    }

    const schema = Joi.object({
        shippingInfo: Joi.object(shippingInfoSchema).required(),
        orderItems: Joi.array().items(orderItemsSchema).min(1).required(),
        itemPrice: Joi.number().required(),
        taxPrice: Joi.number().required(),
        shippingPrice: Joi.number().required(),
        totalPrice: Joi.number().required(),
        paymentInfo: Joi.object(paymentInfoSchema).required()
    })
    return schema.validate(order)
}


exports.Order = Order
exports.validation = orderValidation


