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
        statusOfOrder: ""
    },
    reducers: {
        changeOrderStatusRequest: (admin, action) => {
            admin.loading = true
            admin.error = null
        },
        changeOrderStatusSuccess: (admin, action) => {
            admin.loading = false
            admin.statusOfOrder = action.payload
        },
        changeOrderStatusFailed: (admin, action) => {
            admin.loading = false
            admin.error = action.payload
        },
        resettingChangeOrderStatus: (admin, action) => {
            admin.loading = false
            admin.error = null
            admin.statusOfOrder = ""
        }
    },
})


export default slice.reducer
////////////////////////////////////////////////////////////////////////////
//                                      actions
////////////////////////////////////////////////////////////////////////////

const { changeOrderStatusFailed, changeOrderStatusRequest, changeOrderStatusSuccess, resettingChangeOrderStatus } = slice.actions

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
export const reset = () => resettingChangeOrderStatus()