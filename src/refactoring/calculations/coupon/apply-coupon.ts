/** 쿠폰 적용 */

import { Coupon } from "../../entities";

export const applyCouponDiscount = (totalAfterDiscount: number, selectedCoupon: Coupon) => {
  if (!selectedCoupon) return totalAfterDiscount;

  return selectedCoupon.discountType === "amount"
    ? Math.max(0, totalAfterDiscount - selectedCoupon.discountValue)
    : totalAfterDiscount * (1 - selectedCoupon.discountValue / 100);
};
