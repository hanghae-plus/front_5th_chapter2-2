import { Coupon } from '../../../../types';
import { AppliedCouponInfo } from './AppliedCouponInfo';
import { CouponDropdown } from './CouponDropdown';
import { CouponSelectHeader } from './CouponSelectHeader';

interface CouponSelectProps {
  coupons: Coupon[];
  selectedCoupon: Coupon | null;
  onCouponSelect: (coupon: Coupon) => void;
}

export const CouponSelect = ({ coupons, selectedCoupon, onCouponSelect }: CouponSelectProps) => {
  return (
    <div className="mt-6 bg-white p-4 rounded shadow">
      <CouponSelectHeader />
      <CouponDropdown 
        coupons={coupons} 
        onCouponSelect={onCouponSelect} 
      />
      <AppliedCouponInfo selectedCoupon={selectedCoupon} />
    </div>
  );
}; 