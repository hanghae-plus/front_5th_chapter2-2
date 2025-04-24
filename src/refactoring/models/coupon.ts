import { Coupon } from '../../types';

export const getInitialCoupon = (): Coupon => ({
  name: '',
  code: '',
  discountType: 'amount',
  discountValue: 0,
});
