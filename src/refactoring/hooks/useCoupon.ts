import { useState } from 'react';
import { Coupon } from '../../types.ts';

export const useCoupons = (initialCoupons: Coupon[]) => ({
  coupons: [],
  addCoupon: () => undefined,
});
