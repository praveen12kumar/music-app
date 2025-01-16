
import JWT from "passport-jwt";
import User from "../models/user.model.js";
import { JWT_SECRET } from "./config.js";

const JwtStrategy = JWT.Strategy;
const ExtractJwt = JWT.ExtractJwt;

var opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = JWT_SECRET;

export const passportAuth = (passport) =>{
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
       const user = await User.findById(jwt_payload.id);

       if(!user){
           return done(null, false);
       }
       else{
        return done(null, user);
       }
    }))
}



