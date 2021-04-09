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
        order: {},
    },
    reducers: {
        getSingleOrderRequest: (admin, action) => {
            admin.gOLoading = true
            admin.gOError = null
        },
        getSingleOrderSuccess: (admin, action) => {
            admin.gOLoading = false
            admin.order = action.payload
        },

        getSingleOrderFailed: (admin, action) => {
            admin.gOLoading = false
            admin.gOError = action.payload
        },
        resettingGetSingleOrder: (admin, action) => {
            admin.gOLoading = false
            admin.gOError = null
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
export const resetGetSingleOrder = () => resettingGetSingleOrder()