import { ButtonHTMLAttributes } from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, onClick, className = "", ...rest }: ButtonProps) => {
  return (
    <button onClick={onClick} className={className} {...rest}>
      {children}
    </button>
  );
};
