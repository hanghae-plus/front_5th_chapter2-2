import { Coupon } from "@/types";

interface Props {
  value: "amount" | "percentage";
  updateNewCoupon: (field: keyof Coupon, value: any) => void;
}

const CouponSelect = ({ value, updateNewCoupon }: Props) => {
  return (
    <select
      value={value}
      onChange={(e) =>
        updateNewCoupon(
          "discountType",
          e.target.value as "amount" | "percentage"
        )
      }
      className="w-full p-2 border rounded"
    >
      <option value="amount">금액(원)</option>
      <option value="percentage">할인율(%)</option>
    </select>
  );
};

export default CouponSelect;
