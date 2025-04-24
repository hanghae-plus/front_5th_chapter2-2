import React, { useState } from "react";
import { useCoupons } from "#src/refactoring/hooks";
import { useCart } from "#src/refactoring/pages/cart/_hooks/useCart";

const CouponSection: React.FC = () => {
  const { applyCoupon, selectedCoupon } = useCart();
  const { coupons } = useCoupons();

  const [couponIndex, setCouponIndex] = useState<number>(
    selectedCoupon ? coupons.findIndex((coupon) => coupon.code === selectedCoupon.code) : 0,
  );

  return (
    <section className="mt-6 bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-semibold mb-2">쿠폰 적용</h2>
      <select
        onChange={(e) => {
          applyCoupon(coupons[parseInt(e.target.value)]);
          setCouponIndex(parseInt(e.target.value));
        }}
        className="w-full p-2 border rounded mb-2"
        value={couponIndex}
      >
        <option value="">쿠폰 선택</option>
        {coupons.map((coupon, index) => (
          <option key={coupon.code} value={index} selected={couponIndex === index}>
            {coupon.name} -{" "}
            {coupon.discountType === "amount" ? `${coupon.discountValue}원` : `${coupon.discountValue}%`}
          </option>
        ))}
      </select>
      {selectedCoupon && (
        <p className="text-green-600">
          적용된 쿠폰: {selectedCoupon.name}(
          {selectedCoupon.discountType === "amount"
            ? `${selectedCoupon.discountValue}원`
            : `${selectedCoupon.discountValue}%`}{" "}
          할인)
        </p>
      )}
    </section>
  );
};

export default React.memo(CouponSection);
