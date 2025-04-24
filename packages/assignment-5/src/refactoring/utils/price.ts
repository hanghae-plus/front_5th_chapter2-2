import { CartItem } from '../types';
import { Coupon } from '../types';
import { getAppliedDiscount } from './discount';

/**
 * 장바구니 전체 금액, 할인 금액, 최종 결제 금액을 계산합니다.
 */
export const calculateTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null
) => {
  let totalBeforeDiscount = 0;
  let totalAfterDiscount = 0;

  cart.forEach(item => {
    const { price } = item.product;
    const { quantity } = item;
    totalBeforeDiscount += price * quantity;

    const discount = getAppliedDiscount(item);
    totalAfterDiscount += price * quantity * (1 - discount);
  });

  let totalDiscount = totalBeforeDiscount - totalAfterDiscount;

  if (selectedCoupon) {
    if (selectedCoupon.discountType === 'amount') {
      totalAfterDiscount = Math.max(0, totalAfterDiscount - selectedCoupon.discountValue);
    } else {
      totalAfterDiscount *= (1 - selectedCoupon.discountValue / 100);
    }
    totalDiscount = totalBeforeDiscount - totalAfterDiscount;
  }

  return {
    totalBeforeDiscount: Math.round(totalBeforeDiscount),
    totalAfterDiscount: Math.round(totalAfterDiscount),
    totalDiscount: Math.round(totalDiscount)
  };
};