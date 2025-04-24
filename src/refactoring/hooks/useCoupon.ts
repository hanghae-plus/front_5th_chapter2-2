import { useState } from 'react';
import { Coupon } from '../../types.ts';
import { INITIAL_COUPON } from '../constants/initData.ts';

export const useCoupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPON);

  const addCoupon = (newCoupon: Coupon) => {
    setCoupons(prevCoupons => [...prevCoupons, newCoupon]);
  };

  return { coupons, addCoupon };
};
