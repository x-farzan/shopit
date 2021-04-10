import { createSlice } from '@reduxjs/toolkit'
import { apiCallBegan } from '../api'

//////////////////////////////////
///             Reducers
//////////////////////////////////

const slice = createSlice({
    name: 'products',
    initialState: {
        list: [],
        count: null,
        loading: false,
        search: []
    },
    reducers: {
        productsCountRequested: (products, action) => {
            products.loading = true
        },
        productsCountReceived: (products, action) => {
            products.count = action.payload.count;
            products.loading = false;

        },
        productsRequested: (products, action) => {
            products.loading = true
        },
        productsReceived: (products, action) => {
            products.list = action.payload.products;
            products.loading = false;
        },
        searchProductsRequested: (products, action) => {
            products.loading = true;
        },
        searchProductsReceived: (products, action) => {
            products.search = action.payload.products;
            products.loading = false;
        }
    }
})


export default slice.reducer
const { productsReceived, productsRequested, productsCountReceived, productsCountRequested, searchProductsReceived, searchProductsRequested } = slice.actions



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

export const searchByName = (keyword) => (dispatch) => {

    dispatch(
        apiCallBegan({
            url: `/api/v1/products/searchbyname?name=${keyword}`,
            onStart: searchProductsRequested.type,
            onSuccess: searchProductsReceived.type
        })
    )
}

export const searchByPrice = (keyword, min, max) => (dispatch) => {

    dispatch(
        apiCallBegan({
            url: `/api/v1/products/searchbyprice?name=${keyword}&min=${min}&max=${max}`,
            onStart: searchProductsRequested.type,
            onSuccess: searchProductsReceived.type
        })
    )
}

export const searchByCategory = (keyword, min, max, category) => (dispatch) => {

    dispatch(
        apiCallBegan({
            url: `/api/v1/products/searchbycategory?name=${keyword}&min=${min}&max=${max}&c=${category}`,
            onStart: searchProductsRequested.type,
            onSuccess: searchProductsReceived.type
        })
    )
}