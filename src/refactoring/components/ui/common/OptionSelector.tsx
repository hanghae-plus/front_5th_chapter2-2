type Option = {
  label: string;
  value: string | number;
};

type OptionSelectorProps = {
  value: string | number;
  options: Option[];
  className?: string;
  placeholder?: string;
  onChange: (value: string | number) => void;
};

export const OptionSelector = ({
  value,
  options,
  className = "",
  placeholder,
  onChange,
}: OptionSelectorProps) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option value={option.value} key={option.label}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
