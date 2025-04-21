import type { CouponItem } from "../../../types";
import { CouponForm } from "./CouponForm";
import { CouponList } from ".";

interface AdminCouponInfoProps {
  coupons: CouponItem[];
  onCouponAdd: (newCoupon: CouponItem) => void;
}

export const AdminCouponInfo = ({
  coupons,
  onCouponAdd,
}: AdminCouponInfoProps) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">쿠폰 관리</h2>
      <div className="bg-white p-4 rounded shadow">
        <CouponForm onCouponAdd={onCouponAdd} />
        <div>
          <h3 className="text-lg font-semibold mb-2">현재 쿠폰 목록</h3>
          <div className="space-y-2">
            {coupons.map((coupon, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <CouponList key={index} index={index} coupon={coupon} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
