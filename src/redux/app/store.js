import { configureStore } from "@reduxjs/toolkit";
import userReducer from '@/redux/features/userSlice/userSlice'

const store = configureStore({
    reducer: {
        users: userReducer,
    },
});

export default store;
        