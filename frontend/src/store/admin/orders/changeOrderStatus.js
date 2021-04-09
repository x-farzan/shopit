import { createSlice } from "@reduxjs/toolkit"
import { apiCallBegan } from "../../api"


////////////////////////////////////////////////////////////////////
//                              Reducers
////////////////////////////////////////////////////////////////////

const slice = createSlice({
    name: "admin",
    initialState: {
        cOLoading: false,
        cOError: null,
        statusOfOrder: ""
    },
    reducers: {
        changeOrderStatusRequest: (admin, action) => {
            admin.cOLoading = true
            admin.cOError = null
        },
        changeOrderStatusSuccess: (admin, action) => {
            admin.cOLoading = false
            admin.statusOfOrder = action.payload
        },
        changeOrderStatusFailed: (admin, action) => {
            admin.cOLoading = false
            admin.cOError = action.payload
        },
        resettingChangeOrderStatus: (admin, action) => {
            admin.cOLoading = false
            admin.cOError = null
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
export const resetChangeOrderStatus = () => resettingChangeOrderStatus()