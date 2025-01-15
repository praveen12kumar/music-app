import {UserRepository} from "../repository/index.js";

class UserService{

    constructor(){
        this.userRespository = new UserRepository();
    }

    async signup(data) {
        const user = await this.userRespository.create(data);
        return user;
    }

}


export default UserService;