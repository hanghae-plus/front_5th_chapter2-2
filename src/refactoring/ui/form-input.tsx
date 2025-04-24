type FormInputProps = {
  id: string;
  label: string;
  type?: string;
  value: string | number;
  wrapperClassName?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FormInput = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  wrapperClassName,
}: FormInputProps) => (
  <div className={wrapperClassName}>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      className="w-full p-2 border rounded"
    />
  </div>
);
