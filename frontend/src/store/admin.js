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
        products: [],
        newProduct: {}
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
        },
        createNewProductAdminRequest: (admin, action) => {
            admin.loading = true
        },
        createNewProductAdminSuccess: (admin, action) => {
            admin.loading = false
            admin.newProduct = action.payload
        },
        createNewProductAdminFailed: (admin, action) => {
            admin.loading = false
            admin.error = action.payload
        },
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
    clearAdminError,
    createNewProductAdminFailed,
    createNewProductAdminRequest,
    createNewProductAdminSuccess
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
export const clearingAdminErrors = () => clearAdminError()