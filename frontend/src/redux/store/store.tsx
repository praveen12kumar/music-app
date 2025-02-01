import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../slices/auth-slice";
import { songReducer } from "../slices/song-slice";
import { adminReducer } from "../slices/admin-slice";



const store = configureStore({
    reducer: {
        auth:authReducer,
        song:songReducer,
        admin:adminReducer
    }, devTools: true
});

export type RootState = ReturnType<typeof store.getState>;


export type AppDispatch = typeof store.dispatch;

export default store