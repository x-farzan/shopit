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
        user: {}
    },
    reducers: {
        getSingleUserRequest: (admin, action) => {
            admin.loading = true
            admin.error = null
        },
        getSingleUserSuccess: (admin, action) => {
            admin.loading = false
            admin.user = action.payload
        },
        getSingleUserFailed: (admin, action) => {
            admin.loading = false
            admin.error = action.payload
        },
        resettingGetSingleUser: (admin, action) => {
            admin.loading = false
            admin.error = null
            admin.user = {}
        }
    },
})


export default slice.reducer
////////////////////////////////////////////////////////////////////////////
//                                      actions
////////////////////////////////////////////////////////////////////////////

const { getSingleUserFailed, getSingleUserRequest, getSingleUserSuccess, resettingGetSingleUser } = slice.actions


export const gettingSingleUserRequest = (id) => dispatch => {
    dispatch(
        apiCallBegan({
            url: `/api/v1/admin/user/${id}`,
            method: "get",
            onStart: getSingleUserRequest.type,
            onSuccess: getSingleUserSuccess.type,
            onError: getSingleUserFailed.type
        })
    )
}

export const reset = () => resettingGetSingleUser()