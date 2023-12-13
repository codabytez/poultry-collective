import { ButtonProps } from "@/@types";
import { NextPage } from "next";

const Button: NextPage<ButtonProps> = ({
  color = "green",
  size = "medium",
  fullWidth = false,
  children,
  ...props
}) => {
  let colorClasses: string;
  switch (color) {
    case "white":
      colorClasses =
        "text-main-green-mg bg-white border-main-green-mg hover:text-white hover:border-[#009E6066] hover:bg-[#009E6066] active:bg-[#009E6066] active:text-cod-gray-cg-400 disabled:border-cod-gray-cg-300 disabled:text-cod-gray-cg-300 disabled:bg-white";
      break;
    case "green":
    default:
      colorClasses =
        "text-white bg-main-green-mg hover:bg-[#009E60] active:bg-main-green-mg-200 active:text-cod-gray-cg-500 disabled:bg-cod-gray-cg-300 disabled:text-cod-gray-cg-400 ";
      break;
  }

  let sizeClasses: string;
  switch (size) {
    case "small":
      sizeClasses = "py-2 px-4 border border-b-4";
      break;
    case "medium":
      sizeClasses = "py-3 px-6 rounded border-2";
      break;
    case "large":
    default:
      sizeClasses = "py-4 px-8 border-2";
      break;
  }

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      className={`font-semibold flex shrink-0 items-center justify-center gap-1 transition-all ${colorClasses} ${sizeClasses} ${widthClass}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
