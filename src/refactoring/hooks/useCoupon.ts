import { useState } from "react";
import type { ICoupon } from "#src/types";

// 엔티티를 다루는 훅
export const useCoupons = (initialCoupons: ICoupon[]) => {
  const [coupons, setCoupons] = useState<ICoupon[]>(initialCoupons);

  /** 쿠폰 추가 */
  const addCoupon = (newCoupon: ICoupon) => {
    setCoupons((prevCoupons) => [...prevCoupons, newCoupon]);
  };

  return { coupons, addCoupon };
};
