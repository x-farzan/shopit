import { combineReducers } from '@reduxjs/toolkit';

import productsReducer from './products'
import productDetailReducer from './productDetails'
import cartReducer from './cart'

export default combineReducers({
    products: productsReducer,
    productDetail: productDetailReducer,
    cart: cartReducer
})