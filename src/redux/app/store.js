import { configureStore } from "@reduxjs/toolkit";
import userReducer from '@/redux/features/userSlice/userSlice'
import productReducer from '@/redux/features/productSlice/productSlice'

const store = configureStore({
    reducer: {
        users: userReducer,
        products: productReducer,
    },
});

export default store;
        