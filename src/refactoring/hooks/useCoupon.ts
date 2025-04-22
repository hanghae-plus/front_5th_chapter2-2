import { useCallback, useContext } from "react";
import type { ICoupon } from "#src/types";
import { CouponContext } from "../providers/CouponProvider";

// 엔티티를 다루는 훅
export const useCoupons = () => {
  const { coupons, setCoupons } = useContext(CouponContext);

  /** 쿠폰 추가 */
  const addCoupon = useCallback((newCoupon: ICoupon) => {
    setCoupons((prevCoupons) => [...prevCoupons, newCoupon]);
  }, []);

  return { coupons, addCoupon };
};
