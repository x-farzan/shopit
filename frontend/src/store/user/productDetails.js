import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../api';

////////////////////////////////////
//      Product Detail Reducer
////////////////////////////////////

const slice = createSlice({
    name: "productDetail",
    initialState: {
        loading: false,
        data: null
    },
    reducers: {
        productDetailRequest: (productDetail, action) => {
            productDetail.loading = true
        },
        productDetailReceived: (productDetail, action) => {
            productDetail.data = action.payload.product
            productDetail.loading = false
        },
        clearProductDetail: (productDetail, action) => {
            productDetail.data = null
            productDetail.loading = false
        }
    }
})


export default slice.reducer

const { productDetailReceived, productDetailRequest, clearProductDetail } = slice.actions


/////////////////////////////////////////////////
//       Product Detail Actions
/////////////////////////////////////////////////

export const getProductDetails = (url) => (dispatch, getState) => {
    dispatch(
        apiCallBegan({
            url,
            onStart: productDetailRequest.type,
            onSuccess: productDetailReceived.type
        })
    )
}

export const clearingProductDetail = () => clearProductDetail()