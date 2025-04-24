import { ChangeEvent } from "react";

type FormFieldInputProps = {
  id?: string;
  label: string;
  type: "text" | "number";
  name: string;
  value: string | number;
  editing?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const FormFieldInput = ({
  id,
  label,
  type,
  name,
  value,
  onChange,
  editing = false,
  ...props
}: FormFieldInputProps) => {
  const inputWrapperClass = editing ? "mb-2" : "mb-4";
  const labelClass = editing
    ? "block mb-1"
    : "block text-sm font-medium text-gray-700";

  return (
    <div className={inputWrapperClass}>
      <label htmlFor={id} className={labelClass}>
        {label}
        {editing && ": "}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        value={value as string | number}
        onChange={onChange}
        className="w-full p-2 border rounded"
        {...props}
      />
    </div>
  );
};
