type TextColor = "gray" | "green" | "blue" | "red" | "default";
type TextSize = "sm" | "default";
type TextWeight = "semibold" | "medium" | "default";

interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: TextColor;
  size?: TextSize;
  weight?: TextWeight;
}
export const Text = ({
  color = "default",
  size = "default",
  weight = "default",
  className = "",
  children,
  ...props
}: TextProps) => {
  const colorStyles: Record<TextColor, string> = {
    gray: "text-gray-600",
    green: "text-green-600",
    blue: "text-blue-600",
    red: "text-red-600",
    default: "",
  };

  const sizeStyles: Record<TextSize, string> = {
    sm: "text-sm",
    default: "",
  };

  const weightStyles: Record<TextWeight, string> = {
    semibold: "font-semibold",
    medium: "font-medium",
    default: "",
  };

  return (
    <span
      className={`
        ${colorStyles[color]}
        ${sizeStyles[size]}
        ${weightStyles[weight]}
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
};
