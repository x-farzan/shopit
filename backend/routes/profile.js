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
// protected by user
router.put('/users/me/update/password', auth, async (req, res) => {
    let user = await User.findById(req.user._id)


    // Joi validate new entered passwords
    const passwords = _.pick(req.body, ['newPassword', 'confirmPassword'])
    console.log(passwords)
    const { error } = updatePasswordValidation(passwords)
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

// update users profile 
// protected by user
router.put('/users/me/update/profile', auth, async (req, res) => {
    // joi validation
    const { error } = updateProfileValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    // updating profile
    const newUserUpdate = {
        name: req.body.name,
        email: req.body.email
    }
    // check if the entered email is already in use
    const duplicateEmail = await User.findOne({ email: req.body.email })

    if (duplicateEmail) return res.status(400).send("This email is already exists")

    const user = await User.findByIdAndUpdate(req.user._id, newUserUpdate, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    // we'll add the functionality letter to update the profile pic when we'll add the cloudinary

    // todo for cloudinary

    res.send(user)

})

const updatePasswordValidation = (req) => {
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
const updateProfileValidation = req => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().min(5).required().email()
    })
    return schema.validate(req)
}


module.exports = router;