import { ReactNode } from "react"

interface GradientWrapperProps {
    children:ReactNode;
    fromColor?:string;
    viaColor?:string;
    toColor?:string
}


const GradientWrapper: React.FC<GradientWrapperProps> = ({ children}) => {
  return (
    <div className={`h-full overflow-y-auto bg-gradient-to-b from-[#333333] via-[#181818] to-[#121212] rounded-md`}>
        {children}
    </div>
  )
}

export default GradientWrapper