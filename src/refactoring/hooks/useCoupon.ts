import { useState } from "react";
import { Coupon } from "../../types.ts";


/**
 * 쿠폰 훅
 * @param initialCoupons 초기 쿠폰 목록
 * @returns 쿠폰 상태와 작업 함수
 */
export const useCoupons = (initialCoupons: Coupon[]) => {

  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);

  /**
   * 쿠폰을 추가
   * @param newCoupon 추가할 쿠폰
   * @returns 추가된 쿠폰
   */
  const addCoupon = (newCoupon: Coupon) => {
    setCoupons(prevCoupons => [...prevCoupons, newCoupon]);
  };

  return { coupons, addCoupon };
};
