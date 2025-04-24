// src/refactoring/components/common/Button.tsx
type ButtonColor = "white" | "blue" | "green" | "red" | "gray" | "none";

type ButtonWidth = "full" | "third" | "default";

type ButtonText = "left-semibold" | "default";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColor;
  width?: ButtonWidth;
  text?: ButtonText;
  className?: string;
}

export const Button = ({
  color = "none",
  width = "default",
  text = "default",
  className = "",
  disabled,
  children,
  ...props
}: ButtonProps) => {
  const colorStyles: Record<ButtonColor, string> = {
    white: "bg-white text-blue-600 hover:bg-blue-100",
    blue: "bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-500",
    green: "bg-green-500 text-white hover:bg-green-600",
    red: "bg-red-500 text-white hover:bg-red-600",
    gray: "bg-gray-300 text-gray-500 hover:bg-gray-400",
    none: "",
  };

  const widthStyles: Record<ButtonWidth, string> = {
    full: "w-full",
    third: "w-1/3",
    default: "",
  };

  const textStyles: Record<ButtonText, string> = {
    "left-semibold": "text-left font-semibold",
    default: "",
  };

  const disabledStyles = disabled ? "cursor-not-allowed" : "";

  return (
    <button
      className={`
        rounded
        ${colorStyles[color]}
        ${widthStyles[width]}
        ${textStyles[text]}
        ${disabledStyles}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
