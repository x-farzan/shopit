const express = require('express');
const _ = require('lodash')
const bcrypt = require('bcrypt');
const { User } = require('../models/userModel')
const PasswordComplexity = require('joi-password-complexity');
const Joi = require('joi');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto')
const router = express.Router();


// login
router.post('/auth', async (req, res) => {
    // check for error
    const { error } = validation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // check if user doesnot exists
    let user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send("Invalid Email or Password")

    // validate the password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("Invalid Email or Password")


    sendToken(user, 200, res)
})

// logout router
router.get('/logout', async (req, res) => {

    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).send({
        success: true,
        message: "Logged Out..."
    })
})


// forgot password
router.post('/password/reset', async (req, res) => {
    // validate entered email syntax
    const { error } = validateForgotPassEmail(req.body)
    if (error) return res.status(400).send(error.message[0].details)

    // check for user presence
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("This email is not registered. send a valid email")

    // get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false })

    // create resetPassword url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`

    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\n If You have not requested this email, than forgot it`;

    try {
        await sendEmail({
            email: user.email,
            subject: "ShopIT password recovery email",
            message
        })
        res.send({
            success: true,
            message: `Email send to ${user.email}`
        })

    } catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false })
        return new Error("internal server error")
    }

})

// Reset Password

router.put('/password/reset/:token', async (req, res) => {

    // hash url token
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) return res.status(400).send(" Password reset token in invalid or has been expired")

    if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).send("Password doesnot match")
    }

    // setup new password
    user.password = req.body.password

    user.resetPasswordExpire = undefined
    user.resetPasswordToken = undefined

    await user.save()

    sendToken(user, 200, res)

})

const validateForgotPassEmail = req => {
    const schema = Joi.object({
        email: Joi.string().min(5).required().email()
    })
    return schema.validate(req)
}
const validation = (req) => {
    const schema = Joi.object({
        email: Joi.string().min(5).required().email(),
        password: new PasswordComplexity({
            min: 8,
            max: 50,
            lowerCase: 1,
            upperCase: 1,
            numeric: 1,
            symbol: 1
        }).required()
    })
    return schema.validate(req)
}


module.exports = router;