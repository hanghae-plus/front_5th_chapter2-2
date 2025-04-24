import { CartItem, Coupon } from '@/types';
import { calculateCartTotal } from '../models/cart';

interface UseDiscountReturn {
  cartCalculations: {
    totalBeforeDiscount: number;
    totalAfterDiscount: number;
    totalDiscount: number;
  };
}

// 할인 계산 로직을 분리한 훅
export const useDiscount = (
  cart: CartItem[],
  selectedCoupon: Coupon | null,
): UseDiscountReturn => {
  // 장바구니 전체 할인 계산
  const cartCalculations = calculateCartTotal(cart, selectedCoupon);

  return {
    cartCalculations,
  };
};
