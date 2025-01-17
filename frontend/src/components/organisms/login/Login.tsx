import { useState, useRef } from "react";
import GradientWrapper from "../../molecules/gradientWrapper/GradientWrapper"
import LogoImage from "../../atoms/logo/LogoImage";
import Input from "../../atoms/input/Input";
//import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Button from "../../atoms/button/Button";
import { validatePassword } from "../../../helpers/validatePassword";
import { validateEmail } from "../../../helpers/validateEmail";

interface CustomInput extends HTMLInputElement {
    setInValid: () => void;
}

const Login = () => {
    const emailRef = useRef<CustomInput | null>(null); // Specify the type
    const passwordRef = useRef<CustomInput | null>(null);
    
    //const [show, setShow] = useState(false)
    const [formValues, setFormValues] = useState({email: "", password: ""});


    const handleValidateEmail = ()=>{
        const email = formValues.email;
        if(!validateEmail(email)){
            emailRef.current?.setInValid();
        }
    }

    const handleValidatePassword = ()=>{
        const password = formValues.password;
        if(!validatePassword(password)){
            passwordRef.current?.setInValid();
        }
    }


    function handleInput(e: any) {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(event:any){
        event.preventDefault();
        handleValidateEmail();
        handleValidatePassword();        
    }

  return (
    <>
    <GradientWrapper graditientStyles="custom-gradient-slate">
        <div className="w-full h-dvh flex items-center justify-center">
            <div className={`w-5/12 h-[95%] rounded-lg  bg-[#181818] flex justify-center `}>
                <form className="w-[70%] h-full flex flex-col gap-6 items-center py-6" onSubmit={handleSubmit} noValidate>
                    
                    <div className="w-full flex flex-col gap-2 items-center justify-center">
                        <LogoImage width={40} height={40} />
                        <p className="text-3xl font-bold text-white font-poppins mr-10 ">Log in to Spotify</p>
                    </div>

                    <div className="w-full h-[1px] bg-[#333333]"></div>

                    <div className="w-3/4 flex flex-col gap-2">
                        <p className="text-md font-medium text-white">Email</p>
                        <Input 
                            type="email" 
                            placeholder="Enter your email" 
                            onChange={handleInput} 
                            value={formValues.email} 
                            name="email" 
                            ref={emailRef}
                            className="w-full bg-transparent text-md font-medium text-white placeholder-zinc-500 cursor-pointer outline-none border border-gray-400 rounded-md py-3 px-3 hover:border-white focus:border-none  focus:outline focus:outline-white " 
                            checkOnBlur = {handleValidateEmail}
                            />
                    </div>

                    <div className="w-3/4 flex flex-col gap-2 relative">
                        <p className="text-md font-medium text-white">Password</p>
                        <Input 
                            //type={show ? "text" : "password"} 
                            type="password"
                            placeholder="Enter your Password" 
                            onChange={handleInput} 
                            value={formValues.password} 
                            name="password" 
                            ref={passwordRef}
                            className="w-full bg-transparent text-md font-medium text-white placeholder-zinc-500 cursor-pointer outline-none border border-gray-400 rounded-md py-3 px-3 hover:border-white focus:border-none  focus:outline focus:outline-white " 
                            checkOnBlur = {handleValidatePassword}
                            />
                        {/* <div className="absolute right-3 bottom-3">
                            {
                                show ? <span className="cursor-pointer" onClick={() => setShow(!show)}><FaRegEye className="size-5 text-gray-300" /></span> 
                                : <span className="cursor-pointer" onClick={() => setShow(!show)}><FaRegEyeSlash className="size-5 text-gray-300"/></span>
                            }
                        </div> */}
                        
                    </div>

                    <div className="w-3/4 flex items-center justify-center mt-5">
                        <Button type="submit" text="Log in" classs="w-full bg-green-500 text-md text-zinc-900 font-bold rounded-3xl py-3 px-3 hover:scale-105 hover:bg-[#2BE457] transition duration-150 will-change-transform" />
                    </div>

                    <div className="w-full h-[1px] bg-[#333333]"></div>

                    <div className="w-full flex items-center justify-center gap-2">
                        <p className="text-md font-medium text-gray-400">Don't have an account?</p>
                        <p className="text-white  cursor-pointer underline underline-offset-1 transition hover:text-green-500">Sign up for free</p>
                    </div>


                </form>
            </div>
        </div>
    </GradientWrapper>
    </>
  )
}

export default Login