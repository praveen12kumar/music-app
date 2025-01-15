import mongoose,{Schema} from "mongoose";

const songSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        required: "User",
    },
    genre: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    songUrl: {
        type: String,
        required: true
    },
    thumnail: {
        type: String,
        required: true
    },
},
{
    timestamps: true
});

const Song = mongoose.model("Song", songSchema);
export default Song;