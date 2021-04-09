import { createSlice } from "@reduxjs/toolkit"
import { apiCallBegan } from "../../api"


////////////////////////////////////////////////////////////////////
//                              Reducers
////////////////////////////////////////////////////////////////////

const slice = createSlice({
    name: "admin",
    initialState: {
        dPLoading: false,
        dPError: null,
        deleteProduct: "",
    },
    reducers: {
        deleteProductRequest: (admin, action) => {
            admin.dPLoading = true
            admin.deleteProduct = ""
            admin.dPError = null
        },
        deleteProductSuccess: (admin, action) => {
            admin.dPLoading = false
            admin.deleteProduct = action.payload.msg
        },
        deleteProductFailed: (admin, action) => {
            admin.dPLoading = false
            admin.dPError = action.payload
        },
        resettingDeleteProduct: (admin, action) => {
            admin.dPLoading = false
            admin.dPError = null
            admin.deleteProduct = ""
        }
    },
})


export default slice.reducer
////////////////////////////////////////////////////////////////////////////
//                                      actions
////////////////////////////////////////////////////////////////////////////

const { deleteProductFailed, deleteProductRequest, deleteProductSuccess, resettingDeleteProduct } = slice.actions

export const deletingProductRequest = (id) => dispatch => {
    dispatch(
        apiCallBegan({
            url: `/api/v1/admin/delete/product/${id}`,
            method: "delete",
            onStart: deleteProductRequest.type,
            onSuccess: deleteProductSuccess.type,
            onError: deleteProductFailed.type
        })
    )
}

export const resetDeleteProduct = () => resettingDeleteProduct()