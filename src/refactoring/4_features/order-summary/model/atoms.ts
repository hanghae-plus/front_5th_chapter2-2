import { atom } from "jotai";

import { cartTotalAtom } from "../../../5_entities/cart/model";
import { selectedCouponAtom } from "../../../5_entities/coupon/model";

// 장바구니 페이지 - 주문 요약
export const orderSummaryAtom = atom((get) => {
  const cartTotal = get(cartTotalAtom);
  const selectedCoupon = get(selectedCouponAtom);

  return {
    cartTotal,
    selectedCoupon,
  };
});
