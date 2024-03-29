"use client";
import { ButtonProps } from "@/@types";
import { NextPage } from "next";
import { Link } from "nextjs13-progress";

const Button: NextPage<ButtonProps> = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  children,
  isLoading,
  disabled,
  leftIcon,
  rightIcon,
  href,
  spinnerColor,
  spinnerSize,
  ...props
}) => {
  const variantClasses = {
    primary:
      "text-white border-2 bg-main-green-mg hover:bg-[#009E60] active:bg-main-green-mg-200 active:text-cod-gray-cg-500 disabled:bg-cod-gray-cg-300 disabled:text-cod-gray-cg-400 ",
    destructivePrimary:
      "text-white border-2 bg-red-500/40 hover:bg-red-600/30 active:bg-red-400/40 active:text-cod-gray-cg-500 disabled:bg-cod-gray-cg-300 disabled:text-cod-gray-cg-400 ",
    secondary:
      "text-main-green-mg border border-b-4 bg-white border-main-green-mg hover:text-white hover:border-[#009E6066] hover:bg-[#009E6066] active:bg-[#009E6066] active:text-cod-gray-cg-400 disabled:border-cod-gray-cg-300 disabled:text-cod-gray-cg-300 disabled:bg-white",
    destructiveSecondary:
      "text-red-500 border border-b-4 bg-white border-red-500/40 hover:text-white hover:border-red-600/40 hover:bg-red-600/30 active:bg-red-400/40 active:text-cod-gray-cg-500 disabled:border-cod-gray-cg-300 disabled:text-cod-gray-cg-300 disabled:bg-white",
    "link-secondary":
      "inline-flex py-3 p-6 justify-center items-center rounded-lg border-0 border-transparent",
    "link-primary":
      "text-cod-gray text-base leading-5 font-normal border-0 border-transparent hover:text-main-green-mg transition-all",
  };

  const sizeClasses = {
    sm: "py-2 px-4 border",

    md: "py-3 px-6 ",

    lg: "py-4 px-8 ",
  };

  const classNames = `relative transition-all duration-200 flex items-center justify-center gap-5 ${
    fullWidth ? "w-full" : "w-max"
  } h-auto font-sans ${variantClasses[variant]} ${sizeClasses[size]}`;

  if (href) {
    return (
      // @ts-ignore
      <Link className={`h-[40px] ${classNames}`} {...props} href={href}>
        {leftIcon && leftIcon}
        {children}
        {rightIcon && rightIcon}
      </Link>
    );
  }

  return (
    <button
      disabled={(isLoading ?? disabled) || disabled}
      className={classNames}
      {...props}
    >
      <div className="w-full h-full absolute top-0 flex flex-col items-center justify-center">
        <svg
          data-testid="spinner"
          width={spinnerSize ?? "20"}
          height={spinnerSize ?? "20"}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className={`animate-spin transition delay-[.2] ${
            isLoading ? "opacity-1 visible" : "opacity-0 hidden"
          }`}
        >
          <path
            fill={spinnerColor ?? "#009E60"}
            d="M12 21a9 9 0 1 1 6.18-15.55a.75.75 0 0 1 0 1.06a.74.74 0 0 1-1.06 0A7.51 7.51 0 1 0 19.5 12a.75.75 0 0 1 1.5 0a9 9 0 0 1-9 9Z"
          />
        </svg>
      </div>
      <div
        className={`flex items-center justify-center gap-2 ${
          isLoading ? "opacity-0" : "opacity-1"
        }`}
      >
        {leftIcon}
        {children}
        {rightIcon && (
          <span
            style={{
              opacity: isLoading ? 0 : 1,
            }}
          >
            {rightIcon}
          </span>
        )}
      </div>
    </button>
  );
};

export default Button;
