import { Coupon, DISCOUNT_TYPE } from '../types';

export const Coupons: Coupon[] = [
  {
    name: '5000원 할인 쿠폰',
    code: 'AMOUNT5000',
    discountType: DISCOUNT_TYPE.AMOUNT,
    discountValue: 5000,
  },
  {
    name: '10% 할인 쿠폰',
    code: 'PERCENT10',
    discountType: DISCOUNT_TYPE.PERCENTAGE,
    discountValue: 10,
  },
];
