import { useState } from "react";
import { Coupon } from "../types";

export const useCoupons = (initialCoupons: Coupon[]) => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);

  // 쿠폰 추가 함수
  const addCoupon = (newCoupon: Coupon) => {
    setCoupons((prev) => [...prev, newCoupon]);
  };

  return {
    coupons,
    addCoupon,
  };
};