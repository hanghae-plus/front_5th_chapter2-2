import { ButtonHTMLAttributes, ReactNode } from 'react';
import cn from 'clsx';

export type ButtonVariant = 'solid' | 'ghost' | 'text';
export type ButtonColor = 'black' | 'white' | 'blue' | 'red' | 'gray' | 'green';

const buttonStyles = {
  solid: {
    black: 'bg-black text-white hover:bg-gray-700',
    white: 'bg-white text-blue-600 hover:bg-blue-100',
    blue: 'bg-blue-500 text-white hover:bg-blue-600',
    red: 'bg-red-500 text-white hover:bg-red-60',
    gray: 'bg-gray-300 text-gray-800 hover:bg-gray-400',
    green: 'bg-green-500 text-white hover:bg-green-600',
  },
  ghost: {
    black: 'outline outline-black text-white',
    white: 'outline outline-white text-white',
    blue: 'outline outline-blue-500 text-blue-500',
    red: 'outline outline-red-500 text-red-500',
    gray: 'outline outline-gray-300 text-gray-300',
    green: 'outline outline-green-500 text-green-500',
  },
  text: {
    black: 'text-black',
    white: 'text-white',
    blue: 'text-blue-500',
    red: 'text-red-500',
    gray: 'text-gray-300',
    green: 'text-green-500',
  },
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  color?: ButtonColor;
}

export const Button = ({
  children,
  className,
  variant = 'solid',
  color = 'blue',
  ...rest
}: ButtonProps) => {
  const newClassName = cn(
    className,
    buttonStyles[variant][color],
    'rounded disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500',
  );

  return (
    <button
      className={newClassName}
      {...rest}
    >
      {children}
    </button>
  );
};
