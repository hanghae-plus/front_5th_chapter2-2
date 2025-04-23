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
  const [newCoupon, setNewCoupon] = useState<Coupon>({
    name: "",
    code: "",
    discountType: "percentage",
    discountValue: 0,
  });

  const addCoupon = (newCoupon: Coupon) => {
    setCoupons((prevCoupons) => [...prevCoupons, newCoupon]);
  };

  const resetNewCoupon = () => {
    setNewCoupon({
      name: "",
      code: "",
      discountType: "percentage",
      discountValue: 0,
    });
  };

  const handleAddNewCoupon = (onCouponAdd: (newCoupon: Coupon) => void) => {
    onCouponAdd(newCoupon);
    resetNewCoupon();
  };

  return { coupons, newCoupon, addCoupon, setNewCoupon, handleAddNewCoupon };
};
