const mongoose = require('mongoose');
const Joi = require('joi')

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        phone: { type: String, required: true },
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
            qty: { type: Number, required: true },
            images: [
                {
                    _id: { type: String },
                    public_id: { type: String, required: true },
                    url: { type: String, required: true }
                }
            ],
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
        default: "Processing"
    },
    deliveredAt: { type: String },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Order = mongoose.model('Order', orderSchema)

const orderValidation = order => {
    const imagesSchema = Joi.object({
        _id: Joi.string(),
        public_id: Joi.string().required(),
        url: Joi.string().required(),
    })
    const orderItemsSchema = Joi.object({
        name: Joi.string().required(),
        qty: Joi.number().required(),
        images: Joi.array().items(imagesSchema).min(1).required(),
        price: Joi.number().required(),
        product: Joi.string().required(),
    })
    const shippingInfoSchema = {
        address: Joi.string().required(),
        city: Joi.string().required(),
        phone: Joi.string().required(),
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
        user: Joi.string().required(),
        paymentInfo: Joi.object(paymentInfoSchema).required()
    })
    return schema.validate(order)
}


exports.Order = Order
exports.validation = orderValidation


