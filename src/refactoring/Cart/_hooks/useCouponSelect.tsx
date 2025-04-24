import { useState } from 'react';
import { Coupon } from '../../../types';

const useCouponSelect = () => {
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  // 쿠폰 적용
  const applyCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
  };

  return {
    applyCoupon,
    selectedCoupon,
  };
};

export default useCouponSelect;
