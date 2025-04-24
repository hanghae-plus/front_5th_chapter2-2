import { atom } from "jotai";
import { Coupon } from "../../../types";
import { initialCoupons } from "../../constants";

export const couponsAtom = atom<Coupon[]>(initialCoupons);
export const newCouponAtom = atom<Coupon>({
  name: "",
  code: "",
  discountType: "percentage",
  discountValue: 0,
});
