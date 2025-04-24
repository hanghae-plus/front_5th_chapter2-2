import { SelectOption } from '../../../../types';
import Option from './Option';

const DEFAULT_CLASS_NAME = 'w-full p-2 border rounded';

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder,
  className,
  disabled = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      className={DEFAULT_CLASS_NAME + ' ' + className}
      disabled={disabled}
    >
      {placeholder && <option value="">{placeholder}</option>}

      {options.map((option, index) => (
        <Option key={index} option={option} />
      ))}
    </select>
  );
};

export default Select;
