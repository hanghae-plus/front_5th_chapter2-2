import { Coupon } from "../../types";

export const applyCouponDiscount = (
  totalAmount: number,
  selectedCoupon: Coupon
) => {
  switch (selectedCoupon.discountType) {
    case "amount":
      return totalAmount - selectedCoupon.discountValue;
    case "percentage":
      return totalAmount * (1 - selectedCoupon.discountValue / 100);
    default:
      return totalAmount;
  }
};
