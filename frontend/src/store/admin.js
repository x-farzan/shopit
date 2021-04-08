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
        order: {},
        orderLoading: false,
        isDeleted: false,
        users: [],
        userLoading: false,
        isUserDeleted: false,
        user: {},
        isUserUpdated: false,
        userUpdatingLoading: false,
        reviews: [],
        isReviewDeleted: false,
        reviewLoading: false,
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
            admin.user = {}
            admin.isUserUpdated = false
            admin.userUpdatingLoading = false
            admin.reviews = []
            admin.isReviewDeleted = false
            admin.reviewLoading = false
            admin.order = null
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
        getSingleOrderRequest: (admin, action) => {
            admin.loading = true
            admin.error = null
        },
        getSingleOrderSuccess: (admin, action) => {
            admin.loading = false
            admin.order = action.payload
        },
        getSingleOrderFailed: (admin, action) => {
            admin.loading = false
            admin.error = action.payload
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
        },
        getSingleUserRequest: (admin, action) => {
            admin.loading = true
            admin.error = null
        },
        getSingleUserSuccess: (admin, action) => {
            admin.loading = false
            admin.user = action.payload
        },
        getSingleUserFailed: (admin, action) => {
            admin.loading = false
            admin.error = action.payload
        },
        updateUserRequest: (admin, action) => {
            admin.userUpdatingLoading = true
            admin.error = action.payload
        },
        updateUserSuccess: (admin, action) => {
            admin.userUpdatingLoading = false
            admin.isUserUpdated = action.payload.success
        },
        updateUserFailed: (admin, action) => {
            admin.userUpdatingLoading = false
            admin.error = action.payload
        },
        getAllReviewsRequest: (admin, action) => {
            admin.loading = true
            admin.error = null
        },
        getAllReviewsSuccess: (admin, action) => {
            admin.loading = false
            admin.reviews = action.payload
        },
        getAllReviewsFailed: (admin, action) => {
            admin.loading = false
            admin.error = action.payload
        },
        deleteReviewRequest: (admin, action) => {
            admin.reviewLoading = true
            admin.error = null
        },
        deleteReviewSuccess: (admin, action) => {
            admin.reviewLoading = false
            admin.isReviewDeleted = action.payload.success
            admin.error = action.payload.msg
        },
        deleteReviewFailed: (admin, action) => {
            admin.reviewLoading = false
            admin.error = action.payload
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
    deleteUserSuccess,
    getSingleUserRequest,
    getSingleUserSuccess,
    getSingleUserFailed,
    updateUserRequest,
    updateUserFailed,
    updateUserSuccess,
    getAllReviewsFailed,
    getAllReviewsRequest,
    getAllReviewsSuccess,
    deleteReviewFailed,
    deleteReviewRequest,
    deleteReviewSuccess,
    getSingleOrderFailed,
    getSingleOrderRequest,
    getSingleOrderSuccess
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

export const gettingSingleUserRequest = (id) => dispatch => {
    dispatch(
        apiCallBegan({
            url: `/api/v1/admin/user/${id}`,
            method: "get",
            onStart: getSingleUserRequest.type,
            onSuccess: getSingleUserSuccess.type,
            onError: getSingleUserFailed.type
        })
    )
}

export const updatingUserRequest = (data, id) => dispatch => {
    dispatch(
        apiCallBegan({
            url: `/api/v1/admin/user/${id}`,
            method: "put",
            data,
            headers: { "Content-Type": 'multipart/form-data' },
            onStart: updateUserRequest.type,
            onSuccess: updateUserSuccess.type,
            onError: updateUserFailed.type
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

export const gettingSingleOrderRequest = (id) => dispatch => {
    dispatch(
        apiCallBegan({
            url: `/api/v1/admin/order/${id}`,
            method: "get",
            onStart: getSingleOrderRequest.type,
            onSuccess: getSingleOrderSuccess.type,
            onError: getSingleOrderFailed.type
        })
    )
}