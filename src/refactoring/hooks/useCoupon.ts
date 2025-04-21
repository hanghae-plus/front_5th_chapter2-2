import { useState } from "react";
import { Coupon } from "../../types.ts";

export const useCoupons = (initialCoupons: Coupon[]) => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);

  const addCoupon = (newCoupon: Coupon) => {
    setCoupons((prevCoupons) => [...prevCoupons, newCoupon]);
  };
  const removeCoupon = (couponCode: string) => {
    setCoupons((prevCoupons) =>
      prevCoupons.filter((coupon) => coupon.code !== couponCode),
    );
  };
  const applyCoupon = (couponCode: string) => {
    const coupon = coupons.find((coupon) => coupon.code === couponCode);
    // if (coupon) {

    // }
  };

  return {
    coupons,
    addCoupon,
    removeCoupon,
    applyCoupon,
  };
};
