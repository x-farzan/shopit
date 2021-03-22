import { createSlice } from '@reduxjs/toolkit'
import { apiCallBegan } from './api'
import moment from 'moment'

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
            products.list = action.payload.products;
            products.loading = false;
            products.lastFetch = Date.now()
        }
    }
})


export default slice.reducer
const { productsReceived, productsRequested } = slice.actions



//////////////////////////////////
///             actions
//////////////////////////////////

export const loadProducts = () => (dispatch, getState) => {
    const { lastFetch } = getState().entities.products
    const diffInMinutes = moment().diff(moment(lastFetch), 'minute');
    if (diffInMinutes < 10) return;
    dispatch(
        apiCallBegan({
            url: '/api/v1/products',
            onStart: productsRequested.type,
            onSuccess: productsReceived.type
        })
    )
}
