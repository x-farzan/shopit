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
        users: []
    },
    reducers: {
        getAllUsersRequest: (admin, action) => {
            admin.loading = true;
            admin.error = null
        },
        getAllUsersSuccess: (admin, action) => {
            admin.loading = false
            admin.users = action.payload
        },
        getAllUsersFailed: (admin, action) => {
            admin.loading = false
            admin.error = action.payload
        },
        resettingGetAllUsers: (admin, action) => {
            admin.loading = false
            admin.error = null
            admin.users = []
        }
    },
})


export default slice.reducer
////////////////////////////////////////////////////////////////////////////
//                                      actions
////////////////////////////////////////////////////////////////////////////

const { getAllUsersFailed, getAllUsersRequest, getAllUsersSuccess, resettingGetAllUsers } = slice.actions

export const gettingAllUsersRequest = () => dispatch => {
    dispatch(
        apiCallBegan({
            url: "/api/v1/admin/all/users",
            method: "get",
            onStart: getAllUsersRequest.type,
            onSuccess: getAllUsersSuccess.type,
            onError: getAllUsersFailed.type
        })
    )
}
export const reset = () => resettingGetAllUsers()