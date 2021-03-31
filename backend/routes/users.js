const express = require('express');
const { User, validation, updateUserValidation } = require('../models/userModel')
const _ = require('lodash')
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const sendToken = require('../utils/jwtToken');
const router = express.Router();
const cloudinary = require("cloudinary")

// get self profile
// protected
router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id)
        .select('-password')
    //
    res.send(user)
})


// register a user
router.post('/users', async (req, res) => {

    // const { avatar } = req.files
    const { name, email, password, avatar } = req.body
    // check if user is already exists
    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send("User already exists")

    // Check if avatar is not uploaded
    if (avatar === '') return res.status(400).send("No File Uploaded")

    // joi validation
    let userData = {
        name,
        email,
        password,
        avatar: {
            public_id: "Some string",
            url: "Some String"
        }
    }
    // joi validation for error
    const { error } = validation(userData)
    if (error) return res.status(400).send(error.details[0].message)


    const result = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatar",
        width: 150,
        crop: 'scale'
    })

    const { public_id, secure_url } = result
    userData = {
        name,
        email,
        password,
        avatar: {
            public_id,
            url: secure_url
        }
    }
    user = new User(userData)

    await user.save();

    sendToken(user, 200, res)

})

// update the existing  user
// protecting by user
router.post('/user/update', auth, async (req, res) => {
    let user = await User.findById(req.user._id)

    const { name, email, avatar } = req.body
    if (avatar === '') return res.status(400).send("No File Uploaded")

    // joi data validation
    let userData = {
        name,
        email,
        avatar: {
            public_id: user.avatar.public_id,
            url: user.avatar.url
        }
    }
    // joi validation for error
    const { error } = updateUserValidation(userData)
    if (error) return res.status(400).send(error.details[0].message)

    // check if user changed the email
    if (user.email !== email) {
        // check if user is already exists
        let existingUser = await User.findOne({ email })
        if (existingUser) return res.status(400).send("This Email is already registered by a different User, Use another email")
    }


    // delete the picture from cloudinary
    await cloudinary.v2.uploader.destroy(user.avatar.public_id)
    // upload new picture to cloudinary
    const result = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatar",
        width: 150,
        crop: 'scale'
    })
    const { public_id, secure_url } = result

    // update userData
    userData = {
        name,
        email,
        avatar: {
            public_id,
            url: secure_url
        }
    }

    // check if the user does not changed the email
    if (user.email === email) {
        user = await User.findByIdAndUpdate(user._id, {
            $set: userData

        }, { new: true, runValidators: true, useFindAndModify: false })
    }

    await user.save();

    sendToken(user, 200, res)
})

module.exports = router
