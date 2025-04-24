import React, { createContext, useContext } from 'react';
import type { Coupon } from '@/types';

import { useCoupons } from '@/hooks';
import { DEFAULT_COUPONS } from '@/constants';

interface CouponContextValue {
  coupons: Coupon[];
  addCoupon: (coupon: Coupon) => void;
}

const CouponContext = createContext<CouponContextValue | undefined>(undefined);

interface CouponProviderProps {
  children: React.ReactNode;
  initialCoupons?: Coupon[];
}

export const CouponProvider: React.FC<CouponProviderProps> = (props) => {
  const { children, initialCoupons = DEFAULT_COUPONS } = props;
  const { coupons, addCoupon } = useCoupons(initialCoupons);

  return (
    <CouponContext.Provider value={{ coupons, addCoupon }}>
      {children}
    </CouponContext.Provider>
  );
};

export const useCouponsContext = (): CouponContextValue => {
  const context = useContext(CouponContext);
  if (!context) {
    throw new Error('useCouponsContext is not defined within a CouponProvider');
  }
  return context;
};
