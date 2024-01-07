// Input.tsx
"use client";
import { InputProps, SelectInputProps, Size, Variant } from "@/@types";
import { Eye, EyeSlash } from "iconsax-react";
import React, { useState } from "react";

const variantClasses = {
  default: "text-cod-gray-cg-400 bg-light-green-shade border-transparent",
  primary: "border-solid !border-white border-2 text-white",
  secondary: "border-0 text-dark-gray",
  tertiary: "border-0 text-white",
};

const sizeClasses = {
  sm: "text-sm py-2",
  md: "text-base py-3",
  lg: "text-lg py-4",
};

function getVariantClass(variant: Variant) {
  return variantClasses[variant] || variantClasses.default;
}

function getSizeClass(size: Size) {
  return sizeClasses[size] || sizeClasses.sm;
}

export const SelectInput: React.FC<SelectInputProps> = ({
  options,
  leftIcon,
  caretSize,
  caretColor,
  onChange,
  disabled,
  optionColor,
  variant = "default",
  inputSize = "sm",
  fullWidth = false,
  optionPlaceholder,
  name,
  register,
  error,
  ...props
}) => {
  const variantClass = getVariantClass(variant);
  const sizeClass = getSizeClass(inputSize);
  const classNames = `${variantClass} ${sizeClass}`;

  return (
    <div
      className={`relative px-4 py-3 flex items-center justify-center ${
        fullWidth ? "w-full" : "w-fit"
      } h-[48px]  text-dark-100 hide-caret transition-all select-none focus-within:border-main-green-mg ${classNames}  ${
        disabled && "bg-[#A5B4FC] opacity-[.8] border-[1px] cursor-not-allowed"
      }`}
      style={{
        border: error ? "1px solid #EF4444" : "1px solid transparent",
      }}
    >
      {leftIcon && <div className="absolute top-2.5 left-2">{leftIcon}</div>}
      <select
        {...(register ? register(name) : {})}
        onChange={onChange}
        className={`w-full border-none outline-none hide-caret bg-transparent ${
          leftIcon ? "pl-7" : ""
        } ${disabled ? "cursor-not-allowed" : ""}}`}
        {...(props as any)}
        disabled={disabled}
      >
        {optionPlaceholder && (
          <option className={`${optionColor}`} value="" disabled selected>
            {optionPlaceholder}
          </option>
        )}
        {options.map((op: any, idx: any) => (
          <option
            key={idx}
            value={op.value}
            disabled={op.disabled}
            className={`${optionColor}`}
          >
            {op.label}
          </option>
        ))}
      </select>
      <svg
        width={caretSize ?? "30"}
        height={caretSize ?? "30"}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className=" top-3 right-5"
      >
        <path
          fill={caretColor ?? "#7777"}
          fillRule="evenodd"
          d="M16.53 8.97a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 1 1 1.06-1.06L12 12.44l3.47-3.47a.75.75 0 0 1 1.06 0Z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

export function Input({
  label,
  name,
  value,
  error,
  register,
  leftIcon,
  rightIcon,
  type,
  isLoading,
  iconColor,
  iconSize,
  disabled,
  onChange,
  placeholder,
  variant = "default",
  inputSize = "sm",
  inputType = "input",
  fullWidth = false,
  rows,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const variantClass = getVariantClass(variant);
  const sizeClass = getSizeClass(inputSize);
  const classNames = `${variantClass} ${sizeClass}`;

  return (
    <div className="flex w-full flex-col gap-1">
      {label && (
        <label
          htmlFor={name}
          className="text-SC-03 text-cod-gray-cg-400 capitalize"
        >
          {label}
        </label>
      )}
      <div
        className={`relative px-4 py-3 flex items-center justify-center gap-3 text-SP-03 ${
          fullWidth ? "w-full" : "w-fit"
        }
        text-dark-100 hide-caret transition-all select-none ${classNames} ${
          disabled ?? isLoading
            ? "bg-[#A5B4FC] opacity-[.8] border-[1px] cursor-not-allowed"
            : ""
        }`}
        style={{
          height: inputType === "input" ? "48px" : rows ? `${rows}px` : "120px",
          border: error ? "1px solid #EF4444" : "1px solid transparent",
        }}
      >
        {leftIcon && leftIcon}
        {inputType === "input" ? (
          <>
            <input
              {...(register ? register(name) : {})}
              type={
                type === "password"
                  ? showPassword
                    ? "text"
                    : "password"
                  : type
              }
              name={name}
              value={value}
              onChange={onChange}
              className={`w-full outline-none hide-caret ${
                disabled ?? isLoading
                  ? "cursor-not-allowed bg-[#A5B4FC]"
                  : "bg-transparent"
              } ${leftIcon ? "pl-1" : ""} `}
              placeholder={placeholder ?? "placeholder"}
              disabled={isLoading ?? disabled}
              {...props}
            />
            {type === "password" && ( // add this block
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              >
                {showPassword ? <EyeSlash /> : <Eye />}
              </div>
            )}
          </>
        ) : (
          <textarea
            {...(register ? register(name) : {})}
            className={`w-full outline-none hide-caret resize-none ${
              disabled ?? isLoading
                ? "cursor-not-allowed bg-[#A5B4FC]"
                : "bg-transparent"
            } ${leftIcon ? "pl-1" : ""} `}
            placeholder={placeholder ?? "placeholder"}
            disabled={isLoading ?? disabled}
            name={name}
            value={value}
            onChange={onChange}
            {...props}
            style={{
              height: rows ? `${rows - 32}px` : "100px",
            }}
          />
        )}
        <style jsx>{`
          input:-webkit-autofill,
          input:-webkit-autofill:hover,
          input:-webkit-autofill:focus,
          input:-webkit-autofill:active,
          textarea:-webkit-autofill,
          textarea:-webkit-autofill:hover,
          textarea:-webkit-autofill:focus,
          textarea:-webkit-autofill:active {
            -webkit-background-clip: text;
            -webkit-text-fill-color: ${variant === "default"
              ? "#6C757D"
              : "#fff"};
            //this transition actually does nothing, its a fallback for older chrome browswers
            transition: background-color 5000s ease-in-out 0s;
            box-shadow: inset 0 0 20px 20px transparent;
          }
        `}</style>
        {rightIcon && rightIcon}
      </div>
    </div>
  );
}
