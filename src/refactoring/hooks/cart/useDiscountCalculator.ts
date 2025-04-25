import { useMemo } from 'react';
import { CartItem, Coupon } from "../../../types";
import { calculateDiscount, DiscountCalculation } from '../../functions/cart/priceCalculatorFunctions';

/**
 * 할인 계산기 훅
 * @param cart 장바구니 항목 배열
 * @param selectedCoupon 선택된 쿠폰
 * @returns 할인 계산 결과
 */
export function useDiscountCalculator(
  cart: CartItem[],
  selectedCoupon: Coupon | null
): DiscountCalculation {
  // useMemo를 사용하여 cart나 selectedCoupon이 변경될 때만 계산
  const discountCalculation = useMemo(() => {
    return calculateDiscount(cart, selectedCoupon);
  }, [cart, selectedCoupon]);

  return discountCalculation;
}
