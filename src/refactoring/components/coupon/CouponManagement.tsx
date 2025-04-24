import { CouponList, NewCouponForm } from '@/refactoring/components/coupon';
import { Coupon } from '@/types.ts';

interface CouponManagementProps {
  coupons: Coupon[];
  onCouponAdd: (newCoupon: Coupon) => void;
}

export const CouponManagement = ({
  coupons,
  onCouponAdd,
}: CouponManagementProps) => {
  return (
    <div>
      <h2 className='text-2xl font-semibold mb-4'>쿠폰 관리</h2>
      <div className='bg-white p-4 rounded shadow'>
        <NewCouponForm onCouponAdd={onCouponAdd} />
        <CouponList coupons={coupons} />
      </div>
    </div>
  );
};
