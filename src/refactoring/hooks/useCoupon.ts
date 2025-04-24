import { useState } from "react";
import { Coupon } from "../../types.ts";

export const useCoupons = (initialCoupons: Coupon[]) => {
  const [coupons, setCoupons] = useState<Coupon[]>(() => initialCoupons);

  const handleAddCoupon = (newCoupon: Coupon) => {
    setCoupons((prevCoupons) => [...prevCoupons, newCoupon]);
  };

  const handleRemoveCoupon = (name: string) => {
    setCoupons((prevCoupons) =>
      prevCoupons.filter((coupon) => coupon.name !== name)
    );
  };

  return {
    coupons: coupons,
    addCoupon: handleAddCoupon,
    removeCoupon: handleRemoveCoupon,
  };
};
