import React, { ButtonHTMLAttributes, Children } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
    loading?: boolean;
    className?: string;
  }

  export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    loading = false,
    className = '',
    children,
    disabled,
    ...rest

  }) => {
    const baseStyle = `inline-flex items-center justify-center rounded px-4 py-2 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-1`;
    const variantStyle = {
      primary: `bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400`,
      secondary: `bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400`,
      danger: `bg-red-500 text-white hover:bg-red-600 focus:ring-red-400`,
    };
  
    const combined = [
      baseStyle,
      variantStyle[variant],
      disabled || loading ? 'opacity-50 cursor-not-allowed' : '',
      className,
    ].join(' ');

    return (
        <button
        disabled={disabled || loading}
        className={combined}
        {...rest}
      >
        {loading ? (
          <>
            <span className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent rounded-full mr-2"></span>
            로딩 중...
          </>
        ) : (
          children
        )}
      </button>
    )

}
  