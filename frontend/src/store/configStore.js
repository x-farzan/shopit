import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import products from '../middlewares/products';
import reducer from './entities'

export default configureStore({
    reducer,
    middleware: [
        ...getDefaultMiddleware(),
        products
    ]
})
