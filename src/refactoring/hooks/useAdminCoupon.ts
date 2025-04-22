import { useCallback, useState } from 'react';
import { Coupon } from '../../types.ts';

const INITIAL_NEW_COUPON: Coupon = {
  name: '',
  code: '',
  discountType: 'percentage',
  discountValue: 0,
};

interface UseAdminCouponProps {
  onCouponAdd: (newCoupon: Coupon) => void;
}

export const useAdminCoupon = ({ onCouponAdd }: UseAdminCouponProps) => {
  const [newCoupon, setNewCoupon] = useState<Coupon>(INITIAL_NEW_COUPON);

  const updateCouponName = useCallback((name: string) => {
    setNewCoupon((prev) => ({ ...prev, name }));
  }, []);

  const updateCouponCode = useCallback((code: string) => {
    setNewCoupon((prev) => ({ ...prev, code }));
  }, []);

  const updateCouponDiscountType = useCallback((discountType: 'amount' | 'percentage') => {
    setNewCoupon((prev) => ({ ...prev, discountType }));
  }, []);

  const updateCouponDiscountValue = useCallback((discountValue: number) => {
    setNewCoupon((prev) => ({ ...prev, discountValue }));
  }, []);

  const resetCouponState = useCallback(() => {
    setNewCoupon(INITIAL_NEW_COUPON);
  }, []);

  const addCoupon = useCallback(() => {
    onCouponAdd(newCoupon);
    resetCouponState();
  }, [newCoupon, onCouponAdd, resetCouponState]);

  return {
    newCoupon,
    updateCouponName,
    updateCouponCode,
    updateCouponDiscountType,
    updateCouponDiscountValue,
    addCoupon,
  };
};
