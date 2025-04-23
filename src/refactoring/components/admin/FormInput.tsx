interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const FormInput = ({
  label,
  className = "",
  ...props
}: FormInputProps) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-1">
          {label}
          <input
            className={`w-full p-2 border rounded ${className}`}
            {...props}
          />
        </label>
      )}
    </div>
  );
};
