import { combineReducers } from '@reduxjs/toolkit';
import getAllOrdersReducer from "./getAllOrders"
import deleteOrderReducer from "./deleteOrder"
import getSingleOrderReducer from './getSingleOrder'
import changeOrderStatus from "./changeOrderStatus"
export default combineReducers({
    getOrders: getAllOrdersReducer,
    deleteOrder: deleteOrderReducer,
    singleOrder: getSingleOrderReducer,
    orderStatus: changeOrderStatus
})