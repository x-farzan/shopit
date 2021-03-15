import axios from 'axios';
import { GET_PRODUCTS, GET_PRODUCT } from './types'

export const getProducts = () => {
    return async dispatch => {
        try {
            const { data } = await axios.get(`/api/v1/products?pageNumber=1&pageSize=6`)
            dispatch({
                type: GET_PRODUCTS,
                payload: data.products
            })
        } catch (err) {
            console.log(err)
        }
    };
}

export const getProductDetail = (id) => {
    return async dispatch => {
        try {
            const { data } = await axios.get(`/api/v1/product/${id}`)
            dispatch({
                type: GET_PRODUCT,
                payload: data.product
            })
        } catch (err) {
            console.log(err)
        }
    };
}
