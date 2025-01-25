import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../helpers/axiosInstance";
import toast from "react-hot-toast";


interface userState {
  user: any;
}



const initialState:userState = {
  user: localStorage.getItem("user") || null,
};


export const getUserDetails = createAsyncThunk("user/getUserDetails", async (_, { rejectWithValue }) => {
    try {
      const response = axiosInstance.get("/user");
      await toast.promise(response, {
        loading: "Wait! Fetching user details...",
        success: "User details fetched successfully",
        error: "Something went wrong",
      });
      console.log("response", await response);
      return (await response).data;

    } catch (error:string | any) {
      toast.error(error?.response?.data?.message || "An error occurred");
      return rejectWithValue(error?.response?.data || { message: "Error" });
    }
  } 
)



const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.user = action?.payload?.data;
    });
  },
});


export const userReducer = userSlice.reducer;