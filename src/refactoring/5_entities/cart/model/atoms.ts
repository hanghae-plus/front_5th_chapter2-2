import { atom } from "jotai";

import { CartItem } from "../../../6_shared/types";
import { calculateCartTotal } from "../lib";

// 장바구니 아이템 목록
export const cartAtom = atom<CartItem[]>([]);

// 장바구니 총액 정보
export const cartTotalAtom = atom((get) => {
  const cart = get(cartAtom);

  return calculateCartTotal(cart);
});
