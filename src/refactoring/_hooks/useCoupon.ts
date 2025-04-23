import { useState } from 'react';
import { Coupon } from '../../types.ts';
import { INITIAL_COUPONS } from '../_constants/coupon.ts';

export const useCoupons = (initialCoupons?: Coupon[]) => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons || INITIAL_COUPONS);

  // 쿠폰 추가..
  const handleAddCoupon = (newCoupon: Coupon) => {
    setCoupons((prevCoupons) => [...prevCoupons, newCoupon]);
  };

  return { coupons: coupons, addCoupon: handleAddCoupon };
};
