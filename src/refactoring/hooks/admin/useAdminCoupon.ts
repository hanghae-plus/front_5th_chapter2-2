import { useState } from 'react';
import type { Coupon } from '../../../types';
import { useCoupons } from '../client/useCoupons.ts';

export function useAdminCoupon() {
  const { coupons, addCoupon: onCouponAdd } = useCoupons();

  const [newCoupon, setNewCoupon] = useState<Coupon>({
    name: '',
    code: '',
    discountType: 'percentage',
    discountValue: 0
  });

  const handleAddCoupon = () => {
    onCouponAdd(newCoupon);

    setNewCoupon({
      name: '',
      code: '',
      discountType: 'percentage',
      discountValue: 0
    });
  };

  return {
    coupons,
    newCoupon,
    handleAddCoupon,
    setNewCoupon
  };
}
