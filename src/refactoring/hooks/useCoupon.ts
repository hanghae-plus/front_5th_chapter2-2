// useCoupons.ts
import { useState } from "react";
import { Coupon } from "../../types";

export const useCoupons = (initialCoupons: Coupon[]) => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);

  const addCoupon = (coupon: Coupon) => {
    setCoupons((prev) => [...prev, coupon]);
  };

  return {
    coupons,
    addCoupon,
  };
};
