import { Coupon } from "../../../../types.ts";

interface CouponApplyProps {
  coupons: Coupon[];
  applyCoupon: (coupon: Coupon | null) => void;
  selectedCoupon: Coupon | null;
  formatCouponDisplay: (coupon: Coupon) => string;
}

const CouponApply = ({
  coupons,
  applyCoupon,
  selectedCoupon,
  formatCouponDisplay,
}: CouponApplyProps) => {
  return (
    <div className="mt-6 bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-semibold mb-2">쿠폰 적용</h2>
      <select
        onChange={(e) => {
          const selectedIndex = parseInt(e.target.value);
          const couponToApply =
            !isNaN(selectedIndex) && selectedIndex >= 0
              ? coupons[selectedIndex]
              : null;
          applyCoupon(couponToApply);
        }}
        className="w-full p-2 border rounded mb-2"
        value={
          selectedCoupon
            ? coupons.findIndex((c) => c.code === selectedCoupon.code)
            : ""
        }
      >
        <option value="">쿠폰 선택</option>
        {coupons.map((coupon, index) => (
          <option key={coupon.code} value={index}>
            {coupon.name} - {formatCouponDisplay(coupon)}{" "}
          </option>
        ))}
      </select>

      {selectedCoupon && (
        <p className="text-green-600">
          적용된 쿠폰: {selectedCoupon.name}(
          {formatCouponDisplay(selectedCoupon)} 할인)
        </p>
      )}
    </div>
  );
};

export default CouponApply;
