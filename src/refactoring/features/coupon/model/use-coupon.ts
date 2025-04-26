import { useState } from "react";

import { Coupon } from "@/refactoring/entities/coupon";

export const useCoupons = (initialCoupons: Coupon[]) => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);

  const addCoupon = (newCoupon: Coupon) => {
    setCoupons([...coupons, newCoupon]);
  };

  return { coupons, addCoupon };
};
