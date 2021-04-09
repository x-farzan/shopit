import { createSlice } from "@reduxjs/toolkit"
import { apiCallBegan } from "../../api"


////////////////////////////////////////////////////////////////////
//                              Reducers
////////////////////////////////////////////////////////////////////

const slice = createSlice({
    name: "admin",
    initialState: {
        dOLoading: false,
        dOError: null,
        isDeleted: false,
    },
    reducers: {
        deleteOrderRequest: (admin, action) => {
            admin.dOLoading = true
            admin.dOError = null
        },
        deleteOrderSuccess: (admin, action) => {
            admin.dOLoading = false
            admin.isDeleted = action.payload.success
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
export const resetDeleteOrderError = () => resettingDeleteOrder()