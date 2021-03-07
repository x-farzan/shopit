const express = require('express')
const { Product, validation } = require('../models/productModel')
const _ = require('lodash');

const router = express.Router()

router.get('/products', async (req, res) => {

    const product = await Product.find().sort('_id')
    res.status(200).json({
        success: true,
        product
    })
})

// post a product
router.post('/product/new', async (req, res) => {
    const { error } = validation(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    let product = new Product(_.pick(req.body, [
        'name', 'price', 'description', 'rating', 'images', 'category', 'seller', 'stock', 'numOfReviews', 'reviews'
    ]))
    product = await product.save()
    res.send(product)
})

module.exports = router;