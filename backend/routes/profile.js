const express = require('express');
const { User } = require('../models/userModel')
const _ = require('lodash')
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const router = express.Router();
const sendToken = require('../utils/jwtToken');
const Joi = require('joi');
const PasswordComplexity = require('joi-password-complexity')

// get self profile
// protected
router.get('/users/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id)
        .select('-password')
    //
    res.send(user)
})


//update password
// protected
router.put('/users/me/update/password', auth, async (req, res) => {
    let user = await User.findById(req.user._id)

    console.log(user)

    // Joi validate new entered passwords
    const passwords = _.pick(req.body, ['newPassword', 'confirmPassword'])
    console.log(passwords)
    const { error } = validation(passwords)
    if (error) return res.status(400).send(error.message[0].details)

    // validate the current password
    const currentValidPassword = await bcrypt.compare(req.body.currentPassword, user.password);

    if (!currentValidPassword) return res.status(400).send("Invalid current password")


    // validating new passwords equality
    if (req.body.newPassword !== req.body.confirmPassword) {
        return res.status(400).send("New password and confirm password should be same")
    }

    // updating password
    user.password = req.body.newPassword

    // save in DB
    await user.save()

    sendToken(user, 200, res)


})

const validation = (req) => {
    const schema = Joi.object({
        newPassword: new PasswordComplexity({
            min: 8,
            max: 50,
            lowerCase: 1,
            upperCase: 1,
            numeric: 1,
            symbol: 1
        }).required(),
        confirmPassword: new PasswordComplexity({
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