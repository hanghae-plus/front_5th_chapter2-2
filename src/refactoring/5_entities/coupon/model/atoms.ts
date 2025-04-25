import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { Coupon } from "../../../6_shared/types";
import { initialCoupons } from "./constants";

// 관리자 페이지 - 쿠폰 목록
export const couponsAtom = atomWithStorage<Coupon[]>("coupons", initialCoupons);

// 장바구니 페이지 - 선택된 쿠폰
export const selectedCouponAtom = atom<Coupon | null>(null);
