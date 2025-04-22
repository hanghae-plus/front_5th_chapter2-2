import { CartItem, Product } from "../../entities";

/**
 * 장바구니에 담긴 수량을 고려해, 남은 재고를 계산하는 순수 함수
 *
 * @param {Product} product - 상품 객체
 * @param {CartItem[]} cart - 현재 장바구니 목록
 * @returns {number} - 장바구니 반영 후 남은 재고 수량
 */
export const getRemainingStock = (product: Product, cart: CartItem[]): number => {
  const cartItem = cart.find((item) => item.product.id === product.id);
  return product.stock - (cartItem?.quantity || 0);
};
