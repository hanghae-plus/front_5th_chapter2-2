import {useState} from "react";
import {Coupon} from "../../types.ts";
import {initialCoupons} from "../data/InitialInfo.tsx";

export const useCoupons = (initialData: Coupon[] = initialCoupons) => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialData);

  const addCoupon = (newCoupon: Coupon) => {
    setCoupons(prevCoupons => [...prevCoupons, newCoupon]);
  }

  return {
    coupons,
    addCoupon,
  }
};
