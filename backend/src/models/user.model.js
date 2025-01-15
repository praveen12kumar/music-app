import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_EXPIRY, JWT_SECRET } from "../config/config.js";


const userSchema = new Schema({
    username:{
        type: String,
        required: [true, "can't be blank"],
        lowercase: true,
        match: [/^[a-zA-Z0-9._]+$/, "Username is invalid"],
        unique: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: [true, "can't be blank"],
        match:[/\S+@\S+\.\S+/, 'is invalid'],
    },

    password:{
        type: String,
        required: true,
        minLength: [3, 'Password cannot be less than 3 characters']
    },

    likedSongs:{
        type: [String],
        default:""
    },
    subscribedArtists:{
        type: [String],
        default:""
    },
    subscribedPlaylists:{
        type: [String],
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
    if(!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(this.password, salt);
        this.password = encryptedPassword;
        next();
    } catch (error) {
        next(error)
    }
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
