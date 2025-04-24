import { useSetAtom } from "jotai";
import { updateNewCouponAtom } from "../../store/coupons/action";

interface Props {
  value: "percentage" | "amount";
}

const CouponSelect = ({ value }: Props) => {
  const updateNewCoupon = useSetAtom(updateNewCouponAtom);
  return (
    <select
      value={value}
      onChange={(e) =>
        updateNewCoupon({
          field: "discountType",
          value: e.target.value as "amount" | "percentage",
        })
      }
      className="w-full p-2 border rounded"
    >
      <option value="amount">금액(원)</option>
      <option value="percentage">할인율(%)</option>
    </select>
  );
};

export default CouponSelect;
