import { configureStore } from "@reduxjs/toolkit";
import userReducer from '@/redux/features/userSlice/userSlice'
import productReducer from '@/redux/features/productSlice/productSlice'
import orderReducer from '@/redux/features/orderSlice/orderSlice'

const store = configureStore({
    reducer: {
        users: userReducer,
        products: productReducer,
        orders: orderReducer,
    },
});

export default store;
        