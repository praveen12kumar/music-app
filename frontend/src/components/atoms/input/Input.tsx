import React, { useEffect, useImperativeHandle, useRef, useState } from "react";

interface InputProps {
    type: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    id?:string;
    value?: string | undefined;
    name?: string;
    className: string;
    accept?:string | null
    checkOnBlur?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ type, placeholder, onChange, value, className, name, checkOnBlur }, ref) => {
        const localRef = useRef<HTMLInputElement>(null);

        const [isValid, setIsValid] = useState(true);
        const [text, setText] = useState("");

        useImperativeHandle(ref, () => ({
            ...localRef.current!, // Spread all native properties of the input
            focus: () => localRef.current?.focus(),
            setInValid: () => setIsValid(false), // Add custom focus method
        }));

        useEffect(() => {
            setIsValid(true);
        }, [text]);

        // Wrapper function for handling `onChange`
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setText(e.target.value); // Update internal state
            onChange(e); // Call the `onChange` function passed via props
        };

        return (
            <>
                <input
                    type={type}
                    placeholder={placeholder}
                    onChange={handleChange} // Use the wrapper function
                    value={value}
                    name={name}
                    className={`${className}`}
                    ref={localRef}
                    onBlur={checkOnBlur}
                />
                
                <p className=" text-red-600 text-xs">
                    {!isValid ? `${name} is invalid` : ""}
                </p>
            </>
        );
    }
);

Input.displayName = "Input";

export default Input;
