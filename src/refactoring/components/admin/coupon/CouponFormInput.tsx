import { useHandleInputChange } from "../../../hooks/common";
import { ValidationField } from "../../../hooks/common/useValidation";

interface CouponFormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  field: ValidationField;
}

export const CouponFormInput = ({
  className = "",
  field,
  onChange,
  ...props
}: CouponFormInputProps) => {
  const { handleInputChange } = useHandleInputChange(onChange);

  return (
    <input
      className={`w-full p-2 border rounded ${className}`}
      {...props}
      onChange={handleInputChange(field)}
    />
  );
};
