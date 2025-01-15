
import JWT from "passport-jwt";
import User from "../models/user.model.js";

const JwtStrategy = JWT.Strategy;
const ExtractJwt = JWT.ExtractJwt;

var opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

export const passportAuth = (passport) =>{
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
       const user =  User.findById(jwt_payload._id);

       if(!user){
           return done(null, false);
       }
       else{
        return done(null, user);
       }
    }))
}


