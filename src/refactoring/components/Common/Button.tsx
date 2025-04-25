import React from "react";

type Variant =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "ghost"
  | "textOnly";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
}

export const Button = ({
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyle = "px-3 py-2 rounded font-medium transition-all";
  const widthStyle = fullWidth ? "w-full" : "";
  const variantStyle: Record<Variant, string> = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-300 text-gray-800 hover:bg-gray-400",
    danger: "bg-red-500 text-white hover:bg-red-600",
    success: "bg-green-500 text-white hover:bg-green-600",
    ghost: "bg-white text-blue-600 hover:bg-blue-100",
    textOnly: "bg-transparent text-black hover:underline",
  };

  return (
    <button
      className={`${baseStyle} ${variantStyle[variant]} ${widthStyle} ${className}`}
      {...props}
    />
  );
};
