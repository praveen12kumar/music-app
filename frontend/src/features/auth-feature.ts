import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {axiosInstance} from "../helpers/axiosInstance";



const initialState = {
    user: null,
    loading: false,
  };

  export const signUp = createAsyncThunk("auth/signUp", async(data)=>{
    const response = await axiosInstance.post("/signup", data);
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