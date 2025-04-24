import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
  color?: 'white' | 'blue' | 'red';
  role?: 'toggle' | 'submit' | 'delete' | 'add' | 'quantity' | 'disabled';
}

const roleClasses = {
  toggle: 'w-full text-left font-semibold',
  submit: 'w-full',
  delete: 'bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600',
  add: 'w-full p-2 w-full bg-blue-500 text-white hover:bg-blue-600',
  quantity: 'bg-gray-300 text-gray-800 px-2 py-1 rounded mr-1 hover:bg-gray-400',
  disabled: 'bg-gray-300 text-gray-500 cursor-not-allowed w-full px-3 py-1 rounded',
};

export const Button = ({ role = 'toggle', className, children, ...props }: ButtonProps) => {
  return (
    <button {...props} className={clsx('rounded', roleClasses[role], className)}>
      {children}
    </button>
  );
};
