interface LogoImageProps {
    width: number;
    height: number;
    className?:string;
}

import logo from "../../../assets/images/logo.png";


const LogoImage : React.FC<LogoImageProps> = ({width, height, className}) => {
  return (
        <div className="w-1/3 h-full flex flex-row items-center pl-5">
          <img className={`rounded-full border-none bg-white ${className}`} 
              src={logo} 
              alt="logo" 
              width={width} 
              height={height} />
        </div>
   
  )
}

export default LogoImage
