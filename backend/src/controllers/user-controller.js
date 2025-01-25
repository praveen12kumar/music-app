import { UserService } from "../services/index.js";

const userService = new UserService();


export const getUserDetails = async(req, res)=>{
    console.log("Call getUserDetails");
    
    try {
        const user = await userService.getUserById(req.user.id);
        return res.status(200).json({
            success: true,
            data: user,
            message: "User found successfully",
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
}