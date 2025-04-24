import { useState } from 'react';
import { Coupon } from '../../entities';

export const useCoupons = (initialCoupons: Coupon[]) => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);

  const addCoupon = (newCoupon: Coupon) => {
    setCoupons((prevCoupons) => {
      const existingCoupon = prevCoupons.find(
        (coupon) => coupon.code === newCoupon.code
      );
      if (existingCoupon) {
        return prevCoupons.map((coupon) =>
          coupon.code === newCoupon.code ? { ...coupon, ...newCoupon } : coupon
        );
      }
      return [...prevCoupons, newCoupon];
    });
  };

  return { coupons, addCoupon };
};
