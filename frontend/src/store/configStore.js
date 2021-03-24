import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import auth from '../middlewares/auth';
import products from '../middlewares/products';
import reducer from './entities'

export default configureStore({
    reducer,
    middleware: [
        ...getDefaultMiddleware(),
        products,
        auth
    ]
})
