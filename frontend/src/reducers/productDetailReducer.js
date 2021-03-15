import { GET_PRODUCT } from '../actions/types'

const initialState = {
    product: {}
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCT:
            return {
                ...state,
                product: action.payload
            }
        default:
            return state
    }
}
export default productsReducer;