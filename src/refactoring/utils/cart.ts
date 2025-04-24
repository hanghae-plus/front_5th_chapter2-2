import { CartItem, Product } from "../../types";

/**
 * 할인 목록 중에서 최대 할인율을 반환
 */
export const getMaxDiscount = (discounts: { quantity: number; rate: number }[]): number => {
  return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};

/**
 * 특정 상품의 남은 재고 계산
 */
export const getRemainingStock = (product: Product, cart: CartItem[]): number => {
  const cartItem = cart.find((item) => item.product.id === product.id);
  return product.stock - (cartItem?.quantity || 0);
};

/**
 * 장바구니 아이템에 적용되는 할인율 계산
 */
export const getAppliedDiscount = (item: CartItem): number => {
  const { discounts } = item.product;
  const { quantity } = item;

  return discounts
    .filter((discount) => quantity >= discount.quantity)
    .reduce((maxRate, discount) => Math.max(maxRate, discount.rate), 0);
};
