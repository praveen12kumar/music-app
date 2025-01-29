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


export const updateUserProfile = createAsyncThunk("user/updateUserProfile", async (data: any, { rejectWithValue }) => {
 
   const formdata = new FormData();
   formdata.append("username", data.username);
   formdata.append("avatar", data.avatar);
   
    try {
      const response = axiosInstance.put("/user/update-profile", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await toast.promise(response, {
        loading: "Wait! Updating user profile...",
        success: "User profile updated successfully",
        error: "Something went wrong",
      });
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
    builder
    .addCase(getUserDetails.fulfilled, (state, action) => {
      state.user = action?.payload?.data;
    })
    .addCase(updateUserProfile.fulfilled, (state, action) => {
      //console.log("action", action);
      state.user = action?.payload?.data;
    })
  },
});


export const userReducer = userSlice.reducer;