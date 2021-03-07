const { Product } = require('../models/productModel');
const products = require('../data/products')
const dotenv = require('dotenv')
const connectDB = require('../startup/db')
dotenv.config();

connectDB()

const seedProducts = async () => {
    try {


        await Product.deleteMany()
        console.log("Products are deleted")
        await Product.insertMany(products)
        console.log("All Products are added")
        process.exit(1)
    } catch (err) {
        console.log(err.message)
        process.exit(1)
    }
}
seedProducts()