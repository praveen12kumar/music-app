import {UserRepository} from "../repository/index.js";

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
        
        return {newUser, token};
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