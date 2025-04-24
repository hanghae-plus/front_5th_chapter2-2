import React, { InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

export const InputField: React.FC<InputFieldProps> = ({ label, className = '', id, ...rest }) => {
  const inputId = id || (label ? label.replace(/\s+/g, '-').toLowerCase() : undefined);

  return (
    <div className="flex flex-col mb-4">
      {label && (
        <label htmlFor={inputId} className="mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`border border-gray-300 rounded px-3 py-2 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 
                    disabled:bg-gray-100 disabled:cursor-not-allowed 
                    ${className}`}
        {...rest}
      />
    </div>
  );
};
