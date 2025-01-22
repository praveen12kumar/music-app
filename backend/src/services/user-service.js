import {UserRepository} from "../repository/index.js";
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessfulEmail } from "../mailtrap/emails.js";
import crypto from "crypto";
import brcypt from "bcrypt";

class UserService{

    constructor(){
        this.userRespository = new UserRepository();
    }
    
    async signup(data) {
        // check if user already exist
        const user = await this.userRespository.findBy({email: data.email});
        if(user){
            throw{
                message: "user already exist",
                success: false,
            }
        }
        const newUser = await this.userRespository.create(data);
        const token = newUser.generateJWTToken();

        sendVerificationEmail(newUser.email, newUser.verificationToken);
        
        return {newUser, token};
    }

    // ------------verify user Email--------------

    async verifyUserEmail(code){
        
        const user = await this.userRespository.findUserByToken(code)
        if(!user){
            throw{
                message: "invalid verification code",
                success: false,
            }
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpire = undefined;
        await user.save();
        console.log("user", user);
        await sendWelcomeEmail(user.email, user.username);
        return user
    }

// ------------signin user------------

    async signin(data){
        try {
            const user = await this.userRespository.findByEmail(data.email); 
            if(!user){
                throw{
                    message: "no user found",
                    success: false,
                }
            }
            // compare the password of user
            if(!user.comparepassword(data.password)){
                throw{
                    message: "invalid password",
                }
            }
            
            //generate token
            const token = user.generateJWTToken();
            return token;    
        } catch (error) {
            throw error
        }
    }

// -------------forgot -password Service--------------

  async forgotUserPassword(email){
        try {
            const user = await this.userRespository.findByEmail(email);
            if(!user){
                throw{
                    message: "User not found",
                    success: false,
                }
            }

            //generate Reset token

            const resetToken = crypto.randomBytes(32).toString("hex");
            const resetTokenExpire = Date.now() + 10 * 60 * 1000; // 1 hr

            user.resetPasswordToken = resetToken;
            user.resetPasswordExpire = resetTokenExpire;
            await user.save();

            await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);
            return user;

        } catch (error) {
            throw error
        }
    }



// ----------resetUserPassword----------------

    async resetUserPassword(token, password){
        try {
            const user = await this.userRespository.findByResetPassword(token);
            if(!user){
                throw{
                    message: "Invalid or Expired token",
                    success: false,
                }
            }
            console.log("user", user);
            
            const hashedPassword = await brcypt.hash(password, 10);
            user.password = hashedPassword;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();
            console.log("user", user);
            await sendResetSuccessfulEmail(user.email);

        } catch (error) {
            throw error
        }
    }



     

    async getUserById(id){
        try {
            const user = await this.userRespository.get(id);
            return user
        } catch (error) {
            throw error
        }
    }
}


export default UserService;