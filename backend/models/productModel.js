const mongoose = require('mongoose');
const Joi = require('joi'); // require joi module

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 1000,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        default: 0.0
    },
    description: {
        type: String,
        required: true
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [ // array of objects because we have more than one image
        {
            public_id: { type: String, required: true },
            url: { type: String, required: true } // we'll use cloudinary to store images. in response cloudinary provides us image id and image url.
        }
    ],
    category: {
        type: String,
        required: true,
        enum: {
            values: ['Electronics', 'Accessories', 'Food', 'Books', 'Clothes', 'Shoes', 'Beauty', 'Sports'],
            message: 'Please select the correct category for product'
        }
    },
    seller: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        maxlength: 5,
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: { type: String, required: true },
            rating: { type: Number, required: true },
            comment: { type: String, required: true }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }

})

const Product = mongoose.model("Product", productSchema)

const productValidation = (product) => {
    const imageSchema = Joi.object({
        public_id: Joi.string().required(),
        url: Joi.string().required()
    })
    const reviewSchema = Joi.object({
        name: Joi.string().required(),
        rating: Joi.number().required(),
        comment: Joi.string().required()
    })
    const schema = Joi.object({
        name: Joi.string().min(3).max(1000).required(),
        price: Joi.number().required().default(0),
        description: Joi.string().required(),
        rating: Joi.number().default(0),
        images: Joi.array().items(imageSchema).min(1).required(),
        category: Joi.string().required(),
        seller: Joi.string().required(),
        stock: Joi.number().default(0).required(),
        numOfReviews: Joi.number().required().default(0),
        reviews: Joi.array().items(reviewSchema).min(1)
    })
    return schema.validate(product)
}


exports.validation = productValidation;
exports.Product = Product;