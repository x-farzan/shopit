import { createSlice } from "@reduxjs/toolkit"
import { apiCallBegan } from "../../api"


////////////////////////////////////////////////////////////////////
//                              Reducers
////////////////////////////////////////////////////////////////////

const slice = createSlice({
    name: "admin",
    initialState: {
        gOLoading: false,
        gOError: null,
        orders: [],
    },
    reducers: {
        getAllOrdersRequest: (admin, action) => {
            admin.gOLoading = true
            admin.gOError = null
        },
        getAllOrdersSuccess: (admin, action) => {
            admin.gOLoading = false
            admin.orders = action.payload.orders
        },
        getAllOrdersFailed: (admin, action) => {
            admin.gOLoading = false
            admin.gOError = action.payload
        },
        resettingGetAllOrders: (admin, action) => {
            admin.gOLoading = false
            admin.gOError = null
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
export const resetGetOrdersError = () => resettingGetAllOrders()