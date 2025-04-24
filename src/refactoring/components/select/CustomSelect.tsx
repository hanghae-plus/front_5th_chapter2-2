interface SelectPropTypes extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

interface OptionPropTypes extends React.OptionHTMLAttributes<HTMLOptionElement> {
  children: React.ReactNode;
}

const Select = ({ children, ...props }: SelectPropTypes) => {
  return (
    <select className="w-full p-2 border rounded mb-2" {...props}>
      {children}
    </select>
  );
};

const Option = ({ children, ...props }: OptionPropTypes) => {
  return <option {...props}>{children}</option>;
};

const CustomSelect = {
  Root: Select,
  Option,
};

export default CustomSelect;
