import axios from 'axios';

import { apiCallBegan, apiCallFailed, apiCallSuccess } from '../store/api'

const products = ({ dispatch }) => next => async action => {
    if (action.type !== apiCallBegan.type) return next(action)

    // destructuring the action.payload
    const { url, method, onStart, data, onSuccess, onError } = action.payload

    if (onStart) dispatch({ type: onStart })

    next(action)

    try {
        const response = await axios.request({
            url,
            method,
            data
        })
        dispatch(apiCallSuccess(response.data))

        if (onSuccess) dispatch({ type: onSuccess, payload: response.data })
    } catch (error) {
        dispatch(apiCallFailed(error.message))
        if (onError) dispatch({ type: onError, payload: error.message })
    }
}
export default products