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
        isDeleted: false
    },
    reducers: {
        deleteUserRequest: (admin, action) => {
            admin.loading = true
            admin.error = null
        },
        deleteUserSuccess: (admin, action) => {
            admin.loading = false
            admin.isDeleted = action.payload.success
        },
        deleteUserFailed: (admin, action) => {
            admin.loading = false
            admin.error = null
        },
        resettingDeleteUser: (admin, action) => {
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

const { deleteUserFailed, deleteUserRequest, deleteUserSuccess, resettingDeleteUser } = slice.actions

export const deletingUserRequest = (id) => dispatch => {
    dispatch(
        apiCallBegan({
            url: `/api/v1/admin/user/${id}`,
            method: "delete",
            onStart: deleteUserRequest.type,
            onSuccess: deleteUserSuccess.type,
            onError: deleteUserFailed.type
        })
    )
}
export const reset = () => resettingDeleteUser()