const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const { User } = require('../models/userModel')
const Joi = require('joi')
const cloudinary = require("cloudinary")
// get all users
// protected
router.get('/admin/all/users', [auth, admin], async (req, res) => {
    const users = await User.find().sort('_id')

    if (users.length === 0) return res.send("No Users Available..")

    res.send(users)
})

// get a single users detail
// protected by admin
router.get('/admin/user/:id', [auth, admin], async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(400).send("User With the given id is not present")
    res.send(user)
})

// update a user by admin
// protected

router.put('/admin/user/:id', [auth, admin], async (req, res) => {
    // joi validation
    const { error } = updateUserValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    // updating profile
    const newUserUpdate = {
        name: req.body.name,
        role: req.body.role,
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserUpdate, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.send({
        user,
        success: true
    })

})

// delete a User 
// By admin
router.delete('/admin/user/:id', [auth, admin], async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.id, { useFindAndModify: false })
    if (!user) return res.status(400).send({
        success: false,
        message: "The User with the given id is not present.."
    })
    await cloudinary.v2.uploader.destroy(user.avatar.public_id)
    res.send({
        success: true,
        message: "User has been deleted successfully..."
    })
})


// update user validation
const updateUserValidation = req => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        role: Joi.string().required().valid('user', 'admin')
    })
    return schema.validate(req)
}




module.exports = router