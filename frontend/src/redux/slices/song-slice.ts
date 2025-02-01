import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../helpers/axiosInstance";
import toast from "react-hot-toast";

interface SongProp{
    title:string,
    artist:string,
    album:string,
    duration:string,
    thumbnail:File,
    song:File
}


interface SongState {
    song: string[];
}

const initialState: SongState = {
    song: [],
};

export const addSong = createAsyncThunk("song/addSong", async (data:SongProp, { rejectWithValue }) => {
    console.log("data", data);
    
    try {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("artist", data.artist);
        formData.append("album", data.album);
        formData.append("duration", data.duration);
        formData.append("thumbnail", data.thumbnail);
        formData.append("song", data.song);

        const response =  axiosInstance.post('/admin/songs/add', formData, {
            headers:{
                "Content-Type": "multipart/form-data"
            }
        })

        toast.promise(response, {
            loading: "Wait! Adding song...",
            success: "Song added successfully",
            error: "Something went wrong",
        })

        console.log("response", await response);

        return (await response).data


    } catch (error:any) {
        toast.error(error.response?.data?.message || "Something went wrong");
        return rejectWithValue(error.response?.data || error.message);
    }
});




export const songSlice = createSlice({
    name: "song",
    initialState,
    reducers:{},
    extraReducers: (builder) => {}
})


export const songReducer = songSlice.reducer;