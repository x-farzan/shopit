import { combineReducers } from '@reduxjs/toolkit';

import paymentReducer from './payment'

export default combineReducers({
    stripeKey: paymentReducer
})