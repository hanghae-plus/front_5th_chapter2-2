import { Coupon } from '../../../../types';
import AddCoupon from './AddCoupon';
import CouponList from './CouponList';

export default function CouponSection({ coupons }: { coupons: Coupon[] }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">쿠폰 관리</h2>
      <div className="bg-white p-4 rounded shadow">
        <AddCoupon />
        <CouponList coupons={coupons} />
      </div>
    </div>
  );
}
