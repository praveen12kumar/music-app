import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../slices/auth-slice";

const store = configureStore({
    reducer: {
        auth:authReducer

    }, devTools: true
});

export type AppDispatch = typeof store.dispatch;

export default store