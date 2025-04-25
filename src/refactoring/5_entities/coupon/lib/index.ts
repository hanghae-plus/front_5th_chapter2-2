import { Coupon } from "../../../6_shared/types";

export const addCoupon = (coupons: Coupon[], coupon: Coupon): Coupon[] => {
  return [...coupons, coupon];
};
