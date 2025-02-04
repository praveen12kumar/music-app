import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";


interface Song {
  _id: string;
  title: string;
  artist: string;
  albumId: string | null;
  thumbnail: string;
  songUrl: string;
  duration: number;
  createdAt?: string;
  updatedAt?: string;
}

interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  queue: Song[];
  currentIndex: number;
}

const initialState: PlayerState = {
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentIndex: -1,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    initializeQueue: (state, action: PayloadAction<Song[]>) => {
      state.queue = action.payload;
      state.currentSong = state.currentSong || action.payload[0];
      state.currentIndex = state.currentIndex === -1 ? 0 : state.currentIndex;
    },
    playAlbum: (state, action: PayloadAction<{ songs: Song[]; startIndex: number }>) => {
      const { songs, startIndex = 0 } = action.payload;
      if (songs.length === 0) return;
      state.queue = songs;
      state.currentSong = songs[startIndex];
      state.currentIndex = startIndex;
      state.isPlaying = true;
    },
    setCurrentSong: (state, action: PayloadAction<Song | null>) => {
      if (!action.payload) return;
      state.currentIndex = state.queue.findIndex((s) => s._id === action.payload?._id);
      state.currentSong = action.payload;
      state.isPlaying = true;
    },
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    playNext: (state) => {
      const nextIndex = state.currentIndex + 1;
      // if there is next song to play add it to queue and play
      if (nextIndex < state.queue.length) {
        state.currentSong = state.queue[nextIndex];
        state.currentIndex = nextIndex;
        state.isPlaying = true;
      } else {
        state.isPlaying = false;
      }
    },
    playPrevious: (state) => {
      const prevIndex = state.currentIndex - 1;
      if (prevIndex >= 0) {
        state.currentSong = state.queue[prevIndex];
        state.currentIndex = prevIndex;
        state.isPlaying = true;
      } else {
        state.isPlaying = false;
      }
    },
  },
});

export const { initializeQueue, playAlbum, setCurrentSong, togglePlay, playNext, playPrevious } = playerSlice.actions;
export const selectPlayer = (state: RootState) => state.player;
export const playerReducer = playerSlice.reducer;
