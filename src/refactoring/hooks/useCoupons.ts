import { useState } from "react";
import { Coupon } from "../entities";

/**
 * 쿠폰 목록을 관리하는 훅
 * 초기 쿠폰 배열을 받아 내부 상태로 저장하고,
 * 쿠폰을 동적으로 추가할 수 있다.
 *
 * @param initialCoupons - 초기 쿠폰 배열
 * @returns 현재 쿠폰 목록과 추가 함수
 */
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
