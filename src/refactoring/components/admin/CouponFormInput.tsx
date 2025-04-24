interface CouponFormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const CouponFormInput = ({
  className = "",
  ...props
}: CouponFormInputProps) => {
  return (
    <input className={`w-full p-2 border rounded ${className}`} {...props} />
  );
};
