interface CouponFormSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export const CouponFormSelect = ({
  label,
  className = "",
  options,
  ...props
}: CouponFormSelectProps) => {
  return (
    <select className={`w-full p-2 border rounded ${className}`} {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
