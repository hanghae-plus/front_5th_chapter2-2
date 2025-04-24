import { atom } from "jotai";
import { Coupon } from "../../../types";
import { couponsAtom, newCouponAtom } from "./atom";

export const updateNewCouponAtom = atom(
  null,
  (get, set, { field, value }: { field: keyof Coupon; value: any }) => {
    const currentNewCoupon = get(newCouponAtom);
    set(newCouponAtom, { ...currentNewCoupon, [field]: value });
  }
);

export const resetNewCouponAtom = atom(null, (_, set) => {
  set(newCouponAtom, {
    name: "",
    code: "",
    discountType: "percentage",
    discountValue: 0,
  });
});

export const handleAddCouponAtom = atom(null, (get, set) => {
  const newCoupon = get(newCouponAtom);
  set(couponsAtom, (prev) => [...prev, newCoupon]);
  set(resetNewCouponAtom);
});
