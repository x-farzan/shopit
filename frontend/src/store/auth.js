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
        error: null
    },
    reducers: {
        loginRequested: (auth, action) => {
            auth.loading = true;
        },
        loginReceived: (auth, action) => {
            auth.loading = false;
            auth.isAuthenticated = true;
            auth.error = action.payload
        }
    }
})
export default slice.reducer;
const { loginReceived, loginRequested } = slice.actions

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
            onSuccess: loginReceived.type
        })
    )
}