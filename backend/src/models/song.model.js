import mongoose,{Schema} from "mongoose";

const songSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    artists:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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
    },
    thumbnail: {
        type: String,
        
    },
},
{
    timestamps: true
});

const Song = mongoose.model("Song", songSchema);
export default Song;