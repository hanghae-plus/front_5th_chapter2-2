interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const FormInput = ({
  label,
  className = "",
  ...props
}: FormInputProps) => {
  return (
    <div className="mb-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input className={`w-full p-2 border rounded ${className}`} {...props} />
    </div>
  );
};
