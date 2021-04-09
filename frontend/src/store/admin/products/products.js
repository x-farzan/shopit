import { createSlice } from "@reduxjs/toolkit"
import { apiCallBegan } from "../../api"


////////////////////////////////////////////////////////////////////
//                              Reducers
////////////////////////////////////////////////////////////////////

const slice = createSlice({
    name: "admin",
    initialState: {
        // GetProductState
        gPLoading: false,
        gPError: null,
        products: [],
        // Create Product State
        cPLoading: false,
        cPError: null,
        newProduct: false,
        // Update Product State
        uPLoading: false,
        uPError: null,
        isUpdated: false,
        // Delete Product State
        dPLoading: false,
        dPError: null,
        deleteProduct: "",
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
        },
        createNewProductAdminRequest: (admin, action) => {
            admin.cPLoading = true
        },
        createNewProductAdminSuccess: (admin, action) => {
            admin.cPLoading = false
            admin.newProduct = action.payload.success
        },
        createNewProductAdminFailed: (admin, action) => {
            admin.cPLoading = false
            admin.cPError = action.payload
        },
        resettingCreateProduct: (admin, action) => {
            admin.cPLoading = false
            admin.cPError = null
            admin.newProduct = false
        },
        updateProductRequest: (admin, action) => {
            admin.uPLoading = true
            admin.isUpdated = false
            admin.uPError = null
        },
        updateProductSuccess: (admin, action) => {
            admin.uPLoading = false
            admin.isUpdated = action.payload.success
        },
        updateProductFailed: (admin, action) => {
            admin.uPLoading = false
            admin.uPError = action.payload
        },
        resettingUpdateProduct: (admin, action) => {
            admin.uPLoading = false
            admin.uPError = null
            admin.isUpdated = false
        },
        deleteProductRequest: (admin, action) => {
            admin.dPLoading = true
            admin.deleteProduct = ""
            admin.dPError = null
        },
        deleteProductSuccess: (admin, action) => {
            admin.dPLoading = false
            admin.deleteProduct = action.payload.msg
            admin.products = action.payload.products
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

const {
    getAllProductsAdminFailed,
    getAllProductsAdminRequest,
    getAllProductsAdminSuccess,
    resettingGetProducts,
    createNewProductAdminFailed,
    createNewProductAdminRequest,
    createNewProductAdminSuccess,
    resettingCreateProduct,
    updateProductFailed,
    updateProductRequest,
    updateProductSuccess,
    resettingUpdateProduct,
    deleteProductFailed,
    deleteProductRequest,
    deleteProductSuccess,
    resettingDeleteProduct

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
export const resetGetProducts = () => resettingGetProducts()

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
export const resetCreateProduct = () => resettingCreateProduct()

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

export const resetUpdateProduct = () => resettingUpdateProduct()


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