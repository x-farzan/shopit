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
        error: null
    },
    reducers: {
        loginRequested: (auth, action) => {
            auth.error = null
            auth.loading = true;
        },
        loginReceived: (auth, action) => {
            auth.loading = false;
            auth.isAuthenticated = true;
            auth.res = action.payload
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
        }
    }
})
export default slice.reducer;
const { loginReceived, loginRequested, loginFailed, userRegistered, userRegisteringFailed, userRegisteringRequest } = slice.actions

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
            onError: userRegisteringFailed
        })
    )
}
