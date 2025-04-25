import { useState } from 'react';
import { Coupon } from '../../../types.ts';
import { createContextHook } from '../../libs/createContextHook.tsx';

const initialCoupons: Coupon[] = [
  {
    name: '5000원 할인 쿠폰',
    code: 'AMOUNT5000',
    discountType: 'amount',
    discountValue: 5000
  },
  {
    name: '10% 할인 쿠폰',
    code: 'PERCENT10',
    discountType: 'percentage',
    discountValue: 10
  }
];

export const useCouponsStore = (initialCouponsValue: Coupon[] = initialCoupons) => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCouponsValue);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  function addCoupon(coupon: Coupon) {
    setCoupons([...coupons, coupon]);
  }

  return {
    coupons,
    selectedCoupon,
    setCoupons,
    setSelectedCoupon,
    addCoupon
  };
};

export const [CouponProvider, useCoupons] = createContextHook(useCouponsStore);
