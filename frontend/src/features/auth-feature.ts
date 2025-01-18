import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {axiosInstance} from "../helpers/axiosInstance";


interface SignUpPayload {
  username: string;
  email: string;
  password: string;
}


const initialState = {
    user: null,
    loading: false,
  };

  export const signUp = createAsyncThunk("auth/signUp", async({username, email, password}:SignUpPayload)=>{
    console.log(username, email, password);
    const response = await axiosInstance.post("/signup", ({username, email, password}))
    console.log("response", response);
    return response.data
  })

 export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        
    }
    })


    export const authReducer = authSlice.reducer;