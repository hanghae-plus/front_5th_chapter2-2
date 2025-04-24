import React, { useCallback } from 'react';

interface OptionSelectorProps<T> {
  options: T[];
  placeholder?: string;
  renderLabel: (option: T) => string;
  onOptionChange: (option: T) => void;
}

function OptionSelector<T>({
  options,
  placeholder = '옵션 선택',
  renderLabel,
  onOptionChange,
}: OptionSelectorProps<T>) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const idx = Number(e.target.value);
      const selected = options[idx];
      onOptionChange(selected);
    },
    [options, onOptionChange],
  );

  return (
    <select onChange={handleChange} className="w-full p-2 border rounded mb-2">
      <option value="">{placeholder}</option>
      {options.map((option, idx) => (
        <option key={idx} value={idx}>
          {renderLabel(option)}
        </option>
      ))}
    </select>
  );
}

export default OptionSelector;
