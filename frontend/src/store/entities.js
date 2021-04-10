import { combineReducers } from '@reduxjs/toolkit'

import entitiesReducer from './rootReducer'
import loginReducer from './credentials'
import paymentReducer from './paymentCredentials'
import newAdminReducer from "./admin/admin"
export default combineReducers({
    entities: entitiesReducer,
    auth: loginReducer,
    payment: paymentReducer,
    newAdmin: newAdminReducer
})