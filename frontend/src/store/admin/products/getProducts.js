import { createSlice } from "@reduxjs/toolkit"
import { apiCallBegan } from "../../api"


////////////////////////////////////////////////////////////////////
//                              Reducers
////////////////////////////////////////////////////////////////////

const slice = createSlice({
    name: "admin",
    initialState: {
        gPLoading: false,
        gPError: null,
        products: [],
    },
    reducers: {
        getAllProductsAdminRequest: (admin, action) => {
            admin.gPLoading = true
            admin.gPError = null
        },
        getAllProductsAdminSuccess: (admin, action) => {
            admin.gPLoading = false
            admin.products = action.payload.products
        },
        getAllProductsAdminFailed: (admin, action) => {
            admin.gPLoading = false
            admin.gPError = action.payload
        },
        resettingGetProducts: (admin, action) => {
            admin.gPLoading = false
            admin.gPError = null
            admin.products = []
        }
    },
})


export default slice.reducer
////////////////////////////////////////////////////////////////////////////
//                                      actions
////////////////////////////////////////////////////////////////////////////

const { getAllProductsAdminFailed, getAllProductsAdminRequest, getAllProductsAdminSuccess, resettingGetProducts } = slice.actions

export const gettingAllProductsAdminRequest = () => (dispatch) => {
    dispatch(
        apiCallBegan({
            url: "/api/v1/admin/products",
            method: "get",
            onStart: getAllProductsAdminRequest.type,
            onSuccess: getAllProductsAdminSuccess.type,
            onError: getAllProductsAdminFailed.type
        })
    )
}
export const resetGetProducts = () => resettingGetProducts()