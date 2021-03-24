import axios from 'axios';

import { authCallBegan, authCallFailed, authCallSuccess } from '../store/api'

const auth = ({ dispatch }) => next => async action => {
    if (action.type !== authCallBegan.type) return next(action)

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
        dispatch(authCallSuccess(response.data))

        if (onSuccess) dispatch({ type: onSuccess, payload: response.data })
    } catch (error) {
        if (error && error.response.status === 400)
            dispatch(authCallFailed(error.message))
        if (onError) dispatch({ type: onError, payload: error.message })
    }
}
export default auth