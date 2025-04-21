import { useState } from "react";
import { Coupon } from "../../types.ts";

/**
 * 엔티티(쿠폰)을 다루는 훅
 *
 *데이터: coupons (상태)
 *액션: addCoupon (setState호출)
 */
export const useCoupons = (initialCoupons: Coupon[]) => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);

  const addCoupon = (newCoupon: Coupon) => {
    setCoupons((prevCoupons) => [...prevCoupons, newCoupon]);
  };

  return { coupons, addCoupon };
};
