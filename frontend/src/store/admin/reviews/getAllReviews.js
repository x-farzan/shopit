import { createSlice } from "@reduxjs/toolkit"
import { apiCallBegan } from "../../api"


////////////////////////////////////////////////////////////////////
//                              Reducers
////////////////////////////////////////////////////////////////////

const slice = createSlice({
    name: "admin",
    initialState: {
        loading: false,
        error: null,
        reviews: []
    },
    reducers: {
        getAllReviewsRequest: (admin, action) => {
            admin.loading = true
            admin.error = null
        },
        getAllReviewsSuccess: (admin, action) => {
            admin.loading = false
            admin.reviews = action.payload
        },
        getAllReviewsFailed: (admin, action) => {
            admin.loading = false
            admin.error = action.payload
        },
        resettingGetAllReviews: (admin, action) => {
            admin.loading = false
            admin.error = null
            admin.reviews = []
        }
    },
})


export default slice.reducer
////////////////////////////////////////////////////////////////////////////
//                                      actions
////////////////////////////////////////////////////////////////////////////

const { getAllReviewsFailed, getAllReviewsRequest, getAllReviewsSuccess, resettingGetAllReviews } = slice.actions


export const gettingAllReviewsRequest = (id) => dispatch => {
    dispatch(
        apiCallBegan({
            url: `/api/v1/admin/reviews/product/${id}`,
            method: "get",
            onStart: getAllReviewsRequest.type,
            onSuccess: getAllReviewsSuccess.type,
            onError: getAllReviewsFailed.type
        })
    )
}
export const reset = () => resettingGetAllReviews()