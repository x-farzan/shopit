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
            const { payload, qty, id, price } = action
            const item = cart.list.find(i => i._id === id)
            payload.product.qty = qty
            payload.product.totalPrice = price * qty

            if (!item) {
                cart.list.push(payload.product)
            }
        },
        getProductToCartFailed: (cart, action) => {
            cart.loading = false;
            cart.error = action.payload
        },
        changeItemsCount: (cart, action) => {
            const { id, qty, price } = action.payload
            const item = cart.list.find(i => i._id === id)
            item.qty = qty
            item.totalPrice = price * qty
            localStorage.setItem("cartItems", JSON.stringify(cart.list))
        }
    }
})

export default slice.reducer

const { getProductToCartFailed, getProductToCartRequest, getProductToCartSuccess, changeItemsCount } = slice.actions

export const addProductToCart = (id, qty, price) => (dispatch) => {
    dispatch(
        cartCallBegan({
            url: `/api/v1/product/${id}`,
            onStart: getProductToCartRequest.type,
            onSuccess: getProductToCartSuccess.type,
            onError: getProductToCartFailed.type,
            qty,
            id,
            price
        })
    )
}

export const changeItems = (change) => changeItemsCount(change)