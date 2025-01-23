import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../helpers/axiosInstance";
import toast from "react-hot-toast";





const initialState = {
  user: localStorage.getItem("user") || null,
  isLoggedIn: localStorage.getItem('isLoggedIn') || false,
  role: localStorage.getItem('role') || null,
  loading: false,
  error: null,
};

interface LoginPayload {
  email: string;
  password: string;
}

interface SignupPayload {
  username: string;
  email: string;
  password: string;
}

export const register = createAsyncThunk( "auth/register", async (data :SignupPayload , { rejectWithValue }) => {
  try {
      const response = axiosInstance.post("/signup", data);
      
      await toast.promise(response, {
        loading: "Wait! Creating your account...",
        success: (res) => res.data?.message || "Account created successfully!",
        error: (err) => err?.response?.data?.message || "Failed to create account",
      });
      
      return (await response).data;
      
    } catch (error:string | any) {
      toast.error(error?.response?.data?.message || "An error occurred");
      return rejectWithValue(error?.response?.data || { message: "Error" });
    }
  }
);


export const login = createAsyncThunk("auth/login", async (data: LoginPayload, { rejectWithValue }) => {
  try {
    const response = axiosInstance.post("/login", data);
    await toast.promise(response,{
      loading: "Wait! Logging in...",
      success: (res) => res.data?.message || "Logged in successfully!",
      error: (err) => err?.response?.data?.message || "Failed to login",
    });
    console.log("response", await response);
    return (await response).data;

  } catch (error:string | any) {
     toast.error(error?.response?.data?.message || "An error occurred");
    return rejectWithValue(error?.response?.data || { message: "Error" });
  }
})


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // .addCase(register.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(register.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.user = action.payload.user;
      //   state.isLoggedIn = true;
      //   state.error = null;
      // })
      // .addCase(register.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload?.message || "Registration failed";
      // });

      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.error = null;
      })

      


  },
});


export const authReducer = authSlice.reducer;
