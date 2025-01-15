import {UserRepository} from "../repository/index.js";

class UserService{

    constructor(){
        this.userRespository = new UserRepository();
    }

    async signup(data) {
        const user = await this.userRespository.create(data);
        return user;
    }

    async getUserByEmail(email){
       try {
        const user = await this.userRespository.findBy({email})
        return user
       } catch (error) {
        throw error
       }
    }

    async signin(data){
        try {
            const user = await this.getUserByEmail(data.email); 
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
}


export default UserService;