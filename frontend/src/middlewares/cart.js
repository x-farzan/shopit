import axios from 'axios';

import { cartCallBegan, cartCallFailed, cartCallSuccess } from '../store/api'

const cart = ({ dispatch, getState }) => next => async action => {
    if (action.type !== cartCallBegan.type) return next(action)

    // destructuring the action.payload
    const { url, onStart, onSuccess, onError, qty, id, price } = action.payload
    if (onStart) dispatch({ type: onStart })

    next(action)

    try {
        const response = await axios.request({
            url
        })
        dispatch(cartCallSuccess(response.data))
        console.log(response.data.product)
        if (onSuccess) dispatch({ type: onSuccess, payload: response.data, qty, id, price })
        console.log(response.data.product)

        localStorage.setItem("cartItems", JSON.stringify(getState().entities.cart.list))
    } catch (error) {
        dispatch(cartCallFailed(error.message))
        if (onError) dispatch({ type: onError, payload: error.message })
    }
}
export default cart