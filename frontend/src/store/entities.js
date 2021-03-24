import { combineReducers } from '@reduxjs/toolkit'

import entitiesReducer from './rootReducer'
import loginReducer from './credentials'

export default combineReducers({
    entities: entitiesReducer,
    auth: loginReducer
})