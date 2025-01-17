interface ButtonProps {
    type:"submit" | "reset" | "button",
    text:string,
    classs:string,
    onClick?:()=>void
}
const Button :React.FC<ButtonProps> = ({type, text, classs, onClick}) => {
  return (
    <button 
        type={type}
        className={`${classs}`}
        onClick={onClick}
        >
        {text}
    </button>
  )
}

export default Button