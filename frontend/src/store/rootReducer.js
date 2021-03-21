import { combineReducers } from '@reduxjs/toolkit';

import productsReducer from './products'

export default combineReducers({
    products: productsReducer
})