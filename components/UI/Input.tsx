// Input.tsx
import { InputProps } from "@/@types";
import React from "react";

const Input: React.FC<InputProps> = ({
  label,
  register,
  error,
  name,
  type,
  placeholder,
  value,
  onChange,
  fullWidth,
  inputType = "input",
}) => {
  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <label
          htmlFor={name}
          className="text-SC-03 text-cod-gray-cg-400 capitalize"
        >
          {label}
        </label>
      )}
      {inputType === "input" && (
        <input
          {...(register ? register(name) : {})}
          className={`flex p-3 justify-center items-center text-SP-03 font-normal text-cod-gray-cg-400 placeholder:text-cod-gray-cg-400 bg-light-green-shade outline-0 ${
            fullWidth ? "w-full" : "w-[400px]"
          }`}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
      {inputType === "textarea" && (
        <textarea
          {...(register ? register(name) : {})}
          className={`flex p-3 justify-center items-start text-SP-03 font-normal text-cod-gray-cg-400 placeholder:text-cod-gray-cg-400 bg-light-green-shade outline-0 ${
            fullWidth ? "w-full" : "w-[400px]"
          } resize-none gap-9 h-[97px]`}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
      {error && (
        <p className="text-SC-03 font-normal text-cod-gray-cg-400">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default Input;
