import React, { InputHTMLAttributes, useCallback, useRef, useState } from "react";
import { emailValidation } from "../../FormValidations/FormValidations";
import { cep, cpf, currency, nullMask } from "../Masks/Masks";
import { InputContainer } from "./styles";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    type:   "text" | "email" | "password" | "button" | 
            "color" | "file" | "cpf" | "currency" | "cep";
    prefix?: string;
    spanText?: string;
}

const Input: React.FC<InputProps> = ({ name, type, prefix, spanText, ...props }) => {
    const [ isFocused, setIsFocused ] = useState<Boolean>(false);
    const [ isFilled, setIsFilled ] = useState<Boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    
    const handleKeyUp = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {        
            if (type === "cep") {
                cep(e);
            }
            if (type === "currency") {
                currency(e);
            }
            if (type === "cpf") {
                cpf(e);
            }
            if (type === "email") {
                emailValidation(e);
            }
            if (!type) {
                nullMask(e);
            }
        }, 
        [type]
    );

    return (
        <InputContainer>
            {spanText && <span>{spanText}</span>}
            <br />
            <label htmlFor={name}>{name}</label>
            {prefix && <span>{prefix}</span>}
            <input ref={inputRef} type={type} {...props} onKeyUp={handleKeyUp} />
        </InputContainer>
    )
};

export default Input;