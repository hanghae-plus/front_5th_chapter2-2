import { CartItem, Coupon } from '../../types';
import { getMaxApplicableDiscount } from '../models/cart';

interface CouponDiscountProps {
  coupon: Coupon | null;
  beforeAppliedCoupon: number;
}

export const getCopuonDiscount = ({
  coupon,
  beforeAppliedCoupon,
}: CouponDiscountProps) => {
  if (!coupon) return 0;

  switch (coupon.discountType) {
    case 'amount':
      return coupon.discountValue;
    case 'percentage':
      return beforeAppliedCoupon * (coupon.discountValue / 100);
    default:
      return 0;
  }
};

interface TotalDiscountProps {
  cart: CartItem[];
  coupon: Coupon | null;
  totalBeforeDiscount: number;
}

export const getTotalDiscount = ({
  cart,
  coupon,
  totalBeforeDiscount,
}: TotalDiscountProps) => {
  const quantityDiscount = cart.reduce(
    (sum, cur) =>
      (sum += cur.product.price * cur.quantity * getMaxApplicableDiscount(cur)),
    0,
  );

  const couponDiscount = getCopuonDiscount({
    coupon,
    beforeAppliedCoupon: totalBeforeDiscount - quantityDiscount,
  });

  return quantityDiscount + couponDiscount;
};
