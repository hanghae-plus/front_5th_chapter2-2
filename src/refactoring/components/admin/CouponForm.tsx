import { Coupon } from "@/types";
import CouponInput from "./CouponInput";
import CouponSelect from "./CouponSelect";

interface Props {
  newCoupon: Coupon;
  updateNewCoupon: (field: keyof Coupon, value: any) => void;
  onAddCoupon: () => void;
}

const CouponForm = ({ newCoupon, updateNewCoupon, onAddCoupon }: Props) => {
  return (
    <div className="space-y-2 mb-4">
      <CouponInput
        type={"text"}
        value={newCoupon.name}
        placeholder={"쿠폰 이름"}
        updateNewCoupon={updateNewCoupon}
        field={"name"}
      />
      <CouponInput
        type={"text"}
        value={newCoupon.code}
        placeholder={"쿠폰 코드"}
        updateNewCoupon={updateNewCoupon}
        field={"code"}
      />
      <div className="flex gap-2">
        <CouponSelect
          value={newCoupon.discountType}
          updateNewCoupon={updateNewCoupon}
        />
        <CouponInput
          type={"number"}
          value={newCoupon.discountValue}
          placeholder={"할인 값"}
          updateNewCoupon={updateNewCoupon}
          field={"discountValue"}
        />
      </div>
      <button
        onClick={onAddCoupon}
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        쿠폰 추가
      </button>
    </div>
  );
};

export default CouponForm;
