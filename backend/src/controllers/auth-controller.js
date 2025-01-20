
import e from "express";
import {UserService} from "../services/index.js";

const userService = new UserService();


//-------------------- Signup Controller --------------------

export const signup = async (req, res) => {
    const {username, email, password} = req.body;

    if(!username || !email || !password){
        return res.status(400).json({
            success: false,
            data: {},
            message: "All fields are required",
            err:{}
        })
    }

    try {
        const response = await userService.signup({username, email, password}); 
        res.cookie("token", response.token, 
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production" || false,
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 24 * 7
            }            
        );
        return res.status(200).json({
            success: true,
            data: response.newUser,
            message: "User created successfully",
            err:{}
        })
    } catch (error) {
        if(error.message === "User already exists") {
            return res.status(409).json({
                success: false,
                data: {},
                message: "User already exists",
                err: error.message
            })
        }
        else{
        return res.status(500).json({
            success: false,
            data: {},
            message: "Something went wrong",    
            err: error
            })
        }
    }
};


//-------------------- Login Controller --------------------

export const login = async(req, res)=>{
    const {email, password} = req.body;
    try{  
          const token = await userService.signin({email, password});
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



//----------------- Verify Email Controller ---------------------

export const verifyEmail = async(req, res)=>{
    // 1 2 3 4 5 6  six digits code
    const {code} = req.body;
    try{
        const response = await userService.verifyUserEmail(code);
        return res.status(200).json({
            success: true,
            data: response,
            message: "User verified successfully",
            err:{}
        })
    }
    catch(error){
        if(error.message === "invalid verification code"){
            return res.status(400).json({
                success: false,
                data: {},
                message: "invalid verification code",
                err: error.message
            })
        }
        else{
        return res.status(500).json({
            success: false,
            data: {},
            message: "Something went wrong",
            err: error
           })
        }
    }
} 



//-------------logout Controller-----------------








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

