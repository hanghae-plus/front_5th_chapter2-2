import { Coupon } from "../../entities";

/**
 * 쿠폰을 적용하여 최종 결제 금액을 계산하는 함수
 *
 * @param totalAfterDiscount - 상품별 할인 적용 후의 금액
 * @param selectedCoupon - 적용할 쿠폰 객체 (금액 또는 비율 할인)
 * @returns 쿠폰이 적용된 최종 금액
 */

export const applyCouponDiscount = (totalAfterDiscount: number, selectedCoupon: Coupon) => {
  if (!selectedCoupon) return totalAfterDiscount;

  return selectedCoupon.discountType === "amount"
    ? Math.max(0, totalAfterDiscount - selectedCoupon.discountValue)
    : totalAfterDiscount * (1 - selectedCoupon.discountValue / 100);
};
