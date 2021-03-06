const express = require('express');
const Joi = require('joi');
const router = express.Router();
const auth = require('../middleware/auth')
const { Product } = require('../models/productModel')
const { User } = require('../models/userModel')


// post or put a review
// protected by user who is loggedIn
router.post('/review', auth, async (req, res) => {
    // Joi validation
    const { error } = reviewValidation(req.body)
    if (error) {
        console.log(error.details[0].message)
        return res.status(400).send(error.details[0].message)
    }

    // destructuring the req.body
    const { rating, comment, productId } = req.body
    const user = await User.findById(req.user._id).select("name")
    // create review object
    const review = {
        user: user._id,
        name: user.name,
        rating: Number(rating),
        comment
    }

    // find product  by id
    const product = await Product.findById(productId)
    if (!product) return res.status(400).send("The Product with the given id is not present")
    // find if current user reviewed?
    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {
        // loop through the reviews for selecting and updating it
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment
                review.rating = rating
            }
        })
    } else {
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }

    //get all ratings
    let ratings = product.reviews.map(review => review.rating)
    // update the average rating
    avgRatings = ratings.reduce((a, b) => a + b, 0) / ratings.length

    product.rating = avgRatings.toFixed(2)

    // save the product
    await product.save({ validateBeforeSave: false })

    res.send({
        success: true,
        review: { rating, comment, productId }
    })
})


// Deleting review and updating the product
// protected by user/admin
//  /api/v1/delete/review?productId=34567&reviewId=234567886543

router.delete('/delete/review', auth, async (req, res) => {

    const { productId, reviewId } = req.query
    if (!productId || !reviewId) return res.status(400).send("Provide the reviewId and productId")
    const product = await Product.findById(productId)
    if (!product) return res.status(400).send("either you didn't provided the productId query or the productId is not correct")

    // extract the reviews
    let { reviews } = product

    // select current review
    const review = reviews.find(r => r._id.toString() === reviewId.toString())
    if (!review) return res.status(400).send("Review with given id is not present...")

    // check for User authorization
    if (review.user.toString() !== req.user._id.toString()) {
        return res.status(400).send("You are not authorized to delete this review")
    }

    // check for User authorization
    if (review.user.toString() === req.user._id.toString()) {
        // delete the review
        reviews = reviews.filter(review => review._id.toString() !== reviewId.toString())

    }


    // calculating number of reviews
    product.numOfReviews = reviews.length

    // calculate rating
    product.ratings = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

    // update reviews
    product.reviews = reviews


    await product.save({ validateBeforeSave: false })
    res.send({
        success: true,
        message: "the given review has been deleted successfully..."
    })
})


// post review validation
const reviewValidation = (review) => {
    const schema = Joi.object({
        rating: Joi.number().required().valid(1, 2, 3, 4, 5),
        comment: Joi.string().required().min(1),
        productId: Joi.string().required()
    })
    return schema.validate(review)
}


module.exports = router;