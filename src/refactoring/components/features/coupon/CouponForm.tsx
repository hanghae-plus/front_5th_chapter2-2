import { useState } from "react";
import { Coupon } from "../../../../types";
import { useCouponContext } from "../../../contexts/CouponContext";
import { OptionSelector } from "../../ui/common/OptionSelector";

export const CouponForm = () => {
  const { addCoupon } = useCouponContext();
  const [newCoupon, setNewCoupon] = useState<Coupon>({
    name: "",
    code: "",
    discountType: "percentage",
    discountValue: 0,
  });

  const handleAddCoupon = () => {
    addCoupon(newCoupon);
    setNewCoupon({
      name: "",
      code: "",
      discountType: "percentage",
      discountValue: 0,
    });
  };

  return (
    <div className="space-y-2 mb-4">
      <input
        type="text"
        placeholder="쿠폰 이름"
        value={newCoupon.name}
        name="name"
        onChange={(e) => setNewCoupon({ ...newCoupon, name: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="쿠폰 코드"
        value={newCoupon.code}
        name="code"
        onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <div className="flex gap-2">
        <OptionSelector
          value={newCoupon.discountType}
          className="w-full p-2 border rounded"
          options={[
            { label: "금액(원)", value: "amount" },
            { label: "할인율(%)", value: "percentage" },
          ]}
          onChange={(value) =>
            setNewCoupon({
              ...newCoupon,
              discountType: value as "amount" | "percentage",
            })
          }
        />
        <input
          type="number"
          placeholder="할인 값"
          value={newCoupon.discountValue}
          onChange={(e) =>
            setNewCoupon({
              ...newCoupon,
              discountValue: parseInt(e.target.value),
            })
          }
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={handleAddCoupon}
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        쿠폰 추가
      </button>
    </div>
  );
};
