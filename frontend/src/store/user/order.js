import { createSlice } from '@reduxjs/toolkit'
import { apiCallBegan } from '../api'

/////////////////////////////////////////////////////////////////////
//                          Reducer
/////////////////////////////////////////////////////////////////////
const slice = createSlice({
    name: "order",
    initialState: {
        loading: false,
        error: null,
        ordered: {},
        orders: [],
        order: {}
    },
    reducers: {
        createOrderRequest: (order, action) => {
            order.loading = true
        },
        createOrderSuccess: (order, action) => {
            order.loading = false
            order.ordered = action.payload
            order.error = null
        },
        createOrderFailed: (order, action) => {
            order.loading = false;
            order.error = action.payload
        },
        clearError: (order, action) => {
            order.loading = false
            order.error = null
        },
        getAllOrdersRequest: (order, action) => {
            order.loading = true
        },
        getAllOrdersSuccess: (order, action) => {
            order.loading = false
            order.orders = action.payload
        },
        getAllOrdersFailed: (order, action) => {
            order.loading = false
            order.error = null
        },

        getSingleOrderRequest: (order, action) => {
            order.loading = true
        },
        getSingleOrderSuccess: (order, action) => {
            order.loading = false
            order.order = action.payload
        },
        getSingleOrderFailed: (order, action) => {
            order.loading = false
            order.error = null
        },
    }
})

export default slice.reducer


//////////////////////////////////////////////////////////////////////
//                      Actions
//////////////////////////////////////////////////////////////////////
const {
    createOrderRequest,
    createOrderSuccess,
    createOrderFailed,
    getAllOrdersFailed,
    getAllOrdersRequest,
    getAllOrdersSuccess,
    getSingleOrderFailed,
    getSingleOrderRequest,
    getSingleOrderSuccess
} = slice.actions

export const creatingOrderRequest = (data) => (dispatch) => {

    dispatch(
        apiCallBegan({
            url: "/api/v1/order/new",
            method: 'post',
            data,
            headers: { "Content-Type": 'application/json' },
            onStart: createOrderRequest.type,
            onSuccess: createOrderSuccess.type,
            onError: createOrderFailed.type
        })
    )
}

export const gettingAllOrdersRequest = () => dispatch => {
    dispatch(
        apiCallBegan({
            url: "/api/v1/orders/me",
            method: 'get',
            onStart: getAllOrdersRequest.type,
            onSuccess: getAllOrdersSuccess.type,
            onError: getAllOrdersFailed.type
        })
    )
}


export const gettingSingleOrderRequest = (id) => dispatch => {
    dispatch(
        apiCallBegan({
            url: `/api/v1/order/${id}`,
            method: 'get',
            onStart: getSingleOrderRequest.type,
            onSuccess: getSingleOrderSuccess.type,
            onError: getSingleOrderFailed.type
        })
    )
}