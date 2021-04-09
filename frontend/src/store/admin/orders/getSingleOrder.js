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
        order: {},
    },
    reducers: {
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
        resettingGetSingleOrder: (admin, action) => {
            admin.loading = false
            admin.error = null
            admin.order = {}
        }
    },
})


export default slice.reducer
////////////////////////////////////////////////////////////////////////////
//                                      actions
////////////////////////////////////////////////////////////////////////////

const { getSingleOrderFailed, getSingleOrderRequest, getSingleOrderSuccess, resettingGetSingleOrder } = slice.actions

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
export const reset = () => resettingGetSingleOrder()