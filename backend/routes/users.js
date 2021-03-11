const express = require('express');
const { User, validation } = require('../models/userModel')
const _ = require('lodash')
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const sendToken = require('../utils/jwtToken');
const router = express.Router();


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
    // joi validation for error
    const { error } = validation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // check if user is already exists
    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send("User already exists")

    // if not present than register him/her
    user = new User(_.pick(req.body, ['name', 'email', 'password']))

    await user.save();

    sendToken(user, 200, res)

})

module.exports = router
