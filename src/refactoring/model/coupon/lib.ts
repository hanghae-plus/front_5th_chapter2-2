import { Coupon } from "./types";

export const getCouponAppliedTotal = (amount: number, coupon: Coupon) => {
  switch (coupon.discountType) {
    case "amount":
      return Math.max(0, amount - coupon.discountValue);
    case "percentage":
      return amount * (1 - coupon.discountValue / 100);
  }
};
