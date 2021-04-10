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
        loadError: null,
        updateProfile: false,

        cPassLoading: false,
        cPassError: null,
        isChangedPass: false,

        fPassLoading: false,
        fPassError: null,
        isURLSent: false,
        message: "",

        nPassLoading: false,
        nPassError: null,
        isPasUpdated: false,
        nPMessage: ""

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
            auth.res = action.payload.user
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
            auth.updateProfile = false
            auth.loadError = null
        },
        updateProfileRequest: (auth, action) => {
            auth.loading = true;
            auth.error = null
        },
        updateProfileSucceed: (auth, action) => {
            auth.loading = false;
            auth.res = action.payload.user
            auth.updateProfile = true
        },
        updateProfileFailed: (auth, action) => {
            auth.loading = false;
            auth.updateProfile = false
            auth.error = action.payload
        },

        changePasswordRequest: (auth, action) => {
            auth.cPassLoading = true
            auth.cPassError = null
            auth.isChangedPass = false
        },
        changePasswordSuccess: (auth, action) => {
            auth.cPassLoading = false
            auth.isChangedPass = true
            auth.res = action.payload.user

        },
        changePasswordFailed: (auth, action) => {
            auth.cPassLoading = false
            auth.cPassError = action.payload
            auth.isChangedPass = false
        },
        resettingChangePassword: (auth, action) => {
            auth.cPassLoading = false
            auth.cPassError = null
            auth.isChangedPass = false
        },
        forgotPasswordRequest: (auth, action) => {
            auth.fPassLoading = true
            auth.fPassError = null
            auth.isURLSent = false
        },
        forgotPasswordSuccess: (auth, action) => {
            auth.fPassLoading = false
            auth.isURLSent = true
            auth.message = action.payload

        },
        forgotPasswordFailed: (auth, action) => {
            auth.fPassLoading = false
            auth.fPassError = action.payload
            auth.isURLSent = false
        },
        resettingForgotPassword: (auth, action) => {
            auth.fPassLoading = false
            auth.fPassError = null
            auth.isURLSent = false
        },
        newPasswordRequest: (auth, action) => {
            auth.nPassLoading = true
            auth.nPassError = null
            auth.isPasUpdated = false
        },
        newPasswordSuccess: (auth, action) => {
            auth.nPassLoading = false
            auth.isPasUpdated = true
            auth.isAuthenticated = true
            auth.res = action.payload.user
        },
        newPasswordFailed: (auth, action) => {
            auth.nPassLoading = false
            auth.nPassError = action.payload
            auth.isPasUpdated = false
        },
        resettingNewPassword: (auth, action) => {
            auth.nPassLoading = false
            auth.nPassError = null
            auth.isPasUpdated = false
        }
    }
})
export default slice.reducer;
const {
    loginReceived,
    loginRequested,
    loginFailed,
    userRegistered,
    userRegisteringFailed,
    userRegisteringRequest,
    loadUserSuccess,
    loadUserFailed,
    loadUserRequest,
    logoutRequest,
    logoutRequestFailed,
    logoutRequestSucceed,
    clearingError,
    updateProfileFailed,
    updateProfileRequest,
    updateProfileSucceed,
    changePasswordFailed,
    changePasswordRequest,
    changePasswordSuccess,
    resettingChangePassword,
    forgotPasswordFailed,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    resettingForgotPassword,
    newPasswordFailed,
    newPasswordRequest,
    newPasswordSuccess,
    resettingNewPassword
} = slice.actions

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
export const updatingProfileRequest = (data) => (dispatch) => {
    dispatch(
        authCallBegan({
            url: '/api/v1/user/update',
            method: 'post',
            data,
            headers: { "Content-Type": 'multipart/form-data' },
            onStart: updateProfileRequest.type,
            onSuccess: updateProfileSucceed.type,
            onError: updateProfileFailed.type
        })
    )
}

export const clearError = () => clearingError()


export const changingPasswordRequest = (data) => (dispatch) => {
    dispatch(
        authCallBegan({
            url: '/api/v1/change/password',
            method: 'post',
            data,
            onStart: changePasswordRequest.type,
            onSuccess: changePasswordSuccess.type,
            onError: changePasswordFailed.type
        })
    )
}

export const resetChangePassword = () => resettingChangePassword()


export const forgot_PasswordRequest = (data) => (dispatch) => {
    dispatch(
        authCallBegan({
            url: '/api/v1/forgot/password',
            method: 'post',
            data,
            onStart: forgotPasswordRequest.type,
            onSuccess: forgotPasswordSuccess.type,
            onError: forgotPasswordFailed.type
        })
    )
}

export const resetForgotPassword = () => resettingForgotPassword()



export const new_PasswordRequest = (token, data) => (dispatch) => {
    dispatch(
        authCallBegan({
            url: `/api/v1/password/reset/${token}`,
            method: 'put',
            data,
            onStart: newPasswordRequest.type,
            onSuccess: newPasswordSuccess.type,
            onError: newPasswordFailed.type
        })
    )
}

export const resetNewPassword = () => resettingNewPassword()



