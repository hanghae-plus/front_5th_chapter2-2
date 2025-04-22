import { useContext } from "react";

import { CouponStoreContext } from "../../../entities/coupon/stores";
import { Coupon } from "../../../entities/coupon/types";

export const useCoupon = () => {
  const store = useContext(CouponStoreContext);

  if (!store) {
    throw new Error("useCoupon must be used within a CouponProvider");
  }

  const { coupons } = store;

  const addCoupon = (newCoupon: Coupon) => {
    store.addCoupon(newCoupon);
  };

  const getCouponByCode = (couponCode: string): Coupon | undefined => {
    return coupons.find((coupon) => coupon.code === couponCode);
  };

  return {
    coupons,
    addCoupon,
    getCouponByCode,
  };
};
