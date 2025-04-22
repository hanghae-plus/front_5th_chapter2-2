import { createContext } from "react";
import { Coupon } from "../types";

export interface CouponStore {
  coupons: Coupon[];
  addCoupon: (newCoupon: Coupon) => void;
}

export const createCouponStore = (initialCoupons: Coupon[]): CouponStore => {
  return {
    coupons: initialCoupons,
    addCoupon: (newCoupon: Coupon) => {
      return {
        coupons: [...initialCoupons, newCoupon],
        addCoupon: (newCoupon: Coupon) => {
          return createCouponStore([...initialCoupons, newCoupon]);
        },
      };
    },
  };
};

export const CouponStoreContext = createContext<CouponStore | undefined>(
  undefined,
);
