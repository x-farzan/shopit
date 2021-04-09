import { combineReducers } from '@reduxjs/toolkit';
import productsReducer from "./products/products"
import ordersReducer from "./orders/order"
import usersReducer from "./users/users"
import reviewsReducer from "./reviews/reviews"
export default combineReducers({
    products: productsReducer,
    orders: ordersReducer,
    users: usersReducer,
    reviews: reviewsReducer
})