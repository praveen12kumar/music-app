import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../helpers/axiosInstance";
import toast from "react-hot-toast";

interface SongPropData{
    title:string,
    artist:string,
    album:string,
    duration:string,
    thumbnail:File,
    song:File,
    albumId?:string
}
interface SongResponse {
    title: string;
    artist: string;
    album: string;
    duration: string;
    thumbnail: string; // URL when receiving
    song: string;      // URL when receiving
    albumId?: string;
}


interface SongState {
    songs: SongResponse[];
    featuredSongs:SongResponse[];
    madeForYouSongs:SongResponse[];
    trendingSongs:SongResponse[];
}

const initialState: SongState = {
    songs: [],
    featuredSongs:[],
    madeForYouSongs:[],
    trendingSongs:[]
};

export const addSong = createAsyncThunk("song/addSong", async (data:SongPropData, { rejectWithValue }) => {
    
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

        return (await response).data.data as SongResponse 


    } catch (error:any) {
        toast.error(error.response?.data?.message || "Something went wrong");
        return rejectWithValue(error.response?.data || error.message);
    }
});


export const getAllSongs = createAsyncThunk('song/getAllSong', async (_, { rejectWithValue }) => {
    try {
        const response = axiosInstance.get('/songs/all');

        toast.promise(response, {
            loading: "Wait! Fetching songs...",
            success: "Songs fetched successfully",
            error: "Something went wrong",
        })

        return (await response)?.data?.data as SongResponse[]
    } catch (error:string | any) {
        toast.error(error?.response?.data?.message || "An error occurred");
        return rejectWithValue(error?.response?.data || { message: "Error" });
    }
});






export const songSlice = createSlice({
    name: "song",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(addSong.fulfilled, (state, action)=>{
            state.songs = [...state.songs, action.payload];
        })

        .addCase(getAllSongs.fulfilled, (state, action)=>{
            //console.log("action.payload", action.payload);
            state.songs = action.payload;
        })
    }
})


export const songReducer = songSlice.reducer;