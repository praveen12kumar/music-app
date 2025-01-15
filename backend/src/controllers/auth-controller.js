
import {UserService} from "../services/index.js";

const userService = new UserService();

export const signup = async (req, res) => {
    const {username, email, password} = req.body;
    try {
        const response = await userService.signup({username, email, password}); 
        return res.status(200).json({
            success: true,
            data: response,
            message: "User created successfully",
            err:{}
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: {},
            message: "Something went wrong",    
            err: error
        })
    }
};



