import { atom } from "jotai";
import { CartItem, Coupon, Product } from "../../../types";
import { calculateCartTotal } from "../../models/cart";

// 장바구니 아이템을 저장하는 atom
export const cartItemsAtom = atom<CartItem[]>([]);

// 선택된 쿠폰을 저장하는 atom
export const selectedCouponAtom = atom<Coupon | null>(null);

// 상품과 쿠폰 데이터를 저장하는 atoms
export const productsAtom = atom<Product[]>([]);
export const couponsAtom = atom<Coupon[]>([]);

// 주문 요약 정보를 계산하는 파생 atom
export const cartSummaryAtom = atom((get) => {
  const cart = get(cartItemsAtom);
  const selectedCoupon = get(selectedCouponAtom);
  return calculateCartTotal(cart, selectedCoupon);
});

// 각 상품의 남은 재고를 계산하는 atom
export const remainingStockAtom = (productId: string) =>
  atom((get) => {
    const cart = get(cartItemsAtom);
    const products = get(productsAtom);
    const product = products.find((p) => p.id === productId);

    if (!product) return 0;

    const cartItem = cart.find((item) => item.product.id === productId);
    return product.stock - (cartItem?.quantity || 0);
  });
