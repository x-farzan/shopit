const { Product } = require('../models/productModel');
const { Order } = require('../models/orderModel');
const { User } = require('../models/userModel');
const products = require('../data/products')
const users = require('../data/users')
const orders = require('../data/orders')
const dotenv = require('dotenv')
const connectDB = require('../startup/db')
dotenv.config();

connectDB()

const seedProducts = async () => {
    try {
        await Product.deleteMany()
        await Product.insertMany(products)
        await Order.insertMany(orders)
        await User.insertMany(users)

        process.exit(1)
    } catch (err) {
        console.log(err.message)
        process.exit(1)
    }
}
seedProducts()