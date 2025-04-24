import { Input, Select } from "@/refactoring/components";
import { useCouponContext } from "@/refactoring/provider";
import { Coupon, DiscountType } from "@/types";
import { useState } from "react";

const initialNewCoupon: Coupon = {
  name: "",
  code: "",
  discountType: "percentage",
  discountValue: 0,
};

export const NewCoupon = () => {
  const { addCoupon: onCouponAdd } = useCouponContext();

  const [newCoupon, setNewCoupon] = useState<Coupon>(initialNewCoupon);

  const handleAddCoupon = () => {
    onCouponAdd(newCoupon);
    setNewCoupon(initialNewCoupon);
  };
  return (
    <div className="space-y-2 mb-4">
      <Input type="text" placeholder="쿠폰 이름" value={newCoupon.name} onChange={(e) => setNewCoupon({ ...newCoupon, name: e.target.value })} />
      <Input type="text" placeholder="쿠폰 코드" value={newCoupon.code} onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })} />
      <div className="flex gap-2">
        <Select value={newCoupon.discountType} onChange={(e) => setNewCoupon({ ...newCoupon, discountType: e.target.value as DiscountType })}>
          <option value="amount">금액(원)</option>
          <option value="percentage">할인율(%)</option>
        </Select>
        <Input type="number" placeholder="할인 값" value={newCoupon.discountValue} onChange={(e) => setNewCoupon({ ...newCoupon, discountValue: parseInt(e.target.value) })} />
      </div>
      <button onClick={handleAddCoupon} className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
        쿠폰 추가
      </button>
    </div>
  );
};
