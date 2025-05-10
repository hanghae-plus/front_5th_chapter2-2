interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = (props: InputFieldProps) => (
  <input type="text" {...props} className="w-full p-2 border rounded" />
);
