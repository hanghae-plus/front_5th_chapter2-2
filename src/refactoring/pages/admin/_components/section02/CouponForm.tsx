import { useState } from "react";
import type { ICoupon, TDiscountType } from "#src/types";
import { useCoupons } from "#src/refactoring/hooks";

const INITIAL_COUPON: ICoupon = {
  name: "",
  code: "",
  discountType: "percentage",
  discountValue: 0,
};

const CouponForm: React.FC = () => {
  const { addCoupon } = useCoupons();

  const [newCoupon, setNewCoupon] = useState<ICoupon>(INITIAL_COUPON);
  const handleCouponSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    addCoupon(newCoupon);
    setNewCoupon(INITIAL_COUPON);
  };

  return (
    <form className="space-y-2 mb-4" onSubmit={handleCouponSubmit}>
      <input
        type="text"
        placeholder="쿠폰 이름"
        value={newCoupon.name}
        onChange={(e) => setNewCoupon({ ...newCoupon, name: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="쿠폰 코드"
        value={newCoupon.code}
        onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <div className="flex gap-2">
        <select
          value={newCoupon.discountType}
          onChange={(e) => setNewCoupon({ ...newCoupon, discountType: e.target.value as TDiscountType })}
          className="w-full p-2 border rounded"
        >
          <option value="amount">금액(원)</option>
          <option value="percentage">할인율(%)</option>
        </select>
        <input
          type="number"
          placeholder="할인 값"
          value={newCoupon.discountValue}
          onChange={(e) => setNewCoupon({ ...newCoupon, discountValue: parseInt(e.target.value) })}
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
        쿠폰 추가
      </button>
    </form>
  );
};

export default CouponForm;
