import { createSlice } from '@reduxjs/toolkit'
import { apiCallBegan } from './api'

//////////////////////////////////
///             Reducers
//////////////////////////////////

const slice = createSlice({
    name: 'products',
    initialState: {
        list: [],
        loading: false,
        lastFetch: null
    },
    reducers: {
        productsRequested: (products, action) => {
            products.loading = true
        },
        productsReceived: (products, action) => {
            products.list = action.payload;
            products.loading = false;
        }
    }
})


export default slice.reducer
const { productsReceived, productsRequested } = slice.actions



//////////////////////////////////
///             actions
//////////////////////////////////

export const loadProducts = () => (dispatch) => {
    dispatch(
        apiCallBegan({
            url: '/api/v1/products',
            onStart: productsRequested.type,
            onSuccess: productsReceived.type
        })
    )
}
