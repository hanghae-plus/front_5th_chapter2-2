import { CouponSelect } from "./coupon-select";
import { SelectedCoupon } from "./selected-coupon";

interface CouponApplierProps {}

export const CouponApplier: React.FC<CouponApplierProps> = () => {
  return (
    <div className="mt-6 bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-semibold mb-2">쿠폰 적용</h2>
      <CouponSelect />
      <SelectedCoupon />
    </div>
  );
};
