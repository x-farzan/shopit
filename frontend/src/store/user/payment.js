import { createSlice } from "@reduxjs/toolkit"
import { apiCallBegan } from '../api'

/////////////////////////////////////////////////////////////
//                          Reducers
/////////////////////////////////////////////////////////////
const slice = createSlice({
    name: "payment",
    initialState: {
        loading: false,
        error: null,
        stripeApiKey: ""
    },
    reducers: {
        stripeKeyRequest: (payment, action) => {
            payment.loading = true
        },
        stripeKeyReceived: (payment, action) => {
            payment.loading = false
            payment.stripeApiKey = action.payload.stripeApiKey
        },
        stripeKeyFailed: (payment, action) => {
            payment.loading = false
            payment.error = action.payload
        }
    }
})
export default slice.reducer

const { stripeKeyFailed, stripeKeyReceived, stripeKeyRequest } = slice.actions



/////////////////////////////////////////////////////////////
//                          Actions
/////////////////////////////////////////////////////////////

export const stripeKeyRequesting = (data) => (dispatch) => {

    dispatch(
        apiCallBegan({
            url: "/api/v1/stripeapi",
            onStart: stripeKeyRequest.type,
            onSuccess: stripeKeyReceived.type,
            onError: stripeKeyFailed.type
        })
    )
}