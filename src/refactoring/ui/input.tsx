type InputProps = {
  type?: string;
  value: string | number;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
};

export const Input = ({ type = "text", value, placeholder, onChange, className }: InputProps) => (
  <input
    type={type}
    value={value}
    placeholder={placeholder}
    onChange={onChange}
    className={className}
  />
);
