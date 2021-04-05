import { createSlice } from "@reduxjs/toolkit"
import { apiCallBegan } from "./api"


/////////////////////////////////////////////////////////////////////////
//                          Reducers
/////////////////////////////////////////////////////////////////////////

const slice = createSlice({
    name: "admin",
    initialState: {
        loading: false,
        error: null,
        products: []
    },
    reducers: {
        getAllProductsAdminRequest: (admin, action) => {
            admin.loading = true
        },
        getAllProductsAdminSuccess: (admin, action) => {
            admin.loading = false
            admin.products = action.payload.products
        },
        getAllProductsAdminFailed: (admin, action) => {
            admin.loading = false
            admin.error = action.payload
        },
        clearAdminError: (admin, action) => {
            admin.error = null;
            admin.loading = false
        }

    }
})

export default slice.reducer


/////////////////////////////////////////////////////////////////////////
//                          Actions
/////////////////////////////////////////////////////////////////////////

const {
    getAllProductsAdminFailed,
    getAllProductsAdminRequest,
    getAllProductsAdminSuccess,
    clearAdminError
} = slice.actions

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
export const clearingAdminErrors = () => clearAdminError()