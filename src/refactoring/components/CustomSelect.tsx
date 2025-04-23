interface SelectPropTypes {
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  children: React.ReactNode;
  value?: string | number | readonly string[] | undefined;
}

interface OptionPropTypes {
  value: string | number | readonly string[] | undefined;
  children: React.ReactNode;
}

const Select = ({ onChange, children, value }: SelectPropTypes) => {
  return (
    <select value={value} onChange={onChange} className="w-full p-2 border rounded mb-2">
      {children}
    </select>
  );
};

const Option = ({ value, children }: OptionPropTypes) => {
  return <option value={value}>{children}</option>;
};

const CustomSelect = {
  Root: Select,
  Option,
};

export default CustomSelect;
