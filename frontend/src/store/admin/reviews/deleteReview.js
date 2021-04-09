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
        isReviewDeleted: false
    },
    reducers: {
        deleteReviewRequest: (admin, action) => {
            admin.loading = true
            admin.error = null
        },
        deleteReviewSuccess: (admin, action) => {
            admin.loading = false
            admin.isReviewDeleted = action.payload.success
            admin.error = action.payload.msg
        },
        deleteReviewFailed: (admin, action) => {
            admin.loading = false
            admin.error = action.payload
        },
        resettingDeleteReview: (admin, action) => {
            admin.loading = false
            admin.error = null
            admin.isReviewDeleted = false
        }
    },
})


export default slice.reducer
////////////////////////////////////////////////////////////////////////////
//                                      actions
////////////////////////////////////////////////////////////////////////////

const { deleteReviewFailed, deleteReviewRequest, deleteReviewSuccess, resettingDeleteReview } = slice.actions

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

export const reset = () => resettingDeleteReview()