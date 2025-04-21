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

/**
 * 장바구니 아이템의 수량에 따라 적용 가능한 최대 할인율을 계산하는 순수 함수
 *
 * @param {CartItem} item - 장바구니 항목
 * @returns {number} - 적용된 할인율
 */

export const getAppliedDiscount = (item: CartItem) => {
  const { discounts } = item.product;
  const { quantity } = item;

  const appliedDiscount = discounts
    .filter((discount) => quantity >= discount.quantity)
    .reduce((max, discount) => Math.max(max, discount.rate), 0);

  return appliedDiscount;
};
