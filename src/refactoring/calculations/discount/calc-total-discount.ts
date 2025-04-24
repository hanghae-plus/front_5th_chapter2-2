import { CartItem, Coupon } from "@refactoring/entities";
import { applyCouponDiscount } from "../coupon/apply-coupon";

/**
 * 할인 전 총액 계산
 * @param cart - 장바구니 항목 배열
 * @returns 할인 적용 전 총 금액
 */
export const calculateTotalBeforeDiscount = (cart: CartItem[]): number => {
  return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
};

/**
 * 할인 후 총액 계산
 * @param cart - 장바구니 항목 배열
 * @returns  상품별 할인율 적용 후 총 금액
 */
export const calculateTotalAfterDiscount = (cart: CartItem[]): number => {
  return cart.reduce((sum, item) => {
    const { price, discounts } = item.product;
    const { quantity } = item;

    const maxDiscount = discounts
      .filter((d) => quantity >= d.quantity)
      .reduce((max, d) => Math.max(max, d.rate), 0);

    return sum + price * quantity * (1 - maxDiscount);
  }, 0);
};

/**
 * 장바구니 항목과 선택된 쿠폰을 바탕으로
 * 할인 전 금액, 쿠폰 적용 후 금액, 전체 할인 금액을 계산
 *
 * @param cart - 장바구니에 담긴 상품 목록
 * @param selectedCoupon - 적용할 쿠폰 (null 가능)
 * @returns 총액 정보:
 *  - totalBeforeDiscount: 쿠폰 및 상품 할인 적용 전 총 금액
 *  - totalAfterDiscount: 상품 할인 적용 후 금액 (쿠폰 미포함)
 *  - totalDiscount: 전체 할인 금액 (쿠폰 포함)
 */

export const calculateCartTotal = (cart: CartItem[], selectedCoupon: Coupon | null) => {
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
