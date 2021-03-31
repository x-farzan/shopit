import { createSlice } from '@reduxjs/toolkit';
import { cartCallBegan } from './api';

const slice = createSlice({
    name: "cart",
    initialState: {
        list: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        loading: false,
        error: null
    },
    reducers: {
        getProductToCartRequest: (cart, action) => {
            cart.loading = true
        },
        getProductToCartSuccess: (cart, action) => {
            cart.loading = false
            const { payload, qty, id } = action
            const item = cart.list.find(i => i._id === id)
            payload.product.qty = qty
            if (!item) {
                cart.list.push(payload.product)
            }
        },
        getProductToCartFailed: (cart, action) => {
            cart.loading = false;
            cart.error = action.payload
        }
    }
})

export default slice.reducer

const { getProductToCartFailed, getProductToCartRequest, getProductToCartSuccess } = slice.actions

export const addProductToCart = (id, qty) => (dispatch, getState) => {
    dispatch(
        cartCallBegan({
            url: `/api/v1/product/${id}`,
            onStart: getProductToCartRequest.type,
            onSuccess: getProductToCartSuccess.type,
            onError: getProductToCartFailed.type,
            qty,
            id
        })
    )
}