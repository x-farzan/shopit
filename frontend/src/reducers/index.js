import { combineReducers } from 'redux'
import productsReducer from './productsReducer'
import productDetailReducer from './productDetailReducer'

export default combineReducers({
    products: productsReducer,
    productDetail: productDetailReducer
})