const express = require('express');
const _ = require('lodash')
const bcrypt = require('bcrypt');
const { User } = require('../models/userModel')
const PasswordComplexity = require('joi-password-complexity');
const Joi = require('joi');
const sendToken = require('../utils/jwtToken');

const router = express.Router();


router.post('/auth', async (req, res) => {
    // check for error
    const { error } = validation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // check if user doesnot exists
    let user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send("Invalid Email or Password..")

    console.log(user.password, req.body.password)
    // validate the password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    console.log(validPassword)
    if (!validPassword) return res.status(400).send("Invalid email or password")

    sendToken(user, 200, res)

})


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