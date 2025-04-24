import { useState } from "react";
import { Coupon } from "../../types.ts";


export const useCoupons = (initialCoupons: Coupon[]) => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);

  const addCoupon = (newCoupon: Coupon) => {
    const list = [...initialCoupons, newCoupon];
    setCoupons(list);
  }

  return { coupons: coupons, addCoupon };
};
