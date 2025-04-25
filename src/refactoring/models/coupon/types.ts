export interface Coupon {
  name: string;
  code: string;
  discountType: 'amount' | 'percentage';
  discountValue: number;
}

export interface CouponDiscountProps {
  coupon: Coupon | null;
  beforeAppliedCoupon: number;
}
