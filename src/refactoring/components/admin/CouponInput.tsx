import { Coupon } from "@/types";

interface Props {
  type: "text" | "number";
  value: string | number;
  placeholder: string;
  field: "name" | "code" | "discountValue";
  updateNewCoupon: (field: keyof Coupon, value: any) => void;
}

const CouponInput = ({
  type,
  value,
  placeholder,
  field,
  updateNewCoupon,
}: Props) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => updateNewCoupon(field, e.target.value)}
      className="w-full p-2 border rounded"
    />
  );
};

export default CouponInput;
