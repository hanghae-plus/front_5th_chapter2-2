import React, { SelectHTMLAttributes } from 'react';

interface Option {
  label: string;
  value: string | number;
}

interface SelectFieldProps {
  label?: string;
  options: Option[];
  value: string | number;
  onChange: (value: string) => void;
  className?:string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  value,
  onChange,
  className = '',
  ...rest
}) => {
  return (
    <div className="flex flex-col mb-4">
      {label && <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)} 
        className={`border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...rest}
      >
        <option value="">선택하세요</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
