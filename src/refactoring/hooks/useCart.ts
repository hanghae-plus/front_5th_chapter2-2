import {
  calculateTotalAfterDiscount,
  calculateTotalBeforeDiscount,
} from "../calculations/cart/calc-total-discount";
import { applyCouponDiscount } from "../calculations/coupon/apply-coupon";

import { useCartStore } from "../store/cart-store";
import { useSelectedCoupon } from "./useSelectedCoupon";

/**
 * 장바구니 쿠폰 관련 로직을 관리하는 커스텀 훅
 *
 * - 쿠폰을 적용하거나 해제할 수 있고
 * - 현재 장바구니(`useCartStore`)의 상품과 쿠폰을 바탕으로 총액 및 할인 금액을 계산합니다.
 *
 **/
export const useCart = () => {
  const { cart } = useCartStore();
  const { selectedCoupon } = useSelectedCoupon();

  const calculateTotal = () => {
    const totalBeforeDiscount = calculateTotalBeforeDiscount(cart);
    const totalAfterDiscount = calculateTotalAfterDiscount(cart);
    const totalAfterCoupon = applyCouponDiscount(totalAfterDiscount, selectedCoupon!);
    const totalDiscount = totalBeforeDiscount - totalAfterCoupon;

    return {
      totalBeforeDiscount: Math.round(totalBeforeDiscount),
      totalAfterDiscount: Math.round(totalAfterCoupon),
      totalDiscount: Math.round(totalDiscount),
    };
  };

  return {
    calculateTotal,
  };
};
