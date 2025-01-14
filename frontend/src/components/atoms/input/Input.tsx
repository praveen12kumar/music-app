interface InputProps {
    type: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    classs: string;
  }


const Input:React.FC<InputProps> = ({type, placeholder, onChange, value, classs}) => {
  return (
        <input 
            type={type} 
            placeholder={placeholder} 
            onChange={onChange} 
            value={value} 
            className={classs}
            />
  )
}

export default Input