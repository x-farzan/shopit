const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "This router will show all products in database..."
    })
})

module.exports = router;