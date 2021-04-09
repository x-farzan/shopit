import { combineReducers } from '@reduxjs/toolkit';
import getAllReviewsReducer from "./getAllReviews"
import deleteReviewReducer from "./deleteReview"

export default combineReducers({
    getReviews: getAllReviewsReducer,
    deleteReview: deleteReviewReducer
})