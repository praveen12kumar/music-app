import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SongProp } from "../../interface";
import { axiosInstance } from "../../helpers/axiosInstance";
import toast from "react-hot-toast";


interface SongState {
    song: string[];
}

const initialState: SongState = {
    song: [],
};

const addSong = createAsyncThunk("song/addSong", async (data: SongProp, { rejectWithValue }) => {
    try {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("artist", data.artist);
        formData.append("album", data.album);
        formData.append("duration", data.duration);
        formData.append("thumbnailUrl", data.thumbnailUrl);
        formData.append("songUrl", data.songUrl);

        const response = axiosInstance.post('/admin/songs/add', formData, {
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


    } catch (error) {
        
    }
});




const songSlice = createSlice({
    name: "song",
    initialState,
    reducers:{},
    extraReducers: (builder) => {}
})


export default songSlice.reducer