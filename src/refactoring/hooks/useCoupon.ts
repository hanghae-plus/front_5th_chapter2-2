import { useEffect, useState } from "react";
import { Coupon } from "../../types.ts";

export const useCoupons = (initialCoupons: Coupon[]) => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons)
  
  useEffect(() => {
    setCoupons(initialCoupons)
  }, [initialCoupons])

  const addCoupon = (newCoupon: Coupon) => {
    setCoupons([...coupons, newCoupon])
  }

  return { coupons, addCoupon };
};
