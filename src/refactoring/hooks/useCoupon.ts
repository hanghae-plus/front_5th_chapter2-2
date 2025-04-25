import { useState } from 'react';
import { Coupon } from '../../types.ts';
import { CURRENT_APPLY_INITIAL_COUPON } from '../constants/initData.ts';

export const useCoupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>(CURRENT_APPLY_INITIAL_COUPON);

  const addCoupon = (newCoupon: Coupon) => {
    setCoupons(prevCoupons => [...prevCoupons, newCoupon]);
  };

  return { coupons, addCoupon };
};
