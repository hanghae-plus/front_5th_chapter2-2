import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  className: string;
  text: string;
}

export const Button = ({
  onClick,
  className,
  disabled = false,
  text,
  ...rest
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={className}
      disabled={disabled}
      {...rest}
    >
      {text}
    </button>
  );
};
