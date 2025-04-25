import { useCoupons } from "../../../4_features/coupon/hooks";

import { CouponManagementPanelProps } from "../types";
import { NewCouponForm } from "./new-coupon-form";
import { CouponList } from "./coupon-list";

export const CouponManagementPanel: React.FC<CouponManagementPanelProps> = ({
  title = "쿠폰 관리",
}) => {
  const { coupons, addCoupon } = useCoupons();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="bg-white p-4 rounded shadow">
        <NewCouponForm onSubmit={addCoupon} />
        <CouponList coupons={coupons} />
      </div>
    </div>
  );
};
