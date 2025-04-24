import { CartSection, Select } from "@/refactoring/components";
import { useCartContext, useCouponContext } from "@/refactoring/provider";

export const CouponSelect = () => {
  const { coupons } = useCouponContext();
  const { applyCoupon, selectedCoupon } = useCartContext();
  return (
    <CartSection title={"쿠폰 적용"}>
      <Select onChange={(e) => applyCoupon(coupons[parseInt(e.target.value)])} className="mb-2">
        <option value="">쿠폰 선택</option>
        {coupons.map((coupon, index) => (
          <option key={coupon.code} value={index}>
            {coupon.name} -{" "}
            {coupon.discountType === "amount" ? `${coupon.discountValue}원` : `${coupon.discountValue}%`}
          </option>
        ))}
      </Select>
      {selectedCoupon && (
        <p className="text-green-600">
          적용된 쿠폰: {selectedCoupon.name}(
          {selectedCoupon.discountType === "amount"
            ? `${selectedCoupon.discountValue}원`
            : `${selectedCoupon.discountValue}%`}{" "}
          할인)
        </p>
      )}
    </CartSection>
  );
};
