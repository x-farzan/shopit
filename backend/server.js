const express = require('express');
const cloudinary = require('cloudinary')
const app = express()
const path = require("path")
const fileUpload = require('express-fileupload');
app.use(fileUpload())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const dotenv = require('dotenv');

// setting dotenv
dotenv.config();
const startupDebugger = require('debug')('app:startup')


// joi objectid validation
require('./startup/validation')()
// get all routes
require('./startup/routers')(app)
//cloudinary

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
// conect to database
require('./startup/db')();
// logging messages
require('./startup/logging')();

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
    console.log("production mode")
    app.use(express.static(path.join(__dirname, "frontend/build")))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
    })
} else {
    app.get("/", (req, res) => {
        res.send("Api is Running")
    })
}

app.listen(process.env.PORT, () => {
    startupDebugger(`Server Started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode...`)
})