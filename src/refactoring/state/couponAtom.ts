import { atom } from "jotai";
import type { CouponItem } from "../types";
import { initialCoupons } from "../mock";

export const couponsAtom = atom<CouponItem[]>(initialCoupons);

export const setCouponsAtom = atom(
  null,
  (get, set, initialCoupons: CouponItem[]) => {
    set(couponsAtom, initialCoupons);
  }
);

export const addCouponAtom = atom(null, (get, set, newCoupon: CouponItem) => {
  set(couponsAtom, [...get(couponsAtom), newCoupon]);
});
