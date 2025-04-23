import { atom } from "jotai";
import type { CartItem, CouponItem, Product } from "../types";
import { getRemainingStock } from "../utils";
import { calculateCartTotal, updateCartItemQuantity } from "../models/cart";

export const cartAtom = atom<CartItem[]>([]);
export const selectedCouponAtom = atom<CouponItem | null>(null);

// — Cart actions —
export const addToCartAtom = atom(null, (get, set, product: Product) => {
  const cart = get(cartAtom);
  const remain = getRemainingStock(product, cart);
  if (remain <= 0) return;

  const idx = cart.findIndex((item) => item.product.id === product.id);
  const next =
    idx > -1
      ? cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
            : item
        )
      : [...cart, { product, quantity: 1 }];

  set(cartAtom, next);
});
export const removeFromCartAtom = atom(null, (get, set, productId: string) => {
  set(
    cartAtom,
    get(cartAtom).filter((item) => item.product.id !== productId)
  );
});
export const updateQuantityAtom = atom(
  null,
  (
    get,
    set,
    { productId, quantity }: { productId: string; quantity: number }
  ) => {
    set(cartAtom, updateCartItemQuantity(get(cartAtom), productId, quantity));
  }
);
export const applyCouponAtom = atom(null, (get, set, coupon: CouponItem) => {
  set(selectedCouponAtom, coupon);
});

export const calculateTotalPriceAtom = atom((get) => {
  const cart = get(cartAtom);
  const coupon = get(selectedCouponAtom);
  return calculateCartTotal(cart, coupon);
});
