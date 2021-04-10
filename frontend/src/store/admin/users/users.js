import { createSlice } from "@reduxjs/toolkit"
import { apiCallBegan } from "../../api"


////////////////////////////////////////////////////////////////////
//                              Reducers
////////////////////////////////////////////////////////////////////

const slice = createSlice({
    name: "admin",
    initialState: {
        // update user
        uULoading: false,
        uUError: null,
        isUserUpdated: false,
        // get single user
        gSULoading: false,
        gSUError: null,
        user: {},

        // Get All Users
        gAULoading: false,
        gAUError: null,
        users: [],

        // delete User
        dULoading: false,
        dUError: null,
        isDeleted: false,
        dUMsg: ""
    },
    reducers: {
        updateUserRequest: (admin, action) => {
            admin.uULoading = true
            admin.uUError = action.payload
        },
        updateUserSuccess: (admin, action) => {
            admin.uULoading = false
            admin.isUserUpdated = action.payload.success
        },
        updateUserFailed: (admin, action) => {
            admin.uULoading = false
            admin.uUError = action.payload
        },
        resettingUpdateUser: (admin, action) => {
            admin.uULoading = false
            admin.uUError = null
            admin.isUserUpdated = false
        },


        getSingleUserRequest: (admin, action) => {
            admin.gSULoading = true
            admin.gSUError = null
        },
        getSingleUserSuccess: (admin, action) => {
            admin.gSULoading = false
            admin.user = action.payload
        },
        getSingleUserFailed: (admin, action) => {
            admin.gSULoading = false
            admin.gSUError = action.payload
        },
        resettingGetSingleUser: (admin, action) => {
            admin.gSULoading = false
            admin.gSUError = null
        },

        getAllUsersRequest: (admin, action) => {
            admin.gAULoading = true;
            admin.gAUError = null
        },
        getAllUsersSuccess: (admin, action) => {
            admin.gAULoading = false
            admin.users = action.payload
        },
        getAllUsersFailed: (admin, action) => {
            admin.gAULoading = false
            admin.gAUError = action.payload
        },
        resettingGetAllUsers: (admin, action) => {
            admin.gAULoading = false
            admin.gAUError = null
        },

        deleteUserRequest: (admin, action) => {
            admin.dULoading = true
            admin.dUError = null
        },
        deleteUserSuccess: (admin, action) => {
            admin.dULoading = false
            admin.isDeleted = action.payload.success
            admin.users = action.payload.users
            admin.dUMsg = action.payload.message
        },
        deleteUserFailed: (admin, action) => {
            admin.dULoading = false
            admin.dUError = null
        },
        resettingDeleteUser: (admin, action) => {
            admin.dULoading = false
            admin.dUError = null
            admin.isDeleted = false
            admin.dUMsg = ""
        }
    },
})


export default slice.reducer
////////////////////////////////////////////////////////////////////////////
//                                      actions
////////////////////////////////////////////////////////////////////////////

const {
    updateUserFailed,
    updateUserRequest,
    updateUserSuccess,
    resettingUpdateUser,
    getAllUsersFailed,
    getAllUsersRequest,
    getAllUsersSuccess,
    resettingGetAllUsers,
    getSingleUserFailed,
    getSingleUserRequest,
    getSingleUserSuccess,
    resettingGetSingleUser,
    deleteUserFailed,
    deleteUserRequest,
    deleteUserSuccess,
    resettingDeleteUser
} = slice.actions


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

export const resetUpdateUser = () => resettingUpdateUser()


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

export const resetGetSingleUser = () => resettingGetSingleUser()

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
export const resetGetAllUsers = () => resettingGetAllUsers()

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
export const resetDeleteUser = () => resettingDeleteUser()