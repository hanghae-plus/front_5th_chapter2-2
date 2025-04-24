import { useHandleInputChange } from "../../../hooks/common";

interface CreateProductFormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  field: "name" | "price" | "stock" | "quantity" | "rate";
}

export const CreateProductFormInput = ({
  label,
  field,
  className = "",
  onChange,
  ...props
}: CreateProductFormInputProps) => {
  const { handleInputChange } = useHandleInputChange(onChange);

  return (
    <div className="mb-2">
      <label
        htmlFor={props.id}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        className={`w-full p-2 border rounded ${className}`}
        {...props}
        onChange={handleInputChange(field)}
      />
    </div>
  );
};
