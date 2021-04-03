import { createSlice } from '@reduxjs/toolkit'
import { apiCallBegan } from './api'

/////////////////////////////////////////////////////////////////////
//                          Reducer
/////////////////////////////////////////////////////////////////////
const slice = createSlice({
    name: "order",
    initialState: {
        loading: false,
        error: null,
        ordered: {}
    },
    reducers: {
        createOrderRequest: (order, action) => {
            order.loading = true
        },
        createOrderSuccess: (order, action) => {
            order.loading = false
            order.ordered = action.payload
            order.error = null
        },
        ctreateOrderFailed: (order, action) => {
            order.loading = false;
            order.error = action.payload
        },

    }
})

export default slice.reducer


//////////////////////////////////////////////////////////////////////
//                      Actions
//////////////////////////////////////////////////////////////////////
const { createOrderRequest, createOrderSuccess, ctreateOrderFailed } = slice.actions

export const creatingOrderRequest = (data) => (dispatch) => {
    console.log(data)
    dispatch(
        apiCallBegan({
            url: "/api/v1/order/new",
            method: 'post',
            data,
            headers: { "Content-Type": 'application/json' },
            onStart: createOrderRequest.type,
            onSuccess: createOrderSuccess.type,
            onError: ctreateOrderFailed.type
        })
    )
}