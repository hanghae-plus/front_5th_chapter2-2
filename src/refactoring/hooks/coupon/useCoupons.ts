import { useState } from "react";
import { initialCoupon, initialCoupons } from "../../data";
import { Coupon } from "../../entities";

/**
 * 쿠폰 목록 및 신규 쿠폰 상태를 관리하는 커스텀 훅
 *
 * @returns 쿠폰 목록 상태, 신규 쿠폰 상태, 쿠폰 추가/초기화 관련 함수들
 */

export const useCoupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);

  const [newCoupon, setNewCoupon] = useState<Coupon>(initialCoupon);

  const addCoupon = (coupon: Coupon) => {
    setCoupons((prev) => [...prev, coupon]);
  };

  /**
   * 쿠폰 목록을 초기화
   */

  const initializeCoupons = (initialCoupons: Coupon[]) => {
    setCoupons(initialCoupons);
  };

  /**
   * 신규 쿠폰 입력 상태를 초기 상태로 리셋
   */
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
