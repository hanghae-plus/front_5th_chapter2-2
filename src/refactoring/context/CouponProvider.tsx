import React, { createContext, useContext, useState, useCallback } from 'react';
import { Coupon } from '../../types';
import { INITIAL_COUPON } from '../constants/initData';
interface CouponContextType {
  newCoupon: Coupon;
  setNewCoupon: (coupon: Coupon) => void;
  handleAddCoupon: () => void;
}

const CouponContext = createContext<CouponContextType | undefined>(undefined);

export const CouponProvider: React.FC<{
  onCouponAdd: (coupon: Coupon) => void;
  children: React.ReactNode;
}> = ({ onCouponAdd, children }) => {
  const [newCoupon, setNewCoupon] = useState<Coupon>(INITIAL_COUPON);

  const handleAddCoupon = useCallback(() => {
    onCouponAdd(newCoupon);
    setNewCoupon(INITIAL_COUPON);
  }, [newCoupon, onCouponAdd]);

  return (
    <CouponContext.Provider
      value={{
        newCoupon,
        setNewCoupon,
        handleAddCoupon
      }}
    >
      {children}
    </CouponContext.Provider>
  );
};

export const useCouponContext = () => {
  const context = useContext(CouponContext);
  if (!context) {
    throw new Error('useCouponContext must be used within a CouponProvider');
  }
  return context;
};
