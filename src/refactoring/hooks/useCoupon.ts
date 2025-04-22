import { Coupon } from "@/types";
import { useCallback, useState } from "react";

export const useCoupons = (initialCoupons: Coupon[]) => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);

  const addCoupon = useCallback((coupon: Coupon) => {
    setCoupons((prev) => [...prev, coupon]);
  }, []);

  return { coupons, addCoupon };
};
