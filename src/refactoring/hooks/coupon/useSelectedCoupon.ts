import { Coupon } from "@/refactoring/entities";

import { useState } from "react";

/**
 * 선택된 쿠폰 상태를 관리하는 훅
 * @returns 현재 선택된 쿠폰과 적용 함수
 */
export const useSelectedCoupon = () => {
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const applyCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
  };

  return { selectedCoupon, applyCoupon };
};
