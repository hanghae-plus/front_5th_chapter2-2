import { useState } from "react";
import { Coupon } from "../../../types.ts";

export default function NewCouponForm({
  onCouponAdd,
}: {
  onCouponAdd: (coupon: Coupon) => void;
}) {
  const [newCoupon, setNewCoupon] = useState<Coupon>({
    name: "",
    code: "",
    discountType: "amount",
    discountValue: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCoupon((prev) => ({
      ...prev,
      [name]: name === "discountValue" ? Number(value) : value,
    }));
  };

  const handleAddCoupon = () => {
    onCouponAdd(newCoupon);
  };

  return (
    <div className="space-y-2 mb-4">
      <input
        type="text"
        placeholder="쿠폰 이름"
        name={"name"}
        value={newCoupon.name}
        onChange={handleInputChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="쿠폰 코드"
        name={"code"}
        value={newCoupon.code}
        onChange={handleInputChange}
        className="w-full p-2 border rounded"
      />
      <div className="flex gap-2">
        <select
          value={newCoupon.discountType}
          name={"discountType"}
          onChange={(e) =>
            setNewCoupon({
              ...newCoupon,
              discountType: e.target.value as "amount" | "percentage",
            })
          }
          className="w-full p-2 border rounded"
        >
          <option value="amount">금액(원)</option>
          <option value="percentage">할인율(%)</option>
        </select>
        <input
          type="number"
          name={"discountValue"}
          placeholder="할인 값"
          value={newCoupon.discountValue}
          onChange={handleInputChange}
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
}
