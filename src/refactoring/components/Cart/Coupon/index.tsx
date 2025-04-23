import { Coupon } from "../../../../types";
import { CouponSelect } from "./CouponSelect";

export const CouponSection = ({
  coupons,
  selectedCoupon,
  applyCoupon,
}: {
  coupons: Coupon[];
  selectedCoupon: Coupon | null;
  applyCoupon: (coupon: Coupon) => void;
}) => {
  return (
    <div className="mt-6 bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-semibold mb-2">쿠폰 적용</h2>
      <select
        onChange={(e) => applyCoupon(coupons[parseInt(e.target.value)])}
        className="w-full p-2 border rounded mb-2"
      >
        <option value="">쿠폰 선택</option>
        {coupons.map((coupon, index) => (
          <CouponSelect key={index} couponIndex={index} coupon={coupon} />
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
