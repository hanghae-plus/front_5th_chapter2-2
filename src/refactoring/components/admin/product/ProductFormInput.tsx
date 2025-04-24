interface ProductFormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const ProductFormInput = ({
  label,
  className = "",
  ...props
}: ProductFormInputProps) => {
  return (
    <div className="mb-2">
      <label
        htmlFor={props.id}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input className={`w-full p-2 border rounded ${className}`} {...props} />
    </div>
  );
};
