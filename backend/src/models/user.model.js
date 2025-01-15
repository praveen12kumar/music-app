import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_EXPIRY, JWT_SECRET } from "../config/config.js";


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

userSchema.methods.comparepassword = function compare(password){
    const result = bcrypt.compareSync(password, this.password);
    return result;   
}

userSchema.methods.generateJWTToken = function() {
    const token = jwt.sign(
        {
            id: this._id.toString(), // Use the string representation of the ObjectId
            email: this.email,
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRY }
    );
    return token;
};


const User = mongoose.model("users", userSchema);
export default User;
