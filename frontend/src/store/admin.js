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
        newProduct: false,
        deleteProduct: "",
        deleteProductError: null,
        deleteProductLoading: false,
        isUpdated: false,
        orders: [],
        orderLoading: false,
        isDeleted: false,
        users: [],
        userLoading: false,
        isUserDeleted: false
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
            admin.newProduct = false
            admin.isUpdated = false
            admin.isDeleted = false
            admin.isUserDeleted = false
        },
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
        deleteProductRequest: (admin, action) => {
            admin.deleteProductLoading = true
            admin.deleteProduct = ""
        },
        deleteProductSuccess: (admin, action) => {
            admin.deleteProductLoading = false
            admin.deleteProduct = action.payload.msg
        },
        deleteProductFailed: (admin, action) => {
            admin.deleteProductLoading = false
            admin.deleteProductError = action.payload
        },
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
        getAllOrdersRequest: (admin, action) => {
            admin.loading = true
            admin.error = null
        },
        getAllOrdersSuccess: (admin, action) => {
            admin.loading = false
            admin.orders = action.payload.orders
        },
        getAllOrdersFailed: (admin, action) => {
            admin.loading = false
            admin.error = action.payload
        },
        deleteOrderRequest: (admin, action) => {
            admin.orderLoading = true
            admin.error = null
        },
        deleteOrderSuccess: (admin, action) => {
            admin.orderLoading = false
            admin.isDeleted = action.payload.success
        },
        deleteOrderFailed: (admin, action) => {
            admin.orderLoading = false
            admin.error = null
        },
        getAllUsersRequest: (admin, action) => {
            admin.loading = true;
            admin.error = null
        },
        getAllUsersSuccess: (admin, action) => {
            admin.loading = false
            admin.users = action.payload
        },
        getAllUsersFailed: (admin, action) => {
            admin.loading = false
            admin.error = action.payload
        },
        deleteUserRequest: (admin, action) => {
            admin.userLoading = true
            admin.error = null
        },
        deleteUserSuccess: (admin, action) => {
            admin.userLoading = false
            admin.isUserDeleted = action.payload.success
        },
        deleteUserFailed: (admin, action) => {
            admin.userLoading = false
            admin.error = null
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
    clearAdminError,
    createNewProductAdminFailed,
    createNewProductAdminRequest,
    createNewProductAdminSuccess,
    deleteProductFailed,
    deleteProductRequest,
    deleteProductSuccess,
    updateProductFailed,
    updateProductRequest,
    updateProductSuccess,
    getAllOrdersFailed,
    getAllOrdersRequest,
    getAllOrdersSuccess,
    deleteOrderFailed,
    deleteOrderRequest,
    deleteOrderSuccess,
    getAllUsersFailed,
    getAllUsersRequest,
    getAllUsersSuccess,
    deleteUserFailed,
    deleteUserRequest,
    deleteUserSuccess
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

export const gettingAllOrders = () => dispatch => {
    dispatch(
        apiCallBegan({
            url: `/api/v1/admin/orders`,
            method: "get",
            onStart: getAllOrdersRequest.type,
            onSuccess: getAllOrdersSuccess.type,
            onError: getAllOrdersFailed.type
        })
    )
}
export const deletingOrderRequest = (id) => dispatch => {

    dispatch(
        apiCallBegan({
            url: `/api/v1/admin/delete/order/${id}`,
            method: 'delete',
            onStart: deleteOrderRequest.type,
            onSuccess: deleteOrderSuccess.type,
            onError: deleteOrderFailed.type
        })
    )
}
export const gettingAllUsersRequest = () => dispatch => {
    dispatch(
        apiCallBegan({
            url: "/api/v1/admin/all/users",
            method: "get",
            onStart: getAllUsersRequest.type,
            onSuccess: getAllUsersSuccess.type,
            onError: getAllUsersFailed.type
        })
    )
}
export const deletingUserRequest = (id) => dispatch => {
    dispatch(
        apiCallBegan({
            url: `/api/v1/admin/user/${id}`,
            method: "delete",
            onStart: deleteUserRequest.type,
            onSuccess: deleteUserSuccess.type,
            onError: deleteUserFailed.type
        })
    )
}