interface ButtonProps {
    type:"submit" | "reset" | "button",
    text:string,
    className:string,
    onClick?:()=>void
}
const Button :React.FC<ButtonProps> = ({type, text, className, onClick}) => {
  return (
    <button 
        type={type}
        className={`${className}`}
        onClick={onClick}
        >
        {text}
    </button>
  )
}

export default Button