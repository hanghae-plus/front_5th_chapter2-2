import { ChangeEvent } from 'react';

interface LabeledInputProps {
  id: string;
  name: string;
  label: string;
  type?: 'text' | 'number';
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function LabeledInput(props: LabeledInputProps) {
  const { id, name, label, type = 'text', value, onChange } = props;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        className="w-full p-2 border rounded"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
