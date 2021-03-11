const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const { User } = require('../models/userModel')

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




module.exports = router