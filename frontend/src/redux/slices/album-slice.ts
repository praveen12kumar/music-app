import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../helpers/axiosInstance";
import toast from "react-hot-toast";

interface AlbumPropData{
    title:string,
    artist:string,
    thumbnail:File;
    releaseYear:number 
}

interface AlbumPropResponse{
    title:string,
    artist:string,
    thumbnail:string,
    releaseYear:number,
    songs?:string[], 
}

interface AlbumState {
    albums: AlbumPropResponse[]
}



const initialState: AlbumState = {
    albums: []
}

export const addAlbum = createAsyncThunk("album/addAlbum", async (data:AlbumPropData, { rejectWithValue }) => {

    const formdata = new FormData();
    formdata.append("title", data.title);
    formdata.append("artist", data.artist);
    formdata.append("releaseYear", data.releaseYear.toString());
    formdata.append("thumbnail", data.thumbnail);

    try {
        const response = axiosInstance.post("/admin/albums/add", formdata,{
            headers:
            { "Content-Type": "multipart/form-data" },
        } );

        toast.promise(response, {
            loading: "Wait! Adding album...",
            success: "Album added successfully",
            error: "Something went wrong",
        })

        return (await response)?.data?.data as AlbumPropResponse;

    } catch (error:string | any) {
        toast.error(error?.response?.data?.message || "An error occurred");
        return rejectWithValue(error?.response?.data || { message: "Error" });
    }
});

export const getAllAlbums = createAsyncThunk("album/getAllAlbums", async (_, { rejectWithValue }) => {
    try {
        const response = axiosInstance.get("/albums/all");

        toast.promise(response, {
            loading: "Wait! Fetching albums...",
            success: "Albums fetched successfully",
            error: "Something went wrong",
        })

        return (await response)?.data?.data as AlbumPropResponse[]

    } catch (error : string | any) {
        toast.error(error?.response?.data?.message || "An error occurred");
        return rejectWithValue(error?.response?.data || { message: "Error" });
    }
})



export const albumSlice = createSlice({
    name: "album",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
        .addCase(addAlbum.fulfilled, (state, action) => {
            state.albums = [...state.albums, action.payload];
        })

        .addCase(getAllAlbums.fulfilled, (state, action) => {
            state.albums = action.payload;
        })
    }
})

export const albumReducer = albumSlice.reducer;
