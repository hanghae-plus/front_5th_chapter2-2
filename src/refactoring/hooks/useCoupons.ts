import { useState, useCallback } from 'react';
import type { Coupon } from '@/types';

export const useCoupons = (initialCoupons: Coupon[]) => {
  const [coupons, setCoupons] = useState(initialCoupons);

  const addCoupon = useCallback((newCoupon: Coupon) => {
    setCoupons((prevCoupons) => [...prevCoupons, newCoupon]);
  }, []);

  return { coupons, addCoupon };
};
