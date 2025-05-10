import { useCartContext } from "@r/model/cart/cart-context";
import { useCouponContext } from "@r/model/coupon/coupon-context";

export const CouponSelect = () => {
  const { coupons } = useCouponContext();
  const { applyCoupon } = useCartContext();

  return (
    <select
      onChange={(e) => applyCoupon(coupons[parseInt(e.target.value)])}
      className="w-full p-2 border rounded mb-2"
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
  );
};
