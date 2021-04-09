import { combineReducers } from '@reduxjs/toolkit';
import getAllUsersReducer from "./getAllUsers"
import deleteUserReducer from './deleteUser'
import getSingleUserReducer from "./getSingleUser"
import updateUserReducer from "./updateUser"
export default combineReducers({
    getUsers: getAllUsersReducer,
    deleteUser: deleteUserReducer,
    singleUser: getSingleUserReducer,
    updateUser: updateUserReducer
})