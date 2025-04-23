import { useState } from "react";
import { initialCoupon, initialCoupons } from "../../data";
import { Coupon } from "../../entities";

/**
 * 쿠폰 목록 상태를 관리하는 훅
 * 초기 쿠폰 배열을 받아 내부 상태로 저장하고,
 * 쿠폰을 동적으로 추가할 수 있다.
 *
 * @param initialCoupons - 초기 쿠폰 배열
 * @returns 현재 쿠폰 목록과 추가 함수
 */
export const useCoupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);

  const [newCoupon, setNewCoupon] = useState<Coupon>(initialCoupon);

  const addCoupon = (coupon: Coupon) => {
    setCoupons((prev) => [...prev, coupon]);
  };

  const initializeCoupons = (initialCoupons: Coupon[]) => {
    setCoupons(initialCoupons);
  };

  const resetNewCoupon = () => {
    setNewCoupon(initialCoupon);
  };

  const updateNewCoupon = (coupon: Coupon) => {
    setNewCoupon(coupon);
  };

  const handleAddCoupon = () => {
    addCoupon(newCoupon);
    resetNewCoupon();
  };

  return {
    coupons,
    addCoupon,
    newCoupon,
    initializeCoupons,
    updateNewCoupon,
    handleAddCoupon,
  };
};
