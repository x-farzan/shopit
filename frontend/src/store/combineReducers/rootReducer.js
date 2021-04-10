import { combineReducers } from '@reduxjs/toolkit';

import productsReducer from '../user/products'
import productDetailReducer from '../user/productDetails'
import cartReducer from '../user/cart'
import orderReducer from "../user/order"
import reviewReducer from '../user/review'
export default combineReducers({
    products: productsReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    orders: orderReducer,
    reviews: reviewReducer
})