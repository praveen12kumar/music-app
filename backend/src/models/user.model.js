import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';


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
});


userSchema.pre('save', async function(next){
    const user = this;
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(user.password, salt);
    user.password = encryptedPassword;
    next();
})

const User = mongoose.model("users", userSchema);
export default User;
