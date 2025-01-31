import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../slices/auth-slice";
import songReducer from "../slices/song-slice";

const store = configureStore({
    reducer: {
        auth:authReducer,
        song:songReducer

    }, devTools: true
});

export type RootState = ReturnType<typeof store.getState>;


export type AppDispatch = typeof store.dispatch;

export default store