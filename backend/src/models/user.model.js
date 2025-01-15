import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    password:{
        type: String,
        required: true
    },

    likedSongs:{
        type: String,
        default:""
    },
    subscribedArtists:{
        type: String,
        default:""
    },
    subscribedPlaylists:{
        type: String,
        default:""
    },
    profilePic:{
        type: String,
        default:""
    },
},
{
    timestamps: true
}
);

const User = mongoose.model("users", userSchema);
export default User;
