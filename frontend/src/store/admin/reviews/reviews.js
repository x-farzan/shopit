import { createSlice } from "@reduxjs/toolkit"
import { apiCallBegan } from "../../api"


////////////////////////////////////////////////////////////////////
//                              Reducers
////////////////////////////////////////////////////////////////////

const slice = createSlice({
    name: "admin",
    initialState: {
        dRLoading: false,
        dRError: null,
        isReviewDeleted: false,
        message: "",
        gRLoading: false,
        gRError: null,
        reviews: []
    },
    reducers: {
        getAllReviewsRequest: (admin, action) => {
            admin.gRLoading = true
            admin.gRError = null
        },
        getAllReviewsSuccess: (admin, action) => {
            admin.gRLoading = false
            admin.reviews = action.payload
        },
        getAllReviewsFailed: (admin, action) => {
            admin.gRLoading = false
            admin.gRError = action.payload
        },
        deleteReviewRequest: (admin, action) => {
            admin.dRLoading = true
            admin.dRError = null
        },
        deleteReviewSuccess: (admin, action) => {
            admin.dRLoading = false
            admin.isReviewDeleted = action.payload.success
            admin.message = action.payload.msg
            admin.reviews = action.payload.reviews
        },
        deleteReviewFailed: (admin, action) => {
            admin.dRLoading = false
            admin.dRError = action.payload
        },
        resettingGetAllReviews: (admin, action) => {
            admin.gRLoading = false
            admin.gRError = null
            admin.reviews = []
        },
        resettingDeleteReview: (admin, action) => {
            admin.dRLoading = false
            admin.dRError = null
            admin.isReviewDeleted = false
            admin.message = ""
        }
    },
})


export default slice.reducer
////////////////////////////////////////////////////////////////////////////
//                                      actions
////////////////////////////////////////////////////////////////////////////

const {
    deleteReviewFailed,
    deleteReviewRequest,
    deleteReviewSuccess,
    resettingDeleteReview,
    getAllReviewsFailed,
    getAllReviewsRequest,
    getAllReviewsSuccess,
    resettingGetAllReviews
} = slice.actions

export const deletingReviewRequest = (productId, reviewId) => dispatch => {
    dispatch(
        apiCallBegan({
            url: `/api/v1/admin/product/review?product_id=${productId}&review_id=${reviewId}`,
            method: "delete",
            onStart: deleteReviewRequest.type,
            onSuccess: deleteReviewSuccess.type,
            onError: deleteReviewFailed.type
        })
    )
}
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
export const resetGetAllReview = () => resettingGetAllReviews()

export const resetDeleteReview = () => resettingDeleteReview()