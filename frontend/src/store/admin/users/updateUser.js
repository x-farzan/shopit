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
        isUserUpdated: false
    },
    reducers: {
        updateUserRequest: (admin, action) => {
            admin.loading = true
            admin.error = action.payload
        },
        updateUserSuccess: (admin, action) => {
            admin.loading = false
            admin.isUserUpdated = action.payload.success
        },
        updateUserFailed: (admin, action) => {
            admin.loading = false
            admin.error = action.payload
        },
        resettingUpdateUser: (admin, action) => {
            admin.loading = false
            admin.error = null
            admin.isUserUpdated = false
        }
    },
})


export default slice.reducer
////////////////////////////////////////////////////////////////////////////
//                                      actions
////////////////////////////////////////////////////////////////////////////

const { updateUserFailed, updateUserRequest, updateUserSuccess, resettingUpdateUser } = slice.actions


export const updatingUserRequest = (data, id) => dispatch => {
    dispatch(
        apiCallBegan({
            url: `/api/v1/admin/user/${id}`,
            method: "put",
            data,
            headers: { "Content-Type": 'multipart/form-data' },
            onStart: updateUserRequest.type,
            onSuccess: updateUserSuccess.type,
            onError: updateUserFailed.type
        })
    )
}

export const reset = () => resettingUpdateUser()