
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

export const login = async(req, res)=>{
    const {email, password} = req.body;
    try{  
          const token = await userService.signin({email, password});
          console.log("token", token);
          return res.status(200).json({
              success: true,
              data: token,
              message: "User logged in successfully",
              err:{}
          })
        } catch (error) {
        return res.status(500).json({
            success:false,
            data:{},
            message:"Something went wrong",
            err: error
        })   
    }
}


export const findUserById = async(req, res)=>{
    try {
        const user = await userService.getUserById(req.params.id);
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

