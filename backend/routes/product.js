const express = require('express')
const { Product, validation } = require('../models/productModel')
const _ = require('lodash');

const router = express.Router()


// get all products
router.get('/products', async (req, res) => {

    let { pageNumber, pageSize } = req.query

    pageNumber = Number(Math.round(pageNumber));
    pageSize = Number(Math.round(pageSize))

    if (typeof pageNumber !== "number" || typeof pageSize !== "number") return res.status(400).send("Please Send pageNumber and pageSize in Number Format ")

    const product = await Product
        .find()
        .sort('_id')
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
    return res.status(200).json({
        success: true,
        product
    })
})


// get products by category
router.get('/products/query', async (req, res) => {
    // converting the query object to array of values
    const categories = Object.values(req.query)

    let { pageNumber, pageSize } = req.query
    pageNumber = Number(Math.round(pageNumber));
    pageSize = Number(Math.round(pageSize))

    if (typeof pageNumber !== "number" || typeof pageSize !== "number") return res.status(400).send("Please Send pageNumber and pageSize in Number Format ")

    const product = await Product
        .find({ category: { $in: categories } })
        .sort('category')
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
    return res.status(200).send({
        success: true,
        product
    })
})

// Search product by name
router.get('/products/search', async (req, res) => {

    let { pageNumber, pageSize } = req.query
    pageNumber = Number(Math.round(pageNumber));
    pageSize = Number(Math.round(pageSize))

    if (typeof pageNumber !== "number" || typeof pageSize !== "number") return res.status(400).send("Please Send pageNumber and pageSize in Number Format ")

    const regexp = new RegExp(".*" + req.query.name + ".*", "i")
    console.log(regexp)
    let product = await Product
        .find({ name: regexp })
    if (product.length >= 5) {
        product = await Product
            .find({ name: regexp })
            .sort('name')
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
    }
    if (product.length === 0) return res.status(400).send(`${req.query.name} is not present in the list`)

    res.status(200).send({
        success: true,
        product
    })
})

// get a single product by id
router.get('/product/:id', async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (!product) return res.status(400).send({
        success: false,
        message: "The Product with given id is not present...."
    })

    res.send({
        success: true,
        product
    })
})

// post a product 
//By admin
router.post('/admin/product/new', async (req, res) => {
    const { error } = validation(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    let product = new Product(_.pick(req.body, [
        'name', 'price', 'description', 'rating', 'images', 'category', 'seller', 'stock', 'numOfReviews', 'reviews'
    ]))
    product = await product.save()
    res.send(product)
})

// Update a product 
// By admin
router.put('/admin/product/:id', async (req, res) => {
    const { error } = validation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const product = await Product.findByIdAndUpdate(req.params.id,
        req.body, { new: true, runValidators: true, useFindAndModify: false }
    )
    if (!product) return res.status(400).send({
        success: false,
        message: "The Product with the given id is not present"
    })
    res.send(product)
})
// delete a product 
// By admin
router.delete('/admin/product/:id', async (req, res) => {
    const product = await Product.findByIdAndRemove(req.params.id)
    if (!product) return res.status(400).send({
        success: false,
        message: "The Product with the given id is not present.."
    })
    res.send({
        success: true,
        message: "Product has been deleted successfully..."
    })
})

module.exports = router;