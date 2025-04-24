import { useMemo } from "react";
import { CartItem, Coupon } from "../../entities";
import { calculateCartTotal } from "../../models/cart";

/**
 * 장바구니와 선택된 쿠폰을 기반으로
 * 할인 전 금액, 상품 할인 적용 후 금액, 쿠폰까지 적용한 총 할인 금액을 계산
 *
 * 내부적으로 `calculateCartTotal` 순수 함수를 사용하며,
 * `cart`나 `selectedCoupon`이 변경될 때만 계산을 다시 수행
 *
 * @param cart - 장바구니에 담긴 상품 목록 (CartItem 배열)
 * @param selectedCoupon - 현재 선택된 쿠폰 (없을 수 있으므로 null 가능)
 */

export const useDiscountCalculator = (cart: CartItem[], selectedCoupon: Coupon | null) => {
  return useMemo(() => {
    return calculateCartTotal(cart, selectedCoupon);
  }, [cart, selectedCoupon]);
};
