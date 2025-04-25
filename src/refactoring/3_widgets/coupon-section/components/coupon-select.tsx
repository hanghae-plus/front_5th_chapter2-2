import { useCoupon, useCoupons } from "../../../4_features/coupon/hooks";

export const CouponSelect = () => {
  const { coupons } = useCoupons(); // 쿠폰 목록
  const { selectedCoupon, applyCoupon } = useCoupon(); // 선택된 쿠폰, 쿠폰 적용

  const handleCouponChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = parseInt(e.target.value);
    applyCoupon(coupons[selectedIndex]);
  };

  return (
    <div>
      <select
        onChange={handleCouponChange}
        className="w-full p-2 border rounded mb-2"
        data-testid="coupon-select"
      >
        <option value="">쿠폰 선택</option>
        {coupons.map((coupon, index) => (
          <option key={coupon.code} value={index}>
            {coupon.name} -{" "}
            {coupon.discountType === "amount"
              ? `${coupon.discountValue}원`
              : `${coupon.discountValue}%`}
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
    </div>
  );
};
