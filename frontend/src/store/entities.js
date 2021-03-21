import { combineReducers } from '@reduxjs/toolkit'

import entitiesReducer from './rootReducer'

export default combineReducers({
    entities: entitiesReducer
})