import { Coupon } from '../../../../types';
import { formatCouponDiscount } from '../../../utils/couponUtils';

interface AppliedCouponInfoProps {
  selectedCoupon: Coupon | null;
}

export const AppliedCouponInfo = ({ selectedCoupon }: AppliedCouponInfoProps) => {
  if (!selectedCoupon) {
    return null;
  }
  
  return (
    <p className="text-green-600">
      적용된 쿠폰: {selectedCoupon.name} ({formatCouponDiscount(selectedCoupon)} 할인)
    </p>
  );
}; 