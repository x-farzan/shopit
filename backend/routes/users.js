const express = require('express');
const { User, validation } = require('../models/userModel')
const _ = require('lodash')
const bcrypt = require('bcrypt');

const router = express.Router();


// get self profile
router.get('/me', async (req, res) => {
    const user = await User.findById(req.body._id)
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

    // hashing the password
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    await user.save();

    const token = user.generateAuthToken()
    res.header('x-auth-token', token).send(_.pick(user, ['name', 'email', 'role']))
})




module.exports = router