import { useState } from 'react';
import { Coupon } from '../../types.ts';

const addCouponToList = (coupons: Coupon[], newCoupon: Coupon): Coupon[] => {
  return [...coupons, newCoupon];
};

export const useCoupons = (initialCoupons: Coupon[]) => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);

  const addCoupon = (newCoupon: Coupon) => {
    setCoupons((prevCoupons) => addCouponToList(prevCoupons, newCoupon));
  };

  return { coupons, addCoupon };
};
