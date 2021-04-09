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
        orders: [],
    },
    reducers: {
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
        resettingGetAllOrders: (admin, action) => {
            admin.loading = false
            admin.error = null
            admin.orders = []
        }
    },
})


export default slice.reducer
////////////////////////////////////////////////////////////////////////////
//                                      actions
////////////////////////////////////////////////////////////////////////////

const { getAllOrdersFailed, getAllOrdersRequest, getAllOrdersSuccess, resettingGetAllOrders } = slice.actions

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
export const reset = () => resettingGetAllOrders()