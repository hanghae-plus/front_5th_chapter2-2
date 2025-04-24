import { CartItem, Coupon } from '@/types';
import { calculateItemDiscountTotal } from './discount';

export const calculateItemTotal = (item: CartItem): number => {
  const originalTotal = calculateItemOriginalTotal(item);
  return calculateItemDiscountTotal(originalTotal, item);
};

export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null,
) => {
  let totalBeforeDiscount = 0;
  let totalAfterDiscount = 0;

  cart.forEach((item) => {
    const originalTotal = calculateItemOriginalTotal(item);
    totalBeforeDiscount += originalTotal;
    totalAfterDiscount += calculateItemDiscountTotal(originalTotal, item);
  });

  let totalDiscount = totalBeforeDiscount - totalAfterDiscount;

  if (selectedCoupon) {
    if (selectedCoupon.discountType === 'amount') {
      const discountValue = totalAfterDiscount - selectedCoupon.discountValue;
      totalAfterDiscount = Math.max(0, discountValue);
    } else {
      totalAfterDiscount *= 1 - selectedCoupon.discountValue / 100;
    }
    totalDiscount = totalBeforeDiscount - totalAfterDiscount;
  }

  return {
    totalBeforeDiscount: Math.round(totalBeforeDiscount),
    totalAfterDiscount: Math.round(totalAfterDiscount),
    totalDiscount: Math.round(totalDiscount),
  };
};

const calculateItemOriginalTotal = (item: CartItem): number => {
  const { price } = item.product;
  const { quantity } = item;
  return price * quantity;
};
