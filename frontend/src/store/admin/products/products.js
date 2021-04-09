import { combineReducers } from '@reduxjs/toolkit';
import getProductsReducer from "./getProducts"
import createProductReducer from './createProduct'
import deleteProductReducer from "./deleteProduct"
import updateProductReducer from "./updateProduct"

export default combineReducers({
    getProducts: getProductsReducer,
    createProduct: createProductReducer,
    deleteProduct: deleteProductReducer,
    updateProduct: updateProductReducer
})