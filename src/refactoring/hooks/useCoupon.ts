import { useState } from "react";
import { CouponItem } from "../types";

export const useCoupons = (initialCoupons: CouponItem[]) => {
  const [coupons, setCoupons] = useState<CouponItem[]>(initialCoupons);

  const addCoupon = (coupon: CouponItem) => {
    setCoupons([...coupons, coupon]);
  };

  return { coupons, addCoupon };
};
