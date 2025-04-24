import { useCouponContext } from "../../../contexts/CouponContext";
import { CouponItem } from "./CouponItem";

export const CouponList = () => {
  const { coupons } = useCouponContext();

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">현재 쿠폰 목록</h3>
      <div className="space-y-2">
        {coupons.map((coupon, index) => (
          <CouponItem
            coupon={coupon}
            data-testid={`coupon-${index + 1}`}
            key={coupon.code}
          />
        ))}
      </div>
    </div>
  );
};
