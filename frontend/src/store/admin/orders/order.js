import { createSlice } from "@reduxjs/toolkit"
import { apiCallBegan } from "../../api"


////////////////////////////////////////////////////////////////////
//                              Reducers
////////////////////////////////////////////////////////////////////

const slice = createSlice({
    name: "admin",
    initialState: {

        // get all orders
        gAOLoading: false,
        gAOError: null,
        orders: [],


        // get single order
        gSOLoading: false,
        gSOError: null,
        order: {},


        // change order status
        cOLoading: false,
        cOError: null,
        statusOfOrder: ""
    },
    reducers: {
        getAllOrdersRequest: (admin, action) => {
            admin.gAOLoading = true
            admin.gAOError = null
        },
        getAllOrdersSuccess: (admin, action) => {
            admin.gAOLoading = false
            admin.orders = action.payload.orders
        },
        getAllOrdersFailed: (admin, action) => {
            admin.gAOLoading = false
            admin.gAOError = action.payload
        },
        resettingGetAllOrders: (admin, action) => {
            admin.gAOLoading = false
            admin.gAOError = null
        },


        getSingleOrderRequest: (admin, action) => {
            admin.gSOLoading = true
            admin.gSOError = null
            admin.order = {}
        },
        getSingleOrderSuccess: (admin, action) => {
            admin.gSOLoading = false
            admin.order = action.payload
        },

        getSingleOrderFailed: (admin, action) => {
            admin.gSOLoading = false
            admin.gSOError = action.payload
        },
        resettingGetSingleOrder: (admin, action) => {
            admin.gSOLoading = false
            admin.gSOError = null
        },


        changeOrderStatusRequest: (admin, action) => {
            admin.cOLoading = true
            admin.cOError = null
        },
        changeOrderStatusSuccess: (admin, action) => {
            admin.cOLoading = false
            admin.statusOfOrder = action.payload.msg
            admin.order = action.payload.order
        },
        changeOrderStatusFailed: (admin, action) => {
            admin.cOLoading = false
            admin.cOError = action.payload
        },
        resettingChangeOrderStatus: (admin, action) => {
            admin.cOLoading = false
            admin.cOError = null
            admin.statusOfOrder = ""
        },


        deleteOrderRequest: (admin, action) => {
            admin.dOLoading = true
            admin.dOError = null
        },
        deleteOrderSuccess: (admin, action) => {
            admin.dOLoading = false
            admin.isDeleted = action.payload.success
            admin.orders = action.payload.orders
        },
        deleteOrderFailed: (admin, action) => {
            admin.dOLoading = false
            admin.dOError = null
        },
        resettingDeleteOrder: (admin, action) => {
            admin.dOLoading = false
            admin.dOError = null
            admin.isDeleted = false
        }
    },
})


export default slice.reducer
////////////////////////////////////////////////////////////////////////////
//                                      actions
////////////////////////////////////////////////////////////////////////////

const {
    getAllOrdersFailed,
    getAllOrdersRequest,
    getAllOrdersSuccess,
    resettingGetAllOrders,
    getSingleOrderFailed,
    getSingleOrderRequest,
    getSingleOrderSuccess,
    resettingGetSingleOrder,
    changeOrderStatusFailed,
    changeOrderStatusRequest,
    changeOrderStatusSuccess,
    resettingChangeOrderStatus,
    deleteOrderFailed,
    deleteOrderRequest,
    deleteOrderSuccess,
    resettingDeleteOrder
} = slice.actions

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
export const resetGetOrdersError = () => resettingGetAllOrders()


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
export const resetGetSingleOrder = () => resettingGetSingleOrder()


export const changingOrderStatusRequest = (id, data) => dispatch => {
    dispatch(
        apiCallBegan({
            url: `/api/v1/admin/update/order/${id}`,
            method: "put",
            data,
            headers: { "Content-Type": 'application/json' },
            onStart: changeOrderStatusRequest.type,
            onSuccess: changeOrderStatusSuccess.type,
            onError: changeOrderStatusFailed.type
        })
    )
}
export const resetChangeOrderStatus = () => resettingChangeOrderStatus()


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
export const resetDeleteOrderError = () => resettingDeleteOrder()