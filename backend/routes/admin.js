const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const { User } = require('../models/userModel')
const { Product } = require('../models/productModel')
const Joi = require('joi')
const cloudinary = require("cloudinary")
const mongoose = require('mongoose')
// get all users
// protected
router.get('/admin/all/users', [auth, admin], async (req, res) => {
    const users = await User.find().sort('_id')

    if (users.length === 0) return res.status(400).send("No Users Available..")

    res.send(users)
})

// get a single users detail
// protected by admin
router.get('/admin/user/:id', [auth, admin], async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(400).send("User With the given id is not present")
    res.send(user)
})

// update a user by admin
// protected

router.put('/admin/user/:id', [auth, admin], async (req, res) => {
    // joi validation
    const { error } = updateUserValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    // updating profile
    const newUserUpdate = {
        name: req.body.name,
        role: req.body.role,
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserUpdate, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.send({
        user,
        success: true
    })

})

// delete a User 
// By admin
router.delete('/admin/user/:id', [auth, admin], async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.id, { useFindAndModify: false })
    if (!user) return res.status(400).send({
        success: false,
        message: "The User with the given id is not present.."
    })
    await cloudinary.v2.uploader.destroy(user.avatar.public_id)
    res.send({
        success: true,
        message: "User has been deleted successfully..."
    })
})

// Get All Reviews of a product
router.get("/admin/reviews/product/:id", [auth, admin], async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send("Invalid Product ID")
    }
    const product = await Product.findById(req.params.id).sort("_id")
    if (!product) return res.status(400).send("Product With the given ID is not present")
    reviews = product.reviews
    if (reviews.length === 0) return res.status(400).send("No Reviews")
    res.send(reviews)
})

//Delete a Reviews of a product
// protected by admin
router.delete("/admin/product/review", [auth, admin], async (req, res) => {
    const { product_id, review_id } = req.query
    if (!mongoose.Types.ObjectId.isValid(product_id)) {
        return res.status(400).send("Invalid Product ID")
    }
    if (!mongoose.Types.ObjectId.isValid(review_id)) {
        return res.status(400).send("Invalid Review ID")
    }
    const product = await Product.findById(product_id).sort("_id")
    if (!product) return res.status(400).send("Product With the given ID is not present")
    let { reviews } = product
    if (reviews.length === 0) return res.status(400).send("No Reviews Are Available for this product")
    reviews = reviews.filter(review => review._id.toString() !== review_id.toString())
    product.reviews = reviews
    product.numOfReviews = reviews.length

    let rating = reviews.length !== 0 && reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

    if (reviews.length === 0) {
        rating = 0
    }

    // // calculate rating
    product.rating = rating
    console.log(product_id, review_id, reviews, product.reviews, product.numOfReviews, product.rating)
    await product.save()
    res.send({
        success: true,
        msg: "Review Has Been Removed Successfully",
    })
})

// update user validation
const updateUserValidation = req => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        role: Joi.string().required().valid('user', 'admin')
    })
    return schema.validate(req)
}




module.exports = router