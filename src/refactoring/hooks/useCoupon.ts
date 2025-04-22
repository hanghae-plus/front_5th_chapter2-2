import { useState } from 'react';
import { Coupon } from '../../types.ts';

export const useCoupons = (initialCoupons: Coupon[]) => {
  const [coupons, setCoupons] = useState(initialCoupons);

  // TODO: useCallback의 필요성이 있는지
  function addCoupon(newCoupon: Coupon) {
    setCoupons((prevCoupons) => [...prevCoupons, newCoupon]);
  }

  return { coupons, addCoupon };
};
