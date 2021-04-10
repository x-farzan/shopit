const express = require('express')
const { Product, validation } = require('../models/productModel')
const { User } = require('../models/userModel')
const _ = require('lodash');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const cloudinary = require("cloudinary")
const router = express.Router()


// get all products
router.get('/countproducts', async (req, res) => {

    const products = await Product
        .find()
        .sort('_id')

    setTimeout(() => {
        return res.status(200).json({
            success: true,
            count: products.length,
        })
    }, 0);

})

// get paginated products
router.get('/products', async (req, res) => {

    let { pageNumber, pageSize } = req.query

    pageNumber = Number(Math.round(pageNumber));
    pageSize = Number(Math.round(pageSize))

    if (typeof pageNumber !== "number" || typeof pageSize !== "number") return res.status(400).send("Please Send pageNumber and pageSize in Number Format ")

    const products = await Product
        .find()
        .sort('_id')
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)

    setTimeout(() => {
        return res.status(200).json({
            success: true,
            products
        })
    }, 0);

})


// Search products by name
router.get('/products/searchbyname', async (req, res) => {
    let { name } = req.query
    console.log(name)
    const regexp = new RegExp(".*" + name + ".*", "i")

    let products = await Product
        .find({ name: regexp })
        .sort('name')

    res.status(200).send({
        success: true,
        products,
    })
})


// Search products by price
router.get('/products/searchbyprice', async (req, res) => {
    let { name, min, max } = req.query

    const regexp = new RegExp(".*" + name + ".*", "i")
    let products;
    products = await Product
        .find({ name: regexp, price: { $gte: min, $lte: max } })
        .sort('-price')

    res.status(200).send({
        success: true,
        products,
    })
})

// Search products by category
router.get('/products/searchbycategory', async (req, res) => {
    let { name, min, max, c } = req.query

    // convert the categories strings in array
    const cat = c.split(',')

    const regexp = new RegExp(".*" + name + ".*", "i")
    let products;

    // console.log(name, min, max)
    if (cat[0] !== '') {

        products = await Product
            .find({ name: regexp, price: { $gte: min, $lte: max }, category: { $in: cat } })
            .sort('-price')
    }
    if (cat[0] === '') {
        products = await Product
            .find({ name: regexp, price: { $gte: min, $lte: max } })
            .sort('-price')
    }


    res.status(200).send({
        success: true,
        products,
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

// get all product by
// protected by admin
router.get('/admin/products', [auth, admin], async (req, res) => {
    const products = await Product.find().select("price stock name")
    res.send({
        success: true,
        products
    })
})

// post a product 
//By admin
router.post('/admin/product/new', [auth, admin], async (req, res) => {

    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }
    let imagesLinks = []

    // console.log(req.body)
    console.log("Upper")

    for (let i = 0; i < images.length; i++) {

        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products"
        });
        console.log("Inside")
        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }
    console.log("Lower")

    const { name, price, description, category, stock, seller } = req.body
    const data = {
        name,
        price,
        category,
        description,
        stock,
        seller,
        images: imagesLinks,
        user: req.user._id

    }

    const { error } = validation(data)
    if (error) {
        console.log(error.details[0].message)
        return res.status(400).send(error.details[0].message)
    }
    let product = new Product(data)
    product = await product.save()
    res.send({
        success: true,
        product
    })
})

// Update a product 
// By admin
router.put('/admin/update/product/:id', [auth, admin], async (req, res) => {


    let images = []
    let imagesLinks = []

    let product = await Product.findById(req.params.id)
    if (req.body.images !== undefined) {

        if (!product) return res.status(400).send({
            success: false,
            message: "The Product with the given id is not present.."
        })
        for (let i = 0; i < product.images.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
        }

        if (typeof req.body.images === 'string') {
            images.push(req.body.images)
        } else {
            images = req.body.images
        }


        for (let i = 0; i < images.length; i++) {

            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products"
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

    }

    if (req.body.images === undefined) {
        console.log("hy")

        product.images.forEach(img => {
            imagesLinks.push({
                public_id: img.public_id,
                url: img.url
            })
        })
    }
    const { name, price, description, category, stock, seller } = req.body
    const data = {
        name,
        price,
        category,
        description,
        stock,
        seller,
        images: imagesLinks,
        user: req.user._id

    }

    const { error } = validation(data)
    if (error) {
        console.log(error.details[0].message)
        return res.status(400).send(error.details[0].message)
    }
    product.name = name
    product.price = price
    product.category = category
    product.description = description
    product.stock = stock
    product.seller = seller
    product.images = imagesLinks
    product.user = req.user._id
    await product.save()
    res.send({
        success: true,
        product
    })
})

// delete a product 
// By admin
router.delete('/admin/delete/product/:id', [auth, admin], async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (!product) return res.status(400).send({
        success: false,
        message: "The Product with the given id is not present.."
    })
    for (let i = 0; i < product.images.length; i++) {
        const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)

    }
    await product.remove()
    const products = await Product.find().sort("_id").select("price stock name")
    if (products.length === 0) return res.status(400).send("No Products Available..")
    res.send({
        success: true,
        msg: "Product has been deleted successfully...",
        products
    })
})

module.exports = router;