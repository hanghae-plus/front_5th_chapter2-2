interface InputProps {
  label?: string;
  id: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  inputClassName?: string; // input에 별도 스타일 줄 수 있게
  labelClassName?: string; // label에 별도 스타일 줄 수 있게
}

export const Input = ({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  inputClassName = 'w-full p-2 border rounded',
  labelClassName = 'block text-sm font-medium text-gray-700',
  ...rest
}: InputProps) => (
  <div className="mb-2">
    {label && (
      <label htmlFor={id} className={labelClassName}>
        {label}
      </label>
    )}
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={inputClassName}
      {...rest}
    />
  </div>
);
