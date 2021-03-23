import { combineReducers } from '@reduxjs/toolkit';

import productsReducer from './products'
import productDetailReducer from './productDetails'

export default combineReducers({
    products: productsReducer,
    productDetail: productDetailReducer,
})