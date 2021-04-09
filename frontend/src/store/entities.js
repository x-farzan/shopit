import { combineReducers } from '@reduxjs/toolkit'

import entitiesReducer from './rootReducer'
import loginReducer from './credentials'
import paymentReducer from './paymentCredentials'
import adminReducer from "./admin"
import newAdminReducer from "./admin/admin"
export default combineReducers({
    entities: entitiesReducer,
    auth: loginReducer,
    payment: paymentReducer,
    admin: adminReducer,
    newAdmin: newAdminReducer
})