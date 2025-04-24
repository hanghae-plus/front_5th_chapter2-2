import { Coupon, Product } from "../../../types";
import { atom } from "jotai";
import { cartItemsAtom, selectedCouponAtom } from "./atom";
import { updateCartItemQuantity } from "../../models/cart";

// 장바구니에 상품 추가 action
export const addToCartAtom = atom(null, (get, set, product: Product) => {
  const cart = get(cartItemsAtom);
  const existing = cart.find((item) => item.product.id === product.id);

  if (existing) {
    set(
      cartItemsAtom,
      cart.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
          : item
      )
    );
  } else {
    // 새 상품이면 장바구니에 추가
    set(cartItemsAtom, [...cart, { product, quantity: 1 }]);
  }
});

// 장바구니에서 상품 제거 action
export const removeFromCartAtom = atom(null, (get, set, productId: string) => {
  const cart = get(cartItemsAtom);
  set(
    cartItemsAtom,
    cart.filter((item) => item.product.id !== productId)
  );
});

// 장바구니 상품 수량 업데이트 action
export const updateQuantityAtom = atom(
  null,
  (get, set, params: { productId: string; quantity: number }) => {
    const { productId, quantity } = params;
    const cart = get(cartItemsAtom);
    const updatedCart = updateCartItemQuantity(cart, productId, quantity);
    set(cartItemsAtom, updatedCart);
  }
);

// 쿠폰 적용 action
export const applyCouponAtom = atom(null, (_, set, coupon: Coupon | null) => {
  set(selectedCouponAtom, coupon);
});
