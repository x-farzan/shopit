const express = require('express');
const router = express.Router()
const auth = require('../middleware/auth')
const Joi = require('joi');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

//process stripe payment => /api/v1/payment/process
// protected by user
router.post("/payment/process", auth, async (req, res) => {
    const paymentIntent = await stripe.paymentIntent.create({
        amount: req.body.amount,
        currency: "usd",
        metadata: { integration_check: "accept_a_payment" }
    })

    res.status(200).send({
        success: true,
        client_secret: paymentIntent.client_secret
    })
})


// send Stripe API Key => /api/v1/stripeapi
// protected by user
router.get('/stripeapi', auth, async (req, res) => {
    res.send({
        stripeApiKey: process.env.STRIPE_API_KEY
    })
})

module.exports = router

