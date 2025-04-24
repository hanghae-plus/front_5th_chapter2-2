import { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "success" | "default";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};

export const Button = ({
  children,
  variant = "default",
  size = "md",
  fullWidth = false,
  className = "",
  ...props
}: PropsWithChildren<ButtonProps>) => {
  const baseStyles =
    "rounded font-medium inline-flex items-center justify-center transition-colors";

  const variantStyles: Record<ButtonVariant, string> = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-300 text-gray-800 hover:bg-gray-400",
    danger: "bg-red-500 text-white hover:bg-red-600",
    success: "bg-green-500 text-white hover:bg-green-600",
    default: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50",
  };

  const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-1.5 text-base",
    lg: "px-4 py-2 text-lg",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  const disabledStyles = props.disabled ? "opacity-50 cursor-not-allowed" : "";

  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${disabledStyles} ${className}`;

  return (
    <button className={buttonStyles} {...props}>
      {children}
    </button>
  );
};
