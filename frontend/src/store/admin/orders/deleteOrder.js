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
        isDeleted: false,
    },
    reducers: {
        deleteOrderRequest: (admin, action) => {
            admin.loading = true
            admin.error = null
        },
        deleteOrderSuccess: (admin, action) => {
            admin.loading = false
            admin.isDeleted = action.payload.success
        },
        deleteOrderFailed: (admin, action) => {
            admin.loading = false
            admin.error = null
        },
        resettingDeleteOrder: (admin, action) => {
            admin.loading = false
            admin.error = null
            admin.isDeleted = false
        }
    },
})


export default slice.reducer
////////////////////////////////////////////////////////////////////////////
//                                      actions
////////////////////////////////////////////////////////////////////////////

const { deleteOrderFailed, deleteOrderRequest, deleteOrderSuccess, resettingDeleteOrder } = slice.actions

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
export const reset = () => resettingDeleteOrder()