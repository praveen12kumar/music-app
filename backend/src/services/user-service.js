import {UserRepository} from "../repository/index.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";



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