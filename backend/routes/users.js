const express = require('express');
const { User, validation } = require('../models/userModel')
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
    // console.log("backend", req.body)

    // const { avatar } = req.files
    const { name, email, password, avatar } = req.body
    // console.log(req.body)
    if (avatar === '') return res.status(400).send("No File Uploaded")
    const result = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatar",
        width: 150,
        crop: 'scale'
    })

    const { public_id, secure_url } = result
    // console.log(result)
    const userData = {
        name,
        email,
        password,
        avatar: {
            public_id,
            url: secure_url
        }
    }
    // joi validation for error
    const { error } = validation(userData)
    if (error) return res.status(400).send(error.details[0].message)

    // check if user is already exists
    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send("User already exists")

    // if not present than register him/her
    user = new User(userData)

    await user.save();

    sendToken(user, 200, res)

})

module.exports = router
