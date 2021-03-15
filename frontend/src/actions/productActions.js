import axios from 'axios';
import { GET_PRODUCTS } from './types'

export const getProducts = (data) => {
    return async dispatch => {

        const res = await axios.get(`https://opentdb.com/api.php?amount=${data.count}&category=${data.category}&difficulty=${data.level}&type=multiple`)
        // dispatch({
        //     type: GET_PRODUCTS,
        //     payload: res.data.results
        // })
    };
}
