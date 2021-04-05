import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from './api'


//////////////////////////////////////////////////////////////////////
//                          Reducers
////////////////////////////////////////////////////////////////////// 
const slice = createSlice({
    name: "reviews",
    initialState: {
        loading: false,
        error: null,
        list: []
    },
    reducers: {
        createReviewRequest: (review, action) => {
            review.loading = true
        },
        createReviewSuccess: (review, action) => {
            review.loading = false
            review.list = action.payload.review
            review.error = null
        },
        createReviewFailed: (review, action) => {
            review.loading = false
            review.error = action.payload
        },
        clearErrors: (review, action) => {
            review.loading = false
            review.error = null
        }
    }
})


export default slice.reducer;

//////////////////////////////////////////////////////////////////////
//                          Actions
//////////////////////////////////////////////////////////////////////
const {
    clearErrors,
    createReviewFailed,
    createReviewRequest,
    createReviewSuccess
} = slice.actions

export const creatingReviewRequest = (data) => (dispatch) => {
    dispatch(
        apiCallBegan({
            url: "/api/v1/review",
            method: "post",
            data,
            headers: { "Content-Type": 'application/json' },
            onStart: createReviewRequest.type,
            onSuccess: createReviewSuccess.type,
            onError: createReviewFailed.type
        })
    )
}
export const clearingReviewErrors = () => clearErrors()