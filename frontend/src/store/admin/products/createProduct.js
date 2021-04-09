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
        newProduct: false,
    },
    reducers: {
        createNewProductAdminRequest: (admin, action) => {
            admin.loading = true
        },
        createNewProductAdminSuccess: (admin, action) => {
            admin.loading = false
            admin.newProduct = action.payload.success
        },
        createNewProductAdminFailed: (admin, action) => {
            admin.loading = false
            admin.error = action.payload
        },
        resettingCreateProduct: (admin, action) => {
            admin.loading = false
            admin.error = null
            admin.newProduct = false
        }
    },
})


export default slice.reducer
////////////////////////////////////////////////////////////////////////////
//                                      actions
////////////////////////////////////////////////////////////////////////////

const { createNewProductAdminFailed, createNewProductAdminRequest, createNewProductAdminSuccess, resettingCreateProduct } = slice.actions

export const creatingNewProductAdminRequest = (data) => (dispatch) => {
    dispatch(
        apiCallBegan({
            url: "/api/v1/admin/product/new",
            method: "post",
            data,
            headers: { "Content-Type": 'multipart/form-data' },
            onStart: createNewProductAdminRequest.type,
            onSuccess: createNewProductAdminSuccess.type,
            onError: createNewProductAdminFailed.type
        })
    )
}
export const reset = () => resettingCreateProduct()