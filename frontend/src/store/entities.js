import { combineReducers } from '@reduxjs/toolkit'

import entitiesReducer from './rootReducer'
import loginReducer from './credentials'
import paymentReducer from './paymentCredentials'

export default combineReducers({
    entities: entitiesReducer,
    auth: loginReducer,
    payment: paymentReducer
})