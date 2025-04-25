import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { Coupon } from '../../types';
import { INIT_COUPON } from '../constants/initData';
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
  const [newCoupon, setNewCoupon] = useState<Coupon>(INIT_COUPON);

  const handleAddCoupon = useCallback(() => {
    onCouponAdd(newCoupon);
    setNewCoupon(INIT_COUPON);
  }, [newCoupon, onCouponAdd]);

  return (
    <CouponContext.Provider
      value={useMemo(
        () => ({
          newCoupon,
          setNewCoupon,
          handleAddCoupon
        }),
        [newCoupon]
      )}
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
