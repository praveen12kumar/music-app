import User from "../models/user.model.js";
import CrudRepository from "./crud-repository.js";

class UserRepository extends CrudRepository {
    constructor() {
        super(User);
    }

    
    async findBy(data){
        try {
            const response = await User.findOne(data);
            return response;
        } catch (error) {
            throw error;
        }
    }


    async findUserByToken(code){
        try {
            const response = await User.findOne({
                verificationToken:code, 
                verificationTokenExpire: {$gt: Date.now()}});
            return response;
        } catch (error) {
            throw error
        }
    }

}

export default UserRepository;