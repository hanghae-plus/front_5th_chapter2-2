import { useHandleInputChange } from "../../../hooks/common";

interface ProductManagementItemDiscountFormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  field: "quantity" | "rate";
}

export const ProductManagementItemDiscountFormInput = ({
  field,
  className = "",
  onChange,
  ...props
}: ProductManagementItemDiscountFormInputProps) => {
  const { handleInputChange } = useHandleInputChange(onChange);

  return (
    <input
      type="number"
      placeholder="수량"
      onChange={handleInputChange(field)}
      className={`w-1/3 p-2 border rounded ${className}`}
      {...props}
    />
  );
};
