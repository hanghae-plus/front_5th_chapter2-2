import { useState } from "react";
import { Coupon } from "@/types.ts";
import { initialNewCoupon } from "@r/constants/coupon.ts";

export const useCoupons = (initialCoupons: Coupon[]) => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [newCoupon, setNewCoupon] = useState<Coupon>(initialNewCoupon);

  const addCoupon = (newCoupon: Coupon) => {
    setCoupons((prevCoupons) => [...prevCoupons, newCoupon]);
  };

  const resetNewCoupon = () => {
    setNewCoupon(initialNewCoupon);
  };

  const handleAddNewCoupon = () => {
    addCoupon(newCoupon);
    resetNewCoupon();
  };

  return { coupons, newCoupon, addCoupon, setNewCoupon, handleAddNewCoupon };
};
