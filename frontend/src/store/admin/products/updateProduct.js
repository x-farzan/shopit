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
        isUpdated: false,
    },
    reducers: {
        updateProductRequest: (admin, action) => {
            admin.loading = true
            admin.isUpdated = false
            admin.error = null
        },
        updateProductSuccess: (admin, action) => {
            admin.loading = false
            admin.isUpdated = action.payload.success
        },
        updateProductFailed: (admin, action) => {
            admin.loading = false
            admin.error = action.payload
        },
        resettingUpdateProduct: (admin, action) => {
            admin.loading = false
            admin.error = null
            admin.isUpdated = false
        }
    },
})


export default slice.reducer
////////////////////////////////////////////////////////////////////////////
//                                      actions
////////////////////////////////////////////////////////////////////////////

const { updateProductFailed, updateProductRequest, updateProductSuccess, resettingUpdateProduct } = slice.actions


export const updatingProductRequest = (id, data) => dispatch => {
    dispatch(
        apiCallBegan({
            url: `/api/v1/admin/update/product//${id}`,
            method: "put",
            data,
            headers: { "Content-Type": 'multipart/form-data' },
            onStart: updateProductRequest.type,
            onSuccess: updateProductSuccess.type,
            onError: updateProductFailed.type
        })
    )
}

export const reset = () => resettingUpdateProduct()