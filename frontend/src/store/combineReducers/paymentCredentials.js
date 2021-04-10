import { combineReducers } from '@reduxjs/toolkit';

import paymentReducer from '../user/payment'

export default combineReducers({
    stripeKey: paymentReducer
})