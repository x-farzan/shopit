import { createSlice } from '@reduxjs/toolkit'
import { authCallBegan } from './api';


//////////////////////////////////////////////////////////////
//                      Reducers
//////////////////////////////////////////////////////////////

const slice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        isAuthenticated: false,
        res: null,
        error: null,
        loadError: null
    },
    reducers: {
        loginRequested: (auth, action) => {
            auth.error = null
            auth.loading = true;
        },
        loginReceived: (auth, action) => {
            auth.loading = false;
            auth.isAuthenticated = true;
            auth.res = action.payload.user
        },
        loginFailed: (auth, action) => {
            auth.loading = false;
            auth.error = action.payload
        },
        userRegisteringRequest: (auth, action) => {
            auth.error = null
            auth.loading = true;
        },
        userRegistered: (auth, action) => {
            auth.loading = false;
            auth.isAuthenticated = true;
            auth.res = action.payload
        },
        userRegisteringFailed: (auth, action) => {
            auth.loading = false;
            auth.error = action.payload
        },
        loadUserRequest: (auth, action) => {
            auth.error = null
            auth.loading = true;
        },
        loadUserSuccess: (auth, action) => {
            auth.loading = false;
            auth.isAuthenticated = true;
            auth.res = action.payload
            auth.loadError = null
        },
        loadUserFailed: (auth, action) => {
            auth.loading = false;
            auth.loadError = action.payload
        },
        logoutRequest: (auth, action) => {
            auth.loading = true;
            auth.error = null
        },
        logoutRequestSucceed: (auth, action) => {
            auth.loading = false;
            auth.res = null
            auth.isAuthenticated = false
        },
        logoutRequestFailed: (auth, action) => {
            auth.loading = false;
            auth.error = action.payload
        },
        clearingError: (auth, action) => {
            auth.loading = false
            auth.error = null
        }
    }
})
export default slice.reducer;
const { loginReceived, loginRequested, loginFailed, userRegistered, userRegisteringFailed, userRegisteringRequest, loadUserSuccess, loadUserFailed, loadUserRequest, logoutRequest, logoutRequestFailed, logoutRequestSucceed, clearingError } = slice.actions

/////////////////////////////////////////////////////////////////////
//                      Actions
/////////////////////////////////////////////////////////////////////
export const loginRequest = (data) => (dispatch) => {
    dispatch(
        authCallBegan({
            url: '/api/v1/auth',
            method: "post",
            data,
            onStart: loginRequested.type,
            onSuccess: loginReceived.type,
            onError: loginFailed.type
        })
    )
}
export const registeringRequest = (data) => (dispatch) => {
    dispatch(
        authCallBegan({
            url: '/api/v1/users',
            method: 'post',
            data,
            headers: { "Content-Type": 'multipart/form-data' },
            onStart: userRegisteringRequest.type,
            onSuccess: userRegistered.type,
            onError: userRegisteringFailed.type
        })
    )
}
export const loadingUserRequest = () => (dispatch) => {
    dispatch(
        authCallBegan({
            url: '/api/v1/me',
            method: 'get',
            onStart: loadUserRequest.type,
            onSuccess: loadUserSuccess.type,
            onError: loadUserFailed.type
        })
    )
}

export const logoutUserRequest = () => (dispatch) => {
    dispatch(
        authCallBegan({
            url: '/api/v1/logout',
            method: 'get',
            onStart: logoutRequest.type,
            onSuccess: logoutRequestSucceed.type,
            onError: logoutRequestFailed.type
        })
    )
}

export const clearError = () => clearingError()