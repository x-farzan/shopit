import { createSlice } from '@reduxjs/toolkit'
import { apiCallBegan } from './api'

//////////////////////////////////
///             Reducers
//////////////////////////////////

const slice = createSlice({
    name: 'products',
    initialState: {
        list: [],
        count: null,
        loading: false,
        lastFetch: null
    },
    reducers: {
        productsCountRequested: (products, action) => {
            products.loading = true
        },
        productsCountReceived: (products, action) => {
            products.count = action.payload.count;
            products.loading = false;
            products.lastFetch = Date.now()
        },
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
const { productsReceived, productsRequested, productsCountReceived, productsCountRequested } = slice.actions



//////////////////////////////////
///             actions
//////////////////////////////////

export const loadProducts = (pageNumber, pageSize) => (dispatch, getState) => {
    dispatch(
        apiCallBegan({
            url: `/api/v1/products?pageNumber=${pageNumber}&pageSize=${pageSize}`,
            onStart: productsRequested.type,
            onSuccess: productsReceived.type
        })
    )
}

export const loadProductsCount = () => (dispatch) => {
    dispatch(
        apiCallBegan({
            url: '/api/v1/countproducts',
            onStart: productsCountRequested.type,
            onSuccess: productsCountReceived.type
        })
    )
}
