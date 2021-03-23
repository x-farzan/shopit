import { combineReducers } from '@reduxjs/toolkit';

import productsReducer from './products'
import productDetailReducer from './productDetails'
import metaDataReducer from './metaData'

export default combineReducers({
    products: productsReducer,
    productDetail: productDetailReducer,
    metaData: metaDataReducer
})