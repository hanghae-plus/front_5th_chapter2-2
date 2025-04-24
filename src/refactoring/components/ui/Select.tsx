import { SelectHTMLAttributes, OptionHTMLAttributes } from 'react';
import cn from 'clsx';

interface Option extends OptionHTMLAttributes<HTMLOptionElement> {
  key: string;
  value: string;
  content: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  options: Option[];
  className?: string;
}

export const Select = ({ name, options, className, ...rest }: SelectProps) => {
  const newClassName = cn(className, 'border rounded');

  return (
    <select
      className={newClassName}
      {...rest}
    >
      {options.map(({ key, value, content, ...rest }: Option) => (
        <option
          key={key}
          value={value}
          {...rest}
        >
          {content}
        </option>
      ))}
    </select>
  );
};
