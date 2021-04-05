import { combineReducers } from '@reduxjs/toolkit';

import productsReducer from './products'
import productDetailReducer from './productDetails'
import cartReducer from './cart'
import orderReducer from "./order"
import reviewReducer from './review'
export default combineReducers({
    products: productsReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    orders: orderReducer,
    reviews: reviewReducer
})