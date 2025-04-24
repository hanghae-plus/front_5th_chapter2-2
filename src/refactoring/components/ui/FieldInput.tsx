import { ChangeEvent } from 'react';

interface FieldInputProps {
  label: string;
  type?: 'text' | 'number';
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function FieldInput(props: FieldInputProps) {
  const { label, type = 'text', value, onChange } = props;

  return (
    <>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        className="w-full p-2 border rounded mb-2"
        value={value}
        onChange={onChange}
      />
    </>
  );
}
